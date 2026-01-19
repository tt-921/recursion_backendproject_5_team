<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prices = [
            // お菓子 (1-4)
            [ 'product_id' => 1,  'stripe_price_id' => null, 'unit_amount' => 150 ],
            [ 'product_id' => 2,  'stripe_price_id' => null, 'unit_amount' => 180 ],
            [ 'product_id' => 3,  'stripe_price_id' => null, 'unit_amount' => 200 ],
            [ 'product_id' => 4,  'stripe_price_id' => null, 'unit_amount' => 160 ],

            // 飲み物 (5-8)
            [ 'product_id' => 5,  'stripe_price_id' => null, 'unit_amount' => 120 ],
            [ 'product_id' => 6,  'stripe_price_id' => null, 'unit_amount' => 140 ],
            [ 'product_id' => 7,  'stripe_price_id' => null, 'unit_amount' => 150 ],
            [ 'product_id' => 8,  'stripe_price_id' => null, 'unit_amount' => 180 ],

            // 日用品 (9-11)    
            [ 'product_id' => 9,  'stripe_price_id' => null, 'unit_amount' => 480 ],
            [ 'product_id' => 10, 'stripe_price_id' => null, 'unit_amount' => 320 ],
            [ 'product_id' => 11, 'stripe_price_id' => null, 'unit_amount' => 250 ],

            // 食料品 (12-15)
            [ 'product_id' => 12, 'stripe_price_id' => null, 'unit_amount' => 280 ],
            [ 'product_id' => 13, 'stripe_price_id' => null, 'unit_amount' => 350 ],
            [ 'product_id' => 14, 'stripe_price_id' => null, 'unit_amount' => 420 ],
            [ 'product_id' => 15, 'stripe_price_id' => null, 'unit_amount' => 380 ],

            // 文房具 (16-18)
            [ 'product_id' => 16, 'stripe_price_id' => null, 'unit_amount' => 110 ],
            [ 'product_id' => 17, 'stripe_price_id' => null, 'unit_amount' => 200 ],
            [ 'product_id' => 18, 'stripe_price_id' => null, 'unit_amount' => 160 ],

            // その他 (19-22)
            [ 'product_id' => 19, 'stripe_price_id' => null, 'unit_amount' => 980 ],
            [ 'product_id' => 20, 'stripe_price_id' => null, 'unit_amount' => 1280 ],
            [ 'product_id' => 21, 'stripe_price_id' => null, 'unit_amount' => 2200 ],
            [ 'product_id' => 22, 'stripe_price_id' => null, 'unit_amount' => 680 ],
        ];

        foreach ($prices as $priceData) {

            $product = DB::table('products')->where('id', $priceData['product_id'])->first();

            if (!$product) continue;

            DB::table('prices')->updateOrInsert(
                ['product_id' => $priceData['product_id']],
                [
                    'stripe_price_id' => null,
                    'unit_amount' => $priceData['unit_amount'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            $priceId = DB::table('prices')->where('product_id', $priceData['product_id'])->value('id');

            DB::table('products')->where('id', $priceData['product_id'])->update(['default_price_id' => $priceId]);
        }
    }
}
