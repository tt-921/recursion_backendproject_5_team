<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\CartController;

Route::post('/stripe/webhook', [WebhookController::class, 'handle']);

// カート
Route::get('/cart',    [CartController::class, 'index']);
Route::post('/cart',   [CartController::class, 'store']);
Route::put('/cart',    [CartController::class, 'update']);
Route::delete('/cart', [CartController::class, 'destroy']);
