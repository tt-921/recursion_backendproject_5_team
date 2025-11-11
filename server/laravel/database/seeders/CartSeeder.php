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
        DB::table('carts')->insert([
            [
                'user_id' => 1,
                'session_id' => 'session_id_guest',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
