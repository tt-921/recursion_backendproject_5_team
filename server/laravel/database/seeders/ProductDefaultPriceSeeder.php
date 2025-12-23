<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductDefaultPriceSeeder extends Seeder
{
    public function run(): void
    {
        // prices.product_id と products.id を 1対1 で紐付け
        $prices = DB::table('prices')->get();

        foreach ($prices as $price) {
            DB::table('products')
                ->where('id', $price->product_id)
                ->update([
                    'default_price_id' => $price->id,
                ]);
        }
    }
}