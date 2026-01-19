<?php

namespace App\Services;

use Stripe\StripeClient;
use App\Models\Product;
use App\Models\Price;

class StripeSyncService
{
    private StripeClient $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(config('services.stripe.secret'));
    }

    public function syncProductsAndPrices(): void
    {
        // Stripe product list
        $stripeProducts = $this->stripe->products->all(['limit' => 100]);

        foreach ($stripeProducts->data as $stripeProduct) {
            // title(name) で一致させる
            $product = Product::where('title', $stripeProduct->name)->first();

            if (!$product) continue;

            // stripe_product_id を更新（上書き）
            $product->update([
                'stripe_product_id' => $stripeProduct->id
            ]);
        }

        // Stripe price list
        $stripePrices = $this->stripe->prices->all(['limit' => 100]);

        foreach ($stripePrices->data as $stripePrice) {

            // stripePrice は product_id を持っている
            $stripeProductId = $stripePrice->product;

            // local product を product の stripe_product_id から探す
            $product = Product::where('stripe_product_id', $stripeProductId)->first();

            if (!$product) continue;

            $price = Price::where('product_id', $product->id)->first();

            if (!$price) continue;

            // stripe_price_id を更新
            $price->update([
                'stripe_price_id' => $stripePrice->id
            ]);
        }
    }
}
