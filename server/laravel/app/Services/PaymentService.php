<?php

namespace App\Services;

use App\Models\Product;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Stripe;

class PaymentService
{
    public function createCheckoutSession($user, array $items): string
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $products = Product::with('defaultPrice')
            ->whereIn('id', collect($items)->pluck('product_id'))
            ->get()
            ->keyBy('id');

        $lineItems = [];
        $itemsForMetadata = [];

        foreach ($items as $item) {
            $product = $products[$item['product_id']];

            $lineItems[] = [
                'price' => $product->defaultPrice->stripe_price_id,
                'quantity' => $item['quantity'],
                'tax_rates' => [config('services.stripe.tax_rate_id')],
            ];

            $itemsForMetadata[] = [
                'product_id' => $product->id,
                'name' => $product->title,
                'quantity' => $item['quantity'],
            ];
        }

        $session = StripeSession::create([
            'mode' => 'payment',
            'line_items' => $lineItems,
            'success_url' => route('checkout-success'),
            'cancel_url' => route('checkout-cancel'),
            'metadata' => [
                'user_id' => $user?->id,
                'items' => json_encode($itemsForMetadata),
            ],
        ]);

        return $session->url;
    }
}
