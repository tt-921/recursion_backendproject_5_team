<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'お菓子',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '飲み物',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '日用品',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '食料品',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '文房具',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'その他',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
