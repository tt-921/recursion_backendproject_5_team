<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        DB::table('order_items')->insert([
            // order_id = 1
            [
                'order_id' => 1,
                'product_id' => 1,
                'price_id' => 1,
                'quantity' => 2,
                'unit_amount' => 1200,
                'created_at' => $now,
            ],
            [
                'order_id' => 1,
                'product_id' => 2,
                'price_id' => 2,
                'quantity' => 1,
                'unit_amount' => 2400,
                'created_at' => $now,
            ],

            // order_id = 2
            [
                'order_id' => 2,
                'product_id' => 1,
                'price_id' => 1,
                'quantity' => 1,
                'unit_amount' => 1200,
                'created_at' => $now->copy()->subDays(3),
            ],
            [
                'order_id' => 2,
                'product_id' => 3,
                'price_id' => 3,
                'quantity' => 2,
                'unit_amount' => 1000,
                'created_at' => $now->copy()->subDays(3),
            ],

            // order_id = 3
            [
                'order_id' => 3,
                'product_id' => 4,
                'price_id' => 4,
                'quantity' => 1,
                'unit_amount' => 1500,
                'created_at' => $now->copy()->subDays(7),
            ],
        ]);
    }
}
