<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

// Logout route
Route::prefix('auth')->middleware('auth')->group(function () {

    // Logout route
    Route::post('logout', LogoutController::class)->name('logout');
});

// Login / register routes
Route::middleware('guest')->group(function () {

    // Authentication routes
    Route::prefix('auth')->group(function () {

        Route::post('login', [LoginController::class, 'authenticate']);
        Route::post('register', [RegisterController::class, 'authenticate']);
    });
});
