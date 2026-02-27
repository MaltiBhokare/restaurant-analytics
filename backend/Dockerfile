FROM php:8.2-apache

RUN a2enmod rewrite headers

# Copy backend code into Apache web root
COPY . /var/www/html/

# Optional: if you want / to show API status
# Create a root index.php that forwards to api
RUN if [ ! -f /var/www/html/index.php ]; then \
    echo "<?php header('Content-Type: application/json'); echo json_encode(['ok'=>true,'message'=>'Backend running','hint'=>'Use /api/index.php?path=restaurants']);" > /var/www/html/index.php; \
  fi

# Entrypoint to bind Apache to Render's PORT
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 10000

ENTRYPOINT ["docker-entrypoint.sh"]