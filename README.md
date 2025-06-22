# Pro-Clean Invoicing Software

A production-ready deployment of Invoice Ninja for Pro-Clean's invoicing needs.

## Overview

This repository contains a Docker-based setup for running Invoice Ninja, a powerful open-source invoicing application. The setup includes:

- Nginx web server
- PHP application running Invoice Ninja v5
- MySQL 8 database
- Automated backup system
- SSL support with Let's Encrypt
- Production-optimized configurations

## Development Setup

For local development, use the standard docker-compose file:

```bash
# Start the development environment
docker-compose up -d

# Access the application at http://localhost:8080
# Default login: admin@example.com / changeme!
```

## Production Deployment

For production deployment, follow these steps:

### 1. Prepare Your Server

Ensure your server has:
- Docker and Docker Compose installed
- A domain name pointing to your server
- Ports 80 and 443 open in your firewall

### 2. Configure Production Environment

1. Edit the production environment file:

```bash
# Review and update the production environment variables
nano env.production
```

Make sure to update:
- `APP_URL` with your domain
- Database credentials
- Admin user email and password
- SMTP mail settings

### 3. Deploy the Application

Use the deployment script:

```bash
# Without SSL
./deploy.sh your-domain.com

# With SSL (recommended)
./deploy.sh your-domain.com --with-ssl your-email@example.com
```

The script will:
- Update configuration files with your domain
- Set up SSL certificates if requested
- Start the application containers
- Provide next steps

### 4. Post-Deployment Steps

1. Log in with the credentials specified in `env.production`
2. Complete the initial setup wizard
3. Configure your company details and branding
4. Set up email templates and payment gateways

## Maintenance

### Backups

Automated daily backups are configured in the production setup. To manually create a backup:

```bash
# Create a local backup
./backup.sh

# Create a backup and copy to a remote server
./backup.sh --remote user@remote-server:/path/to/backup/dir
```

Backups are stored in `./docker/mysql/backup/`.

### SSL Certificate Renewal

SSL certificates are automatically renewed. The renewal script is set up as a cron job during deployment.

### Updating the Application

To update to the latest version:

```bash
# Pull the latest images
docker-compose -f docker-compose.production.yml pull

# Restart the services
docker-compose -f docker-compose.production.yml up -d
```

### Monitoring

To view logs:

```bash
# View all logs
docker-compose -f docker-compose.production.yml logs

# Follow logs in real-time
docker-compose -f docker-compose.production.yml logs -f

# View logs for a specific service
docker-compose -f docker-compose.production.yml logs -f app
```

## Configuration Files

- `env.production`: Environment variables for production
- `docker-compose.production.yml`: Docker Compose configuration for production
- `config/nginx/in-vhost.production.conf`: Nginx configuration for production
- `config/php/php.production.ini`: PHP configuration for production
- `config/php/php-cli.production.ini`: PHP CLI configuration for production

## Scripts

- `deploy.sh`: Deployment script
- `backup.sh`: Database backup script
- `setup-ssl.sh`: SSL certificate setup script

## Removing the White Label

To remove the "Purchase white label" button, you'll need to purchase a white label license from Invoice Ninja. After purchasing, you can enter your license key in the application settings.

## Support

For Invoice Ninja support, visit:
- [Invoice Ninja Documentation](https://invoiceninja.github.io/)
- [Invoice Ninja GitHub](https://github.com/invoiceninja/invoiceninja)
- [Invoice Ninja Forum](https://forum.invoiceninja.com/)
