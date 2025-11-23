<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Assuming guest cart
        DB::table('carts')->insert([
            'user_id' => null,
            'cart_token' => 'guest_cart_token_1234567890abcdef',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        // Assuming user cart
        DB::table('carts')->insert([
            'user_id' => 1, 
            'cart_token' => 'user_cart_token_1234567890abcdef',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
