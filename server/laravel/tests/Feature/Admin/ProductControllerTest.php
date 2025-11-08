<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Product;
use App\Models\Category;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // テスト用カテゴリ作成（外部キー制約対策）
        Category::factory()->create(['id' => 1, 'name' => 'テストカテゴリ']);

        $user = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->actingAs($user, 'web');
    }

    public function test_product_index()
    {

        Product::factory()->count(2)->create(['category_id' => 1]);
        $response = $this->get('/admin/products');
        $response->assertOk()->assertJsonCount(2);
    }

    public function test_product_store()
    {
        $postData = [
            'title' => '新規商品',
            'description' => '商品詳細説明',
            'default_price_id' => null,
            'status' => 'draft',
            'category_id' => 1,
            'creator' => 'テストユーザ',
            'stripe_product_id' => 123456,
            'seo_tags' => [
                'title' => 'SEOタイトル',
                'description' => 'SEO説明',
                'image' => 'https://example.com/test.jpg',
            ],
            'released_at' => now()->toDateTimeString(),
        ];

        $response = $this->postJson('/admin/products', $postData);
        $response->assertCreated()->assertJsonFragment(['title' => '新規商品']);
        $this->assertDatabaseHas('products', ['title' => '新規商品']);
    }

    public function test_product_store_with_invalid_data()
    {
        $postDataWithoutTitle = [
            'description' => '商品詳細説明',
            'default_price_id' => null,
            'status' => 'draft',
            'category_id' => 1,
            'creator' => 'テストユーザ',
            'stripe_product_id' => 123456,
            'seo_tags' => [
                'title' => 'SEOタイトル',
                'description' => 'SEO説明',
                'image' => 'https://example.com/test.jpg',
            ],
            'released_at' => now()->toDateTimeString(),
        ];

        $response = $this->postJson('/admin/products', $postDataWithoutTitle);
        $response->assertStatus(422);
    }

    public function test_product_show()
    {
        $product = Product::factory()->create(['category_id' => 1]);
        $response = $this->get("/admin/products/{$product->id}");
        $response->assertOk()->assertJsonFragment(['id' => $product->id]);
    }

    public function test_product_update()
    {
        $product = Product::factory()->create(['category_id' => 1, 'title'=>'旧タイトル']);
        $updatedData = $product->toArray();
        $updatedData['title'] = '新タイトル';
        $response = $this->putJson("/admin/products/{$product->id}", $updatedData);
        $response->assertOk()->assertJsonFragment(['title' => '新タイトル']);
        $this->assertDatabaseHas('products', ['id' => $product->id, 'title' => '新タイトル']);
    }

    public function test_product_update_with_invalid_data()
    {
        $product = Product::factory()->create(['category_id' => 1, 'title'=>'旧タイトル']);
        $updatedData = $product->toArray();
        $updatedData['title'] = null;
        $response = $this->putJson("/admin/products/{$product->id}", $updatedData);
        $response->assertStatus(422);
        $this->assertDatabaseHas('products', ['id' => $product->id, 'title' => '旧タイトル']);
    }

    public function test_product_delete()
    {
        $product = Product::factory()->create(['category_id' => 1]);
        $response = $this->delete("/admin/products/{$product->id}");
        $response->assertOk();
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    public function test_non_admin_is_guarded()
    {
        // 管理者ではないユーザーで再度認証
        $nonAdmin = User::factory()->create(['role' => 'user']);
        $this->actingAs($nonAdmin, 'web');

        // 作成はガードされる（403 Forbidden を期待）
        $postData = [
            'title' => 'ガードテスト商品',
            'description' => 'ガード確認用',
            'default_price_id' => null,
            'status' => 'draft',
            'category_id' => 1,
            'creator' => 'テストユーザ',
            'stripe_product_id' => 999999,
            'seo_tags' => [
                'title' => 'SEO',
                'description' => 'SEO',
                'image' => 'https://example.com/test.jpg',
            ],
            'released_at' => now()->toDateTimeString(),
        ];

        $createResponse = $this->postJson('/admin/products', $postData);
        $createResponse->assertForbidden();

        // 削除もガードされる
        $product = Product::factory()->create(['category_id' => 1]);
        $deleteResponse = $this->delete("/admin/products/{$product->id}");
        $deleteResponse->assertForbidden();
    }
}
