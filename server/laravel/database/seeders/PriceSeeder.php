<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Services\StripeService;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stripeService = new StripeService();

        $prices = [
            // お菓子 (1-4)
            [ 'product_id' => 1,  'stripe_price_id' => 'price_001001', 'unit_amount' => 150 ],
            [ 'product_id' => 2,  'stripe_price_id' => 'price_001002', 'unit_amount' => 180 ],
            [ 'product_id' => 3,  'stripe_price_id' => 'price_001003', 'unit_amount' => 200 ],
            [ 'product_id' => 4,  'stripe_price_id' => 'price_001004', 'unit_amount' => 160 ],

            // 飲み物 (5-8)
            [ 'product_id' => 5,  'stripe_price_id' => 'price_002001', 'unit_amount' => 120 ],
            [ 'product_id' => 6,  'stripe_price_id' => 'price_002002', 'unit_amount' => 140 ],
            [ 'product_id' => 7,  'stripe_price_id' => 'price_002003', 'unit_amount' => 150 ],
            [ 'product_id' => 8,  'stripe_price_id' => 'price_002004', 'unit_amount' => 180 ],

            // 日用品 (9-11)
            [ 'product_id' => 9,  'stripe_price_id' => 'price_003001', 'unit_amount' => 480 ],
            [ 'product_id' => 10, 'stripe_price_id' => 'price_003002', 'unit_amount' => 320 ],
            [ 'product_id' => 11, 'stripe_price_id' => 'price_003003', 'unit_amount' => 250 ],

            // 食料品 (12-15)
            [ 'product_id' => 12, 'stripe_price_id' => 'price_004001', 'unit_amount' => 280 ],
            [ 'product_id' => 13, 'stripe_price_id' => 'price_004002', 'unit_amount' => 350 ],
            [ 'product_id' => 14, 'stripe_price_id' => 'price_004003', 'unit_amount' => 420 ],
            [ 'product_id' => 15, 'stripe_price_id' => 'price_004004', 'unit_amount' => 380 ],

            // 文房具 (16-18)
            [ 'product_id' => 16, 'stripe_price_id' => 'price_005001', 'unit_amount' => 110 ],
            [ 'product_id' => 17, 'stripe_price_id' => 'price_005002', 'unit_amount' => 200 ],
            [ 'product_id' => 18, 'stripe_price_id' => 'price_005003', 'unit_amount' => 160 ],

            // その他 (19-22)
            [ 'product_id' => 19, 'stripe_price_id' => 'price_006001', 'unit_amount' => 980 ],
            [ 'product_id' => 20, 'stripe_price_id' => 'price_006002', 'unit_amount' => 1280 ],
            [ 'product_id' => 21, 'stripe_price_id' => 'price_006003', 'unit_amount' => 2200 ],
            [ 'product_id' => 22, 'stripe_price_id' => 'price_006004', 'unit_amount' => 680 ],
        ];

        foreach ($prices as $priceData) {
            echo "product_id: {$priceData['product_id']} を処理\n";

            try {
                // 対応する Product を DB から取得
                $product = DB::table('products')
                    ->where('id', $priceData['product_id'])
                    ->first();

                if (!$product) {
                    echo "   Product が見つかりません (ID: {$priceData['product_id']})\n";
                    continue;
                }

                if (!$product->stripe_product_id) {
                    echo "  ✗ Product に stripe_product_id がありません(ID: {$priceData['product_id']})\n";
                    continue;
                }

                // Stripe に Price を作成
                $stripePriceId = $stripeService->createOrUpdatePrice([
                    'stripe_product_id' => $product->stripe_product_id,
                    'unit_amount' => $priceData['unit_amount'],
                    'currency' => 'jpy',
                    'metadata' => [
                        'product_id' => $priceData['product_id'],
                    ],
                ]);

                echo "  Stripe Price 作成成功: {$stripePriceId}\n";

                // DB に upsert（product_idで一意性を確保）
                DB::table('prices')->updateOrInsert(
                    ['product_id' => $priceData['product_id']],
                    [
                        'product_id' => $priceData['product_id'],
                        'stripe_price_id' => $stripePriceId,
                        'unit_amount' => $priceData['unit_amount'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );

                echo "  データベース更新\n";

                // デフォルト価格として製品テーブルを更新
                $priceId = DB::table('prices')
                    ->where('product_id', $priceData['product_id'])
                    ->value('id');

                if ($priceId) {
                    DB::table('products')
                        ->where('id', $priceData['product_id'])
                        ->update(['default_price_id' => $priceId]);
                    
                    echo "  商品をデフォルト価格に設定\n";
                }
            } catch (\Exception $e) {
                echo "  エラー: {$e->getMessage()}\n";
            }
        }

        echo "\nPriceSeeder 完了!\n";
    }
}
