FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y zip unzip git libzip-dev libpq-dev nginx \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && rm -rf /var/lib/apt/lists/*

RUN echo "clear_env = no" >> /usr/local/etc/php-fpm.d/www.conf

COPY . .

RUN composer install --no-dev --optimize-autoloader

COPY nginx.conf /etc/nginx/sites-available/default

RUN chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80

CMD php artisan migrate --force && service nginx start && php-fpm
