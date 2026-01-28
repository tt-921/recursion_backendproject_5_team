<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;

class CartService
{
    public function getCartItems(int $userId)
    {
        // userのカートを取得（例）
        $cart = Cart::where('user_id', $userId)->first();

        return $cart->items()->with('product')->get();
    }
}
