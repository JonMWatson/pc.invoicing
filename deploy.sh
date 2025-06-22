#!/bin/bash

# Deployment script for Invoice Ninja
# This script helps with deploying the application to production

# Check if the production environment file exists
if [ ! -f "env.production" ]; then
  echo "Production environment file (env.production) not found."
  echo "Please create it first by copying the example and modifying it:"
  echo "cp env env.production"
  exit 1
fi

# Check if domain is provided
if [ -z "$1" ]; then
  echo "Usage: $0 your-domain.com [--with-ssl email@example.com]"
  exit 1
fi

DOMAIN=$1
WITH_SSL=false
EMAIL=""

# Parse arguments
shift
while [[ $# -gt 0 ]]; do
  case $1 in
    --with-ssl)
      WITH_SSL=true
      if [ ! -z "$2" ] && [[ $2 != --* ]]; then
        EMAIL=$2
        shift
      fi
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
  shift
done

# Update domain in configuration files
echo "Updating domain in configuration files..."
sed -i "s/your-domain\.com/$DOMAIN/g" env.production
sed -i "s/your-domain\.com/$DOMAIN/g" config/nginx/in-vhost.production.conf

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p docker/mysql/backup
mkdir -p docker/app/public
mkdir -p docker/app/storage

# Set proper permissions
echo "Setting proper permissions..."
chmod -R 755 docker/app/public
chmod -R 755 docker/app/storage

# If SSL is requested, set it up
if [ "$WITH_SSL" = true ]; then
  echo "Setting up SSL certificates..."
  if [ -z "$EMAIL" ]; then
    ./setup-ssl.sh "$DOMAIN"
  else
    ./setup-ssl.sh "$DOMAIN" "$EMAIL"
  fi
fi

# Start the application
echo "Starting the application..."
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml up -d

# Wait for the application to start
echo "Waiting for the application to start..."
sleep 10

# Check if the application is running
if docker-compose -f docker-compose.production.yml ps | grep -q "server.*Up"; then
  echo "Application started successfully!"
  echo "You can access it at: https://$DOMAIN"
  
  # Additional information
  echo ""
  echo "=== Deployment Information ==="
  echo "Domain: $DOMAIN"
  echo "SSL Enabled: $WITH_SSL"
  echo ""
  echo "=== Useful Commands ==="
  echo "View logs: docker-compose -f docker-compose.production.yml logs -f"
  echo "Restart services: docker-compose -f docker-compose.production.yml restart"
  echo "Stop services: docker-compose -f docker-compose.production.yml down"
  echo "Create backup: ./backup.sh"
  echo ""
  echo "=== Next Steps ==="
  echo "1. Log in with the credentials specified in env.production"
  echo "2. Complete the initial setup wizard"
  echo "3. Configure your company details and branding"
  echo "4. Set up email templates and payment gateways"
else
  echo "Application failed to start. Please check the logs:"
  docker-compose -f docker-compose.production.yml logs
  exit 1
fi
