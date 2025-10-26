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
            CartItemSeeder::class,
            CategorySeeder::class,
            FavoriteSeeder::class,
            InventorySeeder::class,
            OrderItemSeeder::class,
            OrderSeeder::class,
            ProductSeeder::class,
            PriceSeeder::class,
            ReviewSeeder::class,
            ShipmentSeeder::class,
            ShipmentItemSeeder::class,
            WishlistSeeder::class,
            WishlistItemSeeder::class,
        ]);
    }
}
