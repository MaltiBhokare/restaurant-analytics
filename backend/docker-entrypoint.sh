#!/usr/bin/env bash
set -e

# Render provides PORT env var (usually 10000)
: "${PORT:=10000}"

# Update Apache to listen on PORT
sed -i "s/Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/:80/:${PORT}/" /etc/apache2/sites-available/000-default.conf

# Start Apache
exec apache2-foreground