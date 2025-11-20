<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController as PublicCategory;
use App\Http\Controllers\ProductController as PublicProduct;
use App\Http\Controllers\Admin\CategoryController as AdminCategory;
use App\Http\Controllers\Admin\ProductController as AdminProduct;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\Admin;

Route::get('/', function () {
    return view('welcome');
});

// 認証不要のルート
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 商品（一般公開・閲覧用）
Route::get('/products',        [PublicProduct::class, 'index']);
Route::get('/products/{id}',   [PublicProduct::class, 'show']);

// カテゴリ管理（一般公開・閲覧用）
Route::get('/categories',        [PublicCategory::class, 'index']);
Route::get('/categories/{id}',   [PublicCategory::class, 'show']);


// 認証が必要なルート
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // お気に入り機能
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{productId}', [FavoriteController::class, 'destroy']);

    // 商品CRUD API
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::resource('products', AdminProduct::class);
        Route::resource('categories', AdminCategory::class);
    });
});
