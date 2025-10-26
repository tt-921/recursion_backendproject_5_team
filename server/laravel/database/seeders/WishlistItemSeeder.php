<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WishlistItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('wishlist_items')->insert([
            [
                'product_id' => 1,
                'wishlist_id' => 1,
            ]
        ]);
    }
}
