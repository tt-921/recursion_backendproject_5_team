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
                'name' => 'test_category1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'test_category2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'test_category3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
