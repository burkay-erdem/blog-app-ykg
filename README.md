<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Blog App
First of all you need to check php version and version must be higher then 8.x and check composer is installed.

> php --version 
> composer --version 

And then install mysql db localhost or remote host.

Rename .env.example file to .env
> cp .env.example .env

install php composer files 
> composer update

install node_modules
> npm install

migrate database
> php artisan migrate

seed default data to database
> php artisan db:seed

Run laravel application
> php artisan serve

Run react ui
> npm run dev

After these steps open your browser go to http://localhost:8000

For admin user login use this information:

> email : test@gmail.com

> password : 12345678

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
