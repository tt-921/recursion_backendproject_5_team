<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;

class PaymentController extends Controller
{
    /**
     * Payment
     */
    public function createCheckout(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $item1 = [
            'name' => 'テストアイテムA (税抜)',
            'unit_amount' => 10000, // 10,000円
            'quantity' => 1,
        ];
        $item2 = [
            'name' => 'テストアイテムB (税抜)',
            'unit_amount' => 5000, // 5,000円
            'quantity' => 2,
        ];
        $item3 = [
            'name' => 'テストアイテムC (税抜)',
            'unit_amount' => 800, // 800円
            'quantity' => 3,
        ];

        // 小計：税抜
        $subtotal = ($item1['unit_amount'] * $item1['quantity']) +
                    ($item2['unit_amount'] * $item2['quantity']) +
                    ($item3['unit_amount'] * $item3['quantity']);

        // 消費税
        $taxAmount = round($subtotal * 0.10);

        $lineItems = [];

        // 商品アイテムを追加 ( unit_amount は税抜価格を使用)
        foreach ([$item1, $item2, $item3] as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'jpy',
                    'product_data' => [
                        'name' => $item['name'],
                    ],
                    'unit_amount' => $item['unit_amount'],
                ],
                'quantity' => $item['quantity'],
            ];
        }

        $lineItems[] = [
            'price_data' => [
                'currency' => 'jpy',
                'product_data' => [
                    'name' => '消費税 (10%)',
                ],
                'unit_amount' => $taxAmount,
            ],
            'quantity' => 1,
        ];

        $session = StripeSession::create([
            'mode' => 'payment',
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            
            'shipping_options' => [
                [
                    'shipping_rate_data' => [
                        'type' => 'fixed_amount',
                        'fixed_amount' => [
                            'amount' => 500,
                            'currency' => 'jpy',
                        ],
                        'display_name' => '通常配送',
                    ],
                ],
            ],

            'success_url' => route('checkout-success'),
            'cancel_url' => route('checkout-cancel'),
        ]);

        // return session url
        return response()->json([
            'url' => $session->url
        ]);
    }
}
