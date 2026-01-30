<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Price;
use App\Models\Product;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use PhpParser\Node\Expr\FuncCall;
use Tests\TestCase;

class WishlistControllerTest extends TestCase
{
    use RefreshDatabase;

    private function createProduct(): Product
    {
        $category = Category::factory()->create();
        return Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'published',
        ]);
    }

    public function test_user_can_add_product_to_wishlist(): void
    {
        $user = User::factory()->create();
        $product = $this->createProduct();

        $response = $this->actingAs($user)
            ->apiPost('wishlist',[
            'product_id' => $product->id,
            'name' => 'test_name',
            ]);

        $response->assertStatus(200)
            ->assertJson(['message' => '欲しいものリストに追加しました。']);

        $this->assertDatabaseHas('wishlist_items',[
            'product_id' => $product->id,
            'is_deleted' => false,
        ]);
    }

    public function test_user_can_remove_product_from_wishlist(): void
    {
        $user = User::factory()->create();
        $product = $this->createProduct();

        $wishlist = Wishlist::create([
            'user_id' => $user->id,
            'name' => 'test_wishlist',
            //'is_public'=> true,
        ]);
        $wishlist->items()->create([
            'product_id' => $product->id,
            'is_deleted' => false,
        ]);

        $response = $this->actingAs($user)
            ->apiDelete('wishlist',[
                'product_id' => $product->id,
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => '欲しいものリストから削除しました。']);

        $this->assertDatabaseHas('wishlist_items', [
            'product_id' => $product->id,
            'is_deleted' => true,
        ]);
    }

    public function test_user_can_re_add_deleted_item(): void
    {
        $user = User::factory()->create();
        $product = $this->createProduct();


        $wishlist = Wishlist::create([
            'user_id' => $user->id,
            'name'    => 'another wishlist',
           // 'is_public'=> true,
        ]);
        $wishlist->items()->create([
            'product_id' => $product->id,
            'is_deleted' => true,
        ]);

        $response = $this->actingAs($user)
            ->apiPost('wishlist', [
                'product_id' => $product->id,
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('wishlist_items', [
            'product_id' => $product->id,
            'is_deleted' => false,
        ]);
    }

    public function test_user_can_list_wishlist(): void
{
    $user = User::factory()->create();
    $product = $this->createProduct();

    $wishlist = Wishlist::create([
        'user_id' => $user->id,
        'name' => 'test_wishlist',
    ]);
    $wishlist->items()->create([
        'product_id' => $product->id,
        'is_deleted' => false,
    ]);

    $response = $this->actingAs($user)->apiGet('wishlist');

    $response->assertStatus(200);
}

}
