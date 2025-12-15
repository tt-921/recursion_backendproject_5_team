<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('inventories')->insert([
            // お菓子 (1-4)
            [ 'product_id' => 1,  'stock_quantity' => 120, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 2,  'stock_quantity' => 90,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 3,  'stock_quantity' => 80,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 4,  'stock_quantity' => 100, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],

            // 飲み物 (5-8)
            [ 'product_id' => 5,  'stock_quantity' => 200, 'reserved_quantity' => 00, 'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 6,  'stock_quantity' => 180, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 7,  'stock_quantity' => 150, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 8,  'stock_quantity' => 170, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],

            // 日用品 (9-11)
            [ 'product_id' => 9,  'stock_quantity' => 60,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 10, 'stock_quantity' => 55,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 11, 'stock_quantity' => 70,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],

            // 食料品 (12-15)
            [ 'product_id' => 12, 'stock_quantity' => 95,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 13, 'stock_quantity' => 85,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 14, 'stock_quantity' => 110, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 15, 'stock_quantity' => 90,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],

            // 文房具 (16-18)
            [ 'product_id' => 16, 'stock_quantity' => 140, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 17, 'stock_quantity' => 130, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 18, 'stock_quantity' => 125, 'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],

            // その他 (19-22)
            [ 'product_id' => 19, 'stock_quantity' => 40,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 20, 'stock_quantity' => 35,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 21, 'stock_quantity' => 50,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
            [ 'product_id' => 22, 'stock_quantity' => 65,  'reserved_quantity' => 0,  'created_at' => now(), 'updated_at' => now() ],
        ]);
    }
}
