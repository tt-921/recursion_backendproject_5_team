<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $products = [
            // お菓子 (category_id = 1)
            [
                'title' => 'ポテトチップス うすしお',
                'description' => '定番のうすしお味ポテトチップス。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 1,
                'creator' => 'カルビィ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'ポテトチップス うすしお',
                    'description' => '定番スナック菓子のポテトチップス。',
                    'image' => 'https://example.com/images/snack1.jpg',
                ]),
                'released_at' => now()->subDays(5),
            ],
            [
                'title' => 'チョコレートバー',
                'description' => '濃厚ミルクチョコのチョコレートバー。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 1,
                'creator' => 'メイチョ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'チョコレートバー',
                    'description' => '甘くて濃厚なチョコレートバー。',
                    'image' => 'https://example.com/images/snack2.jpg',
                ]),
                'released_at' => now()->subDays(3),
            ],
            [
                'title' => 'ビスケット バター風味',
                'description' => 'バターの香りが広がるサクサクビスケット。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 1,
                'creator' => 'ヤマッツ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'ビスケット バター風味',
                    'description' => 'おやつに最適なバタービスケット。',
                    'image' => 'https://example.com/images/snack3.jpg',
                ]),
                'released_at' => now()->subDays(2),
            ],
            [
                'title' => 'グミ フルーツミックス',
                'description' => 'フルーツ味が楽しめるカラフルグミ。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 1,
                'creator' => 'カバヤン',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'フルーツグミ',
                    'description' => '子供にも人気のフルーツグミ。',
                    'image' => 'https://example.com/images/snack4.jpg',
                ]),
                'released_at' => now()->subDays(1),
            ],

            // 飲み物 (category_id = 2)
            [
                'title' => 'ミネラルウォーター 500ml',
                'description' => '毎日の水分補給に最適なミネラルウォーター。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 2,
                'creator' => 'サントリャ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'ミネラルウォーター',
                    'description' => '安心の国産ミネラルウォーター。',
                    'image' => 'https://example.com/images/drink1.jpg',
                ]),
                'released_at' => now()->subDays(4),
            ],
            [
                'title' => '緑茶 ペットボトル',
                'description' => 'すっきり飲みやすい緑茶。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 2,
                'creator' => 'コカ・コラァ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => '緑茶',
                    'description' => '香り豊かな緑茶。',
                    'image' => 'https://example.com/images/drink2.jpg',
                ]),
                'released_at' => now()->subDays(2),
            ],
            [
                'title' => '缶コーヒー 微糖',
                'description' => 'すっきりした甘さの微糖コーヒー。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 2,
                'creator' => 'ジョージャ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => '缶コーヒー 微糖',
                    'description' => '仕事の合間に最適な缶コーヒー。',
                    'image' => 'https://example.com/images/drink3.jpg',
                ]),
                'released_at' => now()->subDays(2),
            ],
            [
                'title' => 'スポーツドリンク 500ml',
                'description' => '運動後の水分補給に最適。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 2,
                'creator' => 'ポッキャリ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'スポーツドリンク',
                    'description' => '熱中症対策にもおすすめ。',
                    'image' => 'https://example.com/images/drink4.jpg',
                ]),
                'released_at' => now()->subDays(1),
            ],

            // 日用品 (category_id = 3)
            [
                'title' => 'トイレットペーパー 12ロール',
                'description' => 'やわらか素材のトイレットペーパー。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 3,
                'creator' => 'ハナオー',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'トイレットペーパー',
                    'description' => 'まとめ買いに便利な12ロール。',
                    'image' => 'https://example.com/images/daily1.jpg',
                ]),
                'released_at' => now()->subDays(7),
            ],
            [
                'title' => 'キッチン用洗剤',
                'description' => '油汚れに強い濃縮タイプの洗剤。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 3,
                'creator' => 'ライヨン',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'キッチン用洗剤',
                    'description' => '毎日の食器洗いに。',
                    'image' => 'https://example.com/images/daily2.jpg',
                ]),
                'released_at' => now()->subDays(6),
            ],
            [
                'title' => '除菌ウェットティッシュ',
                'description' => '外出先でも使える除菌シート。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 3,
                'creator' => 'ユニチャーム風',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => '除菌ウェットティッシュ',
                    'description' => '持ち運びに便利な除菌シート。',
                    'image' => 'https://example.com/images/daily3.jpg',
                ]),
                'released_at' => now()->subDays(2),
            ],

            // 食料品 (category_id = 4)
            [
                'title' => 'レトルトカレー',
                'description' => '電子レンジで温めるだけの簡単レトルトカレー。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 4,
                'creator' => 'ハウズ食品',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'レトルトカレー',
                    'description' => '手軽に食べられる本格カレー。',
                    'image' => 'https://example.com/images/food1.jpg',
                ]),
                'released_at' => now()->subDays(4),
            ],
            [
                'title' => 'パスタ 1kg',
                'description' => '業務用サイズのスパゲッティ。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 4,
                'creator' => 'バルィラ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'スパゲッティ',
                    'description' => '家庭用にも業務用にも最適。',
                    'image' => 'https://example.com/images/food2.jpg',
                ]),
                'released_at' => now()->subDays(3),
            ],
            [
                'title' => '即席みそ汁 10食セット',
                'description' => 'お湯を注ぐだけの簡単みそ汁。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 4,
                'creator' => 'マルコメ風',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => '即席みそ汁',
                    'description' => '毎日の食卓に便利なみそ汁。',
                    'image' => 'https://example.com/images/food3.jpg',
                ]),
                'released_at' => now()->subDays(3),
            ],
            [
                'title' => '冷凍チャーハン',
                'description' => '電子レンジで温めるだけで本格チャーハン。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 4,
                'creator' => 'ニチレイ風',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => '冷凍チャーハン',
                    'description' => '忙しい時の強い味方。',
                    'image' => 'https://example.com/images/food4.jpg',
                ]),
                'released_at' => now()->subDays(2),
            ],

            // 文房具 (category_id = 5)
            [
                'title' => 'ボールペン 黒 3本セット',
                'description' => '書きやすい黒インクのボールペン。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 5,
                'creator' => 'パイロットォ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'ボールペン',
                    'description' => '職場や学校で使える定番文房具。',
                    'image' => 'https://example.com/images/stationery1.jpg',
                ]),
                'released_at' => now()->subDays(2),
            ],
            [
                'title' => 'ノート A5',
                'description' => '持ち運びに便利なA5サイズのノート。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 5,
                'creator' => 'コクヨウ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'A5ノート',
                    'description' => 'メモや授業用に最適。',
                    'image' => 'https://example.com/images/stationery2.jpg',
                ]),
                'released_at' => now()->subDays(1),
            ],
            [
                'title' => 'シャープペン 0.5mm',
                'description' => 'なめらかな書き心地のシャープペン。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 5,
                'creator' => 'ゼブラァ',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'シャープペン',
                    'description' => '学生から社会人まで使える。',
                    'image' => 'https://example.com/images/stationery3.jpg',
                ]),
                'released_at' => now()->subDays(2),
            ],

            // その他 (category_id = 6)
            [
                'title' => 'エコバッグ',
                'description' => 'コンパクトに折りたためるエコバッグ。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 6,
                'creator' => 'ムジルシ風',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'エコバッグ',
                    'description' => 'お買い物に便利なエコバッグ。',
                    'image' => 'https://example.com/images/other1.jpg',
                ]),
                'released_at' => now()->subDays(2),
            ],
            [
                'title' => '折りたたみ傘',
                'description' => '突然の雨に備えられる軽量折りたたみ傘。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 6,
                'creator' => 'ワコール風雨具',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => '折りたたみ傘',
                    'description' => '軽量で持ち運びやすい傘。',
                    'image' => 'https://example.com/images/other2.jpg',
                ]),
                'released_at' => now()->subDays(1),
            ],
            [
                'title' => 'モバイルバッテリー 10000mAh',
                'description' => '外出先でも安心の大容量バッテリー。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 6,
                'creator' => 'アンカー風',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'モバイルバッテリー',
                    'description' => 'スマホの充電切れ対策に。',
                    'image' => 'https://example.com/images/other3.jpg',
                ]),
                'released_at' => now()->subDays(1),
            ],
            [
                'title' => 'USB-C 充電ケーブル',
                'description' => '急速充電対応のUSB-Cケーブル。',
                'default_price_id' => null,
                'status' => 'published',
                'category_id' => 6,
                'creator' => 'エレコム風',
                'stripe_product_id' => null,
                'seo_tags' => json_encode([
                    'title' => 'USB-Cケーブル',
                    'description' => 'データ転送にも対応。',
                    'image' => 'https://example.com/images/other4.jpg',
                ]),
                'released_at' => now()->subDays(1),
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->updateOrInsert(
                ['title' => $product['title']],
                array_merge($product, [
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }
    }
}
