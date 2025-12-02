<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            FavoriteSeeder::class,
            PriceSeeder::class,
            CartSeeder::class,
            CartItemSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
            InventorySeeder::class,
            ReviewSeeder::class,
            ShipmentSeeder::class,
            ShipmentItemSeeder::class,
            WishlistSeeder::class,
            WishlistItemSeeder::class,
        ]);
    }
}
