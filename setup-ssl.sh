#!/bin/bash

# Script to set up SSL certificates using Let's Encrypt certbot
# This script should be run on the production server

# Check if domain name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 your-domain.com [email]"
  exit 1
fi

DOMAIN=$1
EMAIL=$2

# Create SSL directory if it doesn't exist
mkdir -p ./ssl

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install Docker first."
  exit 1
fi

# Check if certbot image exists, pull if not
if ! docker image inspect certbot/certbot &> /dev/null; then
  echo "Pulling certbot Docker image..."
  docker pull certbot/certbot
fi

# Stop any running containers that might be using port 80
echo "Stopping any services using port 80..."
docker-compose -f docker-compose.production.yml down

# Run certbot to obtain certificates
echo "Obtaining SSL certificates for $DOMAIN..."
if [ -z "$EMAIL" ]; then
  # Without email
  docker run -it --rm \
    -v "$(pwd)/ssl:/etc/letsencrypt" \
    -v "$(pwd)/ssl:/var/lib/letsencrypt" \
    -p 80:80 \
    certbot/certbot certonly --standalone \
    --agree-tos --no-eff-email \
    -d $DOMAIN
else
  # With email
  docker run -it --rm \
    -v "$(pwd)/ssl:/etc/letsencrypt" \
    -v "$(pwd)/ssl:/var/lib/letsencrypt" \
    -p 80:80 \
    certbot/certbot certonly --standalone \
    --agree-tos --no-eff-email \
    -d $DOMAIN \
    -m $EMAIL
fi

# Check if certificates were generated successfully
if [ -d "./ssl/live/$DOMAIN" ]; then
  # Create symbolic links to make it easier to reference in nginx config
  ln -sf "./ssl/live/$DOMAIN/fullchain.pem" ./ssl/fullchain.pem
  ln -sf "./ssl/live/$DOMAIN/privkey.pem" ./ssl/privkey.pem
  
  echo "SSL certificates obtained successfully!"
  echo "Certificates are stored in ./ssl/live/$DOMAIN/"
  echo "Symbolic links created at ./ssl/fullchain.pem and ./ssl/privkey.pem"
  
  # Set up auto-renewal cron job
  echo "Setting up auto-renewal..."
  (crontab -l 2>/dev/null; echo "0 3 * * * cd $(pwd) && ./renew-ssl.sh $DOMAIN > /dev/null 2>&1") | crontab -
  
  # Create renewal script
  cat > renew-ssl.sh << EOF
#!/bin/bash
DOMAIN=\$1
docker run --rm \\
  -v "\$(pwd)/ssl:/etc/letsencrypt" \\
  -v "\$(pwd)/ssl:/var/lib/letsencrypt" \\
  -p 80:80 \\
  certbot/certbot renew --standalone
  
# Restart nginx to apply renewed certificates
docker-compose -f docker-compose.production.yml restart server
EOF
  
  chmod +x renew-ssl.sh
  
  echo "Auto-renewal set up. Certificates will be renewed automatically."
  echo "You can now start your services with: docker-compose -f docker-compose.production.yml up -d"
else
  echo "Failed to obtain SSL certificates. Please check the error messages above."
  exit 1
fi
