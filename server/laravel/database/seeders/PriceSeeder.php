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
        DB::table('prices')->insert([
            // お菓子 (1-4)
            [ 'product_id' => 1,  'stripe_price_id' => 1001, 'unit_amount' => 150,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 2,  'stripe_price_id' => 1002, 'unit_amount' => 180,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 3,  'stripe_price_id' => 1003, 'unit_amount' => 200,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 4,  'stripe_price_id' => 1004, 'unit_amount' => 160,  'created_at' => now(), 'updated_at' => now() ],

            // 飲み物 (5-8)
            [ 'product_id' => 5,  'stripe_price_id' => 2001, 'unit_amount' => 120,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 6,  'stripe_price_id' => 2002, 'unit_amount' => 140,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 7,  'stripe_price_id' => 2003, 'unit_amount' => 150,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 8,  'stripe_price_id' => 2004, 'unit_amount' => 180,  'created_at' => now(), 'updated_at' => now() ],

            // 日用品 (9-11)
            [ 'product_id' => 9,  'stripe_price_id' => 3001, 'unit_amount' => 480,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 10, 'stripe_price_id' => 3002, 'unit_amount' => 320,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 11, 'stripe_price_id' => 3003, 'unit_amount' => 250,  'created_at' => now(), 'updated_at' => now() ],

            // 食料品 (12-15)
            [ 'product_id' => 12, 'stripe_price_id' => 4001, 'unit_amount' => 280,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 13, 'stripe_price_id' => 4002, 'unit_amount' => 350,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 14, 'stripe_price_id' => 4003, 'unit_amount' => 420,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 15, 'stripe_price_id' => 4004, 'unit_amount' => 380,  'created_at' => now(), 'updated_at' => now() ],

            // 文房具 (16-18)
            [ 'product_id' => 16, 'stripe_price_id' => 5001, 'unit_amount' => 110,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 17, 'stripe_price_id' => 5002, 'unit_amount' => 200,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 18, 'stripe_price_id' => 5003, 'unit_amount' => 160,  'created_at' => now(), 'updated_at' => now() ],

            // その他 (19-22)
            [ 'product_id' => 19, 'stripe_price_id' => 6001, 'unit_amount' => 980,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 20, 'stripe_price_id' => 6002, 'unit_amount' => 1280, 'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 21, 'stripe_price_id' => 6003, 'unit_amount' => 2200, 'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 22, 'stripe_price_id' => 6004, 'unit_amount' => 680,  'created_at' => now(), 'updated_at' => now() ],
        ]);
    }
}
