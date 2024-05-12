<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Models\Client;
use App\Models\ClientFile;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin Routes
    Route::group(['middleware' => ['role:admin']], function () {
        Route::prefix('users')->group(function () {
            Route::post('assignRole', [UserController::class, 'assignRoleToUser']);
        });
    });

    Route::prefix('products')->group(function () {
        Route::get('', [Product::class, 'index']);
        Route::post('', [Product::class, 'store']);
        Route::put('/{id}', [Product::class, 'update']);
        Route::delete('/{id}', [Product::class, 'destroy']);
    });

    Route::prefix('clients')->group(function () {
        Route::get('', [Client::class, 'index']);
        Route::post('', [Client::class, 'store']);
        Route::put('/{id}', [Client::class, 'update']);
        Route::delete('/{id}', [Client::class, 'destroy']);
    });

    Route::prefix('clientFiles')->group(function () {
        Route::get('', [ClientFile::class, 'index']);
        Route::post('', [ClientFile::class, 'store']);
        Route::put('/{id}', [ClientFile::class, 'update']);
        Route::delete('/{id}', [ClientFile::class, 'destroy']);
    });


});


// Auth
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register']);

