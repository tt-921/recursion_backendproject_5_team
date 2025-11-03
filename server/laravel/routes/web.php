<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController as PublicCategory;
use App\Http\Controllers\Admin\CategoryController as AdminCategory;

Route::get('/', function () {
    return view('welcome');
});

// 認証不要のルート
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// カテゴリ管理（管理者用）
Route::get('/categories',        [PublicCategory::class, 'index']);
Route::get('/categories/{id}',   [PublicCategory::class, 'show']);


// 認証が必要なルート
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('admin')->group(function () {
        Route::get('/categories',               [AdminCategory::class, 'index']);
        Route::get('/categories/{id}',          [AdminCategory::class, 'show']);
        Route::post('/categories',              [AdminCategory::class, 'store']);
        Route::patch('/categories/{id}',        [AdminCategory::class, 'update']);
        Route::delete('/categories/{id}',       [AdminCategory::class, 'destroy']);
    });
});
