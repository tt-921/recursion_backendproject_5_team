<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'title' => 'testproduct',
                'description' => 'this product is test',
                'default_price_id' => null,
                'status' => 'draft',
                'category_id' => 1,
                'creator' => 'shinzo_abe',
                'stripe_product_id' => 1,
                'seo_tags' => json_encode([
                    'title' => '会社概要 | ブランド名',
                    'description' => '私たちについて。創業から現在までの歩みをご紹介します。',
                    'image' => 'https://example.com/images/about.jpg',
                ]),
                'released_at' => null,
            ],
            [
                'title' => 'published_test_product',
                'description' => 'this is a published test product',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 1,
                'creator' => 'hiroki',
                'stripe_product_id' => 2,
                'seo_tags' => json_encode([
                    'title' => '商品紹介 | テストブランド',
                    'description' => 'この商品は公開済みテストデータです。',
                    'image' => 'https://example.com/images/product.jpg',
                ]),
                'released_at' => now()->subDay(),
            ],
        ]);
    }
}
