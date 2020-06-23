# Shopaholic Ordering System

A basic web application using VueJS & Lumen with JWT authentication.

## Get started
Pull down the respository / download zip and extra it to your local computer

#### Set Up
* cd shopaholic
* docker-compose build
* docker-compose up


##### Env/Database
* cd into '/lumen-api' and duplicate the .env.example file. 
* Rename it .env. 
* Set db_host to 'lumen-db', db_database to 'lumen', db_username & db_password to 'root'
* Generate JWT Secret: docker-compose exec lumen-api php artisan jwt:secret
* docker-compose exec lumen-api php artisan migrate
* docker-compose exec lumen-api php artisan db:seed
* Visit http://localhost:8080/


#### User Accounts
##### Customer: 
* customer@test.com
* customer

Login to the default customer account to begin adding orders.

##### Admin: 
* admin@test.com
* admin

After a customer has added an order, the admin account is able to view and update the order.

##### Register A New Account: 
* http://localhost:8080/register