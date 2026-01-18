<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // users テーブルに存在する前提で user_id を使用
        $now = now();

        DB::table('orders')->insert([
            [
                'user_id' => 1,
                'status' => 'completed',
                'total_amount' => 4800,
                'email' => 'test@email.com',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => 1,
                'status' => 'processing',
                'total_amount' => 3200,
                'email' => 'test@email.com',
                'created_at' => $now->copy()->subDays(3),
                'updated_at' => $now->copy()->subDays(3),
            ],
            [
                'user_id' => 2,
                'status' => 'pending',
                'total_amount' => 1500,
                'email' => 'admin@example.com',
                'created_at' => $now->copy()->subDays(7),
                'updated_at' => $now->copy()->subDays(7),
            ],
            [
                'user_id' => 2,
                'status' => 'cancelled',
                'total_amount' => 0,
                'email' => 'admin@example.com',
                'created_at' => $now->copy()->subDays(10),
                'updated_at' => $now->copy()->subDays(10),
            ],
        ]);
    }
}
