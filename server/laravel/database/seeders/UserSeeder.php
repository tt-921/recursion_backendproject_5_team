<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'email' => 'test@email.com',
                'password_hash' => 'test1234',
                'name' => 'shinzo_abe',
                'role' => 'admin'
            ]
        ]);
    }
}
