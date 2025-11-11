<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sessions')->insert([
            [
                'id' => 'session_id_guest',
                'user_id' => null,
                'ip_address' => '192.168.0.10',
                'user_agent' => 'Mozilla/5.0 (Guest)',
                'payload' => base64_encode(serialize([])),
                'last_activity' => Carbon::now()->timestamp,
            ],
            [
                'id' => 'session_id_user', 
                'user_id' => 1,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 (SeederTest)',
                'payload' => base64_encode(serialize([])),
                'last_activity' => Carbon::now()->timestamp,
            ],
        ]);
    }
}
