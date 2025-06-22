#!/bin/bash

# Script to deploy Invoice Ninja to Kubernetes
# This script helps with deploying the application to a Kubernetes cluster

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
  echo "kubectl is not installed. Please install it first."
  exit 1
fi

# Check if domain is provided
if [ -z "$1" ]; then
  echo "Usage: $0 your-domain.com [your-email@example.com]"
  exit 1
fi

DOMAIN=$1
EMAIL=${2:-"admin@$DOMAIN"}

# Update domain and email in deployment files
echo "Updating domain and email in deployment files..."
sed -i "s/your-domain\.com/$DOMAIN/g" deployment.yaml
sed -i "s/your-email@example\.com/$EMAIL/g" deployment.yaml

# Generate ConfigMaps
echo "Generating ConfigMaps..."
./generate-configmaps.sh

# Apply ConfigMaps
echo "Applying ConfigMaps..."
kubectl apply -f env-config.yaml
kubectl apply -f nginx-config.yaml
kubectl apply -f php-config.yaml
kubectl apply -f php-cli-config.yaml
kubectl apply -f hosts-config.yaml

# Check if cert-manager is installed
if ! kubectl get namespace cert-manager &> /dev/null; then
  echo "cert-manager is not installed. Installing it now..."
  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.yaml
  
  # Wait for cert-manager to be ready
  echo "Waiting for cert-manager to be ready..."
  kubectl wait --for=condition=available --timeout=300s deployment/cert-manager -n cert-manager
  kubectl wait --for=condition=available --timeout=300s deployment/cert-manager-webhook -n cert-manager
  kubectl wait --for=condition=available --timeout=300s deployment/cert-manager-cainjector -n cert-manager
fi

# Apply deployment
echo "Applying deployment..."
kubectl apply -f deployment.yaml

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/server -n invoiceninja
kubectl wait --for=condition=available --timeout=300s deployment/app -n invoiceninja
kubectl wait --for=condition=available --timeout=300s deployment/db -n invoiceninja

# Get the external IP or hostname
echo "Getting external IP or hostname..."
EXTERNAL_IP=""
while [ -z "$EXTERNAL_IP" ]; do
  EXTERNAL_IP=$(kubectl get service server -n invoiceninja -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
  if [ -z "$EXTERNAL_IP" ]; then
    EXTERNAL_IP=$(kubectl get service server -n invoiceninja -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
  fi
  
  if [ -z "$EXTERNAL_IP" ]; then
    echo "Waiting for external IP or hostname..."
    sleep 10
  fi
done

echo ""
echo "=== Deployment Information ==="
echo "Domain: $DOMAIN"
echo "External IP/Hostname: $EXTERNAL_IP"
echo ""
echo "=== Next Steps ==="
echo "1. Update your DNS records to point $DOMAIN to $EXTERNAL_IP"
echo "2. Wait for DNS propagation and SSL certificate issuance"
echo "3. Access your application at https://$DOMAIN"
echo "4. Log in with the credentials specified in env.production"
echo ""
echo "=== Useful Commands ==="
echo "View logs: kubectl logs -f deployment/app -n invoiceninja"
echo "View all pods: kubectl get pods -n invoiceninja"
echo "View services: kubectl get services -n invoiceninja"
echo "View ingress: kubectl get ingress -n invoiceninja"
echo "View certificates: kubectl get certificates -n invoiceninja"
echo ""
echo "Deployment completed successfully!"
