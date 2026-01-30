<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PaymentService;
use App\Services\CartService;

class CheckoutController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function create(Request $request, PaymentService $paymentService)
    {
        if (!auth()->check()) {
        return response()->json([
            'message' => 'Unauthenticated'
        ], 401);
    }
    
        $user = $request->user();

        // サーバー側で cart を取得
        $cartItems = $this->cartService->getCartItems($user->id);

        $checkoutUrl = $paymentService->createCheckoutSession(
            $user,
            $cartItems
        );

        return response()->json([
            'url' => $checkoutUrl,
        ]);
    }
}
