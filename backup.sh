#!/bin/bash

# Script to create database backups manually
# This complements the automated backups in the docker-compose.production.yml

# Set variables
BACKUP_DIR="./docker/mysql/backup"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/ninja-manual-$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Check if docker-compose is running
if ! docker-compose -f docker-compose.production.yml ps | grep -q "db.*Up"; then
  echo "Database container is not running. Starting it..."
  docker-compose -f docker-compose.production.yml up -d db
  # Wait for database to be ready
  sleep 10
fi

# Source environment variables from env.production
source env.production

# Create backup
echo "Creating backup: $BACKUP_FILE"
docker-compose -f docker-compose.production.yml exec db sh -c "mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE > /backup/ninja-manual-$TIMESTAMP.sql"

# Check if backup was successful
if [ -f "$BACKUP_FILE" ]; then
  echo "Backup created successfully: $BACKUP_FILE"
  
  # Create compressed copy
  echo "Creating compressed copy..."
  gzip -c "$BACKUP_FILE" > "$BACKUP_FILE.gz"
  echo "Compressed backup created: $BACKUP_FILE.gz"
else
  echo "Backup failed. Please check the error messages above."
  exit 1
fi

# Optional: Copy backup to remote location
if [ ! -z "$1" ] && [ "$1" = "--remote" ]; then
  if [ -z "$2" ]; then
    echo "Remote destination not specified. Usage: $0 --remote user@remote-server:/path/to/backup/dir"
    exit 1
  fi
  
  REMOTE_DEST=$2
  echo "Copying backup to remote location: $REMOTE_DEST"
  scp "$BACKUP_FILE.gz" "$REMOTE_DEST"
  
  if [ $? -eq 0 ]; then
    echo "Backup copied to remote location successfully."
  else
    echo "Failed to copy backup to remote location."
    exit 1
  fi
fi

echo "Backup process completed."
