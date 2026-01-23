<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\Product as StripeProduct;
use Stripe\Price as StripePrice;
use Exception;

class StripeService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function createOrUpdateProduct(array $data): string
    {
        try {
            // 既存のstripe_product_idがある場合は更新を試みる
            if (!empty($data['stripe_product_id'])) {
                try {
                    $product = StripeProduct::update($data['stripe_product_id'], [
                        'name' => $data['name'],
                        'description' => $data['description'] ?? null,
                        'metadata' => $data['metadata'] ?? [],
                    ]);
                    
                    return $product->id;
                } catch (Exception $e) {
                    // 存在しない場合は新規作成
                    \Log::warning("Stripe Productがありません、新しく作成します。: " . $e->getMessage());
                }
            }

            // 新規作成
            $product = StripeProduct::create([
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'metadata' => $data['metadata'] ?? [],
            ]);

            return $product->id;
        } catch (Exception $e) {
            \Log::error("Stripe Product作成、更新に失敗: " . $e->getMessage());
            throw $e;
        }
    }

    public function createOrUpdatePrice(array $data): string
    {
        try {
            // Stripe PriceはimmutableなのでAPI上では更新できない
            // 既存のstripe_price_idがある場合でも、常に新規作成する
            $price = StripePrice::create([
                'product' => $data['stripe_product_id'],
                'unit_amount' => $data['unit_amount'],
                'currency' => $data['currency'] ?? 'jpy',
                'metadata' => $data['metadata'] ?? [],
            ]);

            return $price->id;
        } catch (Exception $e) {
            \Log::error("Stripe Priceの作成失敗: " . $e->getMessage());
            throw $e;
        }
    }
}
