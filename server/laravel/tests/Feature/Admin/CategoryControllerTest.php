<?php

namespace Tests\Feature\Admin;;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Product;
use App\Models\Category;

class CategoryControllerTest extends TestCase{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->actingAs($user, 'web');
    }

    public function test_category_index()
    {
        Category::factory()->count(2)->create();
        $response = $this->adminGet('categories');
        $response->assertOk()->assertJsonCount(2);
    }

    public function test_catefgory_store()
    {
        $postData = [
            'name' => '新規カテゴリ',
        ];

        $response = $this->adminPost('categories', $postData);
        $response-> assertCreated()->assertJsonFragment(['name' => '新規カテゴリ']);
        $this->assertDatabaseHas('categories', ['name' => '新規カテゴリ',]);
    }

    public function test_category_store_with_invalid_data()
    {
        $postDataWithoutName = [
            // 'name' => 'カテゴリ名がない場合',
        ];

        $response = $this->adminPost('categories', $postDataWithoutName);
        $response->assertStatus(422);
        $this->assertDatabaseMissing('categories', ['name' => null]);
    }

    public function test_category_show(){
        $category = Category::factory()->create();
        $response = $this->adminGet("categories/{$category->id}");
        $response->assertOk()->assertJsonFragment(['id' => $category->id,]);
    }

    public function test_category_update(){
        $category = Category::factory()->create(['name' => '更新前カテゴリ名',]);

        $updateData = [
            'name' => '更新後カテゴリ名',
        ];

        $response = $this->adminPut("categories/{$category->id}", $updateData);
        $response->assertOk()->assertJsonFragment(['name' => '更新後カテゴリ名',]);
        $this->assertDatabaseHas('categories', ['id' => $category->id, 'name' => '更新後カテゴリ名',]);
    }

    public function test_category_update_with_invalid_data(){
        $category = Category::factory()->create(['name' => '更新前カテゴリ名',]);

        $updateData = [
            'name' => null, // 無効なデータ（空の名前）
        ];

        $response = $this->adminPut("categories/{$category->id}", $updateData);
        $response->assertStatus(422);
        $this->assertDatabaseHas('categories', ['id' => $category->id, 'name' => '更新前カテゴリ名',]);
    }

    public function test_category_delete(){
        $category = Category::factory()->create();

        $response = $this->adminDelete("categories/{$category->id}");
        $response->assertOk();
        $this->assertDatabaseMissing('categories', ['id' => $category->id,]);
    }

    public function test_non_admin_is_guarded(){
        $nonAdmin = User::factory()->create([
            'role' => 'user',
        ]);
        $this->actingAs($nonAdmin,'web');

        $postData = [
            'name' => 'ガードテストカテゴリ',
        ];
        $createResponse = $this->adminPost('categories', $postData);
        $createResponse->assertForbidden();

        $category = Category::factory()->create(['name' => '既存カテゴリ']);
        $updateData = [
            'name' => '更新後カテゴリ名',
        ];
        $updateResponse = $this->adminPut("categories/{$category->id}", $updateData);
        $updateResponse->assertForbidden();

        $deleteResponse = $this->adminDelete("categories/{$category->id}");
        $deleteResponse->assertForbidden();
    }

}