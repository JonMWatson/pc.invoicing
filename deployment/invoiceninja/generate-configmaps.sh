#!/bin/bash

# Script to generate Kubernetes ConfigMaps from configuration files
# This helps with deploying the application to Kubernetes

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
  echo "kubectl is not installed. Please install it first."
  exit 1
fi

# Check if namespace exists, create if not
if ! kubectl get namespace invoiceninja &> /dev/null; then
  echo "Creating namespace: invoiceninja"
  kubectl create namespace invoiceninja
fi

# Generate ConfigMap from env.production
echo "Generating ConfigMap from env.production..."
kubectl create configmap env-config \
  --from-env-file=../../env.production \
  --namespace=invoiceninja \
  --dry-run=client -o yaml > env-config.yaml

# Generate ConfigMap for Nginx configuration
echo "Generating ConfigMap for Nginx configuration..."
kubectl create configmap nginx-config \
  --from-file=in-vhost.conf=../../config/nginx/in-vhost.production.conf \
  --namespace=invoiceninja \
  --dry-run=client -o yaml > nginx-config.yaml

# Generate ConfigMap for PHP configuration
echo "Generating ConfigMap for PHP configuration..."
kubectl create configmap php-config \
  --from-file=php.ini=../../config/php/php.production.ini \
  --namespace=invoiceninja \
  --dry-run=client -o yaml > php-config.yaml

# Generate ConfigMap for PHP CLI configuration
echo "Generating ConfigMap for PHP CLI configuration..."
kubectl create configmap php-cli-config \
  --from-file=php-cli.ini=../../config/php/php-cli.production.ini \
  --namespace=invoiceninja \
  --dry-run=client -o yaml > php-cli-config.yaml

# Generate ConfigMap for hosts file
echo "Generating ConfigMap for hosts file..."
kubectl create configmap hosts-config \
  --from-file=hosts=../../config/hosts/hosts \
  --namespace=invoiceninja \
  --dry-run=client -o yaml > hosts-config.yaml

echo "ConfigMaps generated successfully!"
echo "You can apply them with: kubectl apply -f env-config.yaml -f nginx-config.yaml -f php-config.yaml -f php-cli-config.yaml -f hosts-config.yaml"
echo "Then deploy the application with: kubectl apply -f deployment.yaml"
