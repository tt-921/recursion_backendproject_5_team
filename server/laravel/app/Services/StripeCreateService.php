<?php

namespace App\Services;

use Stripe\StripeClient;
use App\Models\Product;
use App\Models\Price;

class StripeCreateService
{
    private StripeClient $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(config('services.stripe.secret'));
    }

    public function createAllProductsAndPrices(): void
    {
        // 1. Stripeの全Productを取得（100件ずつ）
        $stripeProducts = $this->stripe->products->all(['limit' => 100]);

        // Stripe側に存在するnameの一覧を取得
        $stripeProductNames = collect($stripeProducts->data)
            ->pluck('name')
            ->toArray();

        // 2. ローカルの全Productを取得
        $localProducts = Product::all();

        foreach ($localProducts as $product) {

            // 既にStripeに同じnameがある場合は作成しない
            if (in_array($product->title, $stripeProductNames)) {
                continue;
            }

            // 3. Stripe Product 作成
            $stripeProduct = $this->stripe->products->create([
                'name' => $product->title,
                'description' => $product->description,
            ]);

            // 4. Stripe Price 作成（Priceが存在する前提）
            $price = Price::where('product_id', $product->id)->first();
            if (!$price) {
                continue;
            }

            $this->stripe->prices->create([
                'product' => $stripeProduct->id,
                'unit_amount' => $price->unit_amount,
                'currency' => 'jpy',
            ]);
        }

        // DBへstripe_product_id / stripe_price_idを保存しない
        // 同期はStripeSyncServiceに任せる
    }
}
