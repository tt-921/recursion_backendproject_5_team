<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PaymentService;

class CheckoutController extends Controller
{
    public function create(Request $request, PaymentService $paymentService)
    {
        // 本来はフロントから受け取る
        $items = [
            ['product_id' => 1, 'quantity' => 1],
            ['product_id' => 3, 'quantity' => 1],
        ];

        $checkoutUrl = $paymentService->createCheckoutSession(
            $request->user(),
            $items
        );

        return response()->json([
            'url' => $checkoutUrl,
        ]);
    }
}
