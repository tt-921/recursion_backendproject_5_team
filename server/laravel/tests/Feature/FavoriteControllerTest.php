<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class FavoriteControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_guest_cannnot_access_favorites()
    {
        $this->apiGet('favorites')->assertUnauthorized();
        $this->apiPost('favorites', ['product_id' => 1])->assertUnauthorized();
        $this->apiDelete('favorites/1')->assertUnauthorized();
    }

    public function test_user_can_get_own_favorites()
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        //外部キー制約があるから、カテゴリも作成する
        $category = Category::factory()->create();

        $productA = Product::factory()->create([
        'category_id' => $category->id,
        ]);
        $productB = Product::factory()->create([
            'category_id' => $category->id,
        ]);

        $userA->favoriteProducts()->syncWithoutDetaching([$productA->id]);
        $userB->favoriteProducts()->syncWithoutDetaching([$productB->id]);

        $res = $this->actingAs($userA, 'sanctum')->apiGet('favorites');
        $res->assertOk()->assertJsonFragment([
            'id' => $productA->id,
        ])->assertJsonMissing([
            'id' => $productB->id,
        ]);
    }

    public function test_user_can_add_favorite()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
        'category_id' => $category->id,
        ]);

        $res = $this->actingAs($user, 'sanctum')->apiPost('favorites', [
            'product_id' => $product->id,
        ]);

        $res->assertCreated()->assertJson([
            'message' => 'お気に入りに追加しました。',
        ]);

        $this->assertDatabaseHas('favorites',[
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);
    }

    public function test_user_can_remove_favorite()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
        'category_id' => $category->id,
        ]);

        $user->favoriteProducts()->syncWithoutDetaching([$product->id]);

        $res = $this->actingAs($user, 'sanctum')->apiDelete("favorites/{$product->id}");
        $res->assertOk()->assertJson([
            'message' => 'お気に入りから削除しました。',
        ]);
        $this->assertDatabaseMissing('favorites',[
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);
    }
}
