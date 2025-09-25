FROM php:8.2-fpm

RUN apt-get update && apt-get install -y git unzip zip

RUN docker-php-ext-install pdo_mysql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY ./laravel ./

RUN composer install

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]