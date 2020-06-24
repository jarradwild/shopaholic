<?php
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('register', 'AuthController@register');
    $router->post('login', 'AuthController@login');


    Route::group(['middleware' => 'auth'], function(){
        // Refresh Token
        Route::get('auth/refresh', 'AuthController@refresh');

        // Users 
        Route::get('users', 'UserController@index');

        // User Orders
        Route::get('my-orders', 'OrdersController@index');
        Route::get('my-orders/{id}', 'OrdersController@show');
        Route::post('my-orders', 'OrdersController@create');

        // Admin Orders
        Route::get('admin/orders', ['middleware' => 'isAdmin', 'uses' => 'AdminController@index']);
        Route::put('admin/orders/{id}/status', ['middleware' => 'isAdmin', 'uses' => 'AdminController@updateStatus']);
        Route::put('admin/orders/{id}/add-note', ['middleware' => 'isAdmin', 'uses' => 'AdminController@addNote']);
        Route::delete('admin/orders/{id}', ['middleware' => 'isAdmin', 'uses' => 'AdminController@cancel']);
        
        Route::get('admin/orders/{id}/user', ['middleware' => 'isAdmin', 'uses' => 'AdminController@getCustomerFromOrder']);
    });
});
