<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::get('auth-url', [LoginController::class, 'getAuthUrl']);
Route::get('auth-code', [LoginController::class, 'getAuthCode']);

Route::get('events', [EventController::class, 'index']);
Route::put('event/{eventId}', [EventController::class, 'update']);
