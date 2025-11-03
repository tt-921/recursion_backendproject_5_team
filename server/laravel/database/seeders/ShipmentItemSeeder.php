<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShipmentItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shipment_items')->insert([
            [
                'shipment_id' => 1,
                'order_item_id' => 1,
                'quantity' => 1,
            ]
        ]);
    }
}
