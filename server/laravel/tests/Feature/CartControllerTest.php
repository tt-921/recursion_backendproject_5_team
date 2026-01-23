<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Price;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class CartControllerTest extends TestCase
{
    use RefreshDatabase;

    private function createProductAndPrice(): array
    {
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'published',
        ]);
        $price = Price::factory()->create([
            'product_id' => $product->id,
        ]);

        return [$product, $price];
    }

    public function test_guest_can_add_item_and_receive_cart_token_cookie(): void
    {
        [$product, $price] = $this->createProductAndPrice();

        $response = $this->apiPost('cart', [
            'product_id' => $product->id,
            'price_id' => $price->id,
            'quantity' => 2,
        ]);

        $response->assertStatus(200)
            ->assertCookie('cart_token')
            ->assertJsonFragment([
                'product_id' => $product->id,
                'price_id' => $price->id,
                'quantity' => 2,
            ]);

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'price_id' => $price->id,
            'quantity' => 2,
        ]);
    }

    public function test_guest_can_update_and_delete_cart_items_via_cart_item_id(): void
    {
        [$product, $price] = $this->createProductAndPrice();

        $createResponse = $this->apiPost('cart', [
            'product_id' => $product->id,
            'price_id' => $price->id,
            'quantity' => 1,
        ]);
        
        $token = $createResponse->getCookie('cart_token')->getValue();

        $itemId = $createResponse->json('items.0.id');
        
        $updateResponse = $this->withCookie('cart_token', $token)->withCredentials()->apiPut('cart', [
            'cart_item_id' => $itemId,
            'quantity' => 4,
        ]);

        $updateResponse->assertStatus(200)
            ->assertJsonFragment([
                'id' => $itemId,
                'quantity' => 4,
            ]);

        $deleteResponse = $this->withCookie('cart_token', $token)->withCredentials()->apiDelete('cart', [
            'cart_item_id' => $itemId,
        ]);

        $deleteResponse->assertStatus(200)
            ->assertJson([
                'items' => [],
            ]);

        $this->assertDatabaseMissing('cart_items', ['id' => $itemId]);
    }

    public function test_guest_cart_merges_into_user_cart_on_login(): void
    {
        [$guestProduct, $guestPrice] = $this->createProductAndPrice();

        $guestResponse = $this->apiPost('cart', [
            'product_id' => $guestProduct->id,
            'price_id' => $guestPrice->id,
            'quantity' => 2,
        ]);

        $guestToken = $guestResponse->getCookie('cart_token')->getValue();

        [$userProduct, $userPrice] = $this->createProductAndPrice();
        $user = User::factory()->create();

        $userCart = Cart::factory()->create([
            'user_id' => $user->id,
            'cart_token' => (string) Str::uuid(),
        ]);
        $userCart->items()->create([
            'product_id' => $userProduct->id,
            'price_id' => $userPrice->id,
            'quantity' => 1,
        ]);

        $response = $this->withCookie('cart_token', $guestToken)->withCredentials()
            ->actingAs($user)
            ->apiGet('cart');

        $response->assertStatus(200)
            ->assertJsonFragment(['user_id' => $user->id])
            ->assertJsonFragment([
                'product_id' => $guestProduct->id,
                'quantity' => 2,
            ])
            ->assertJsonFragment([
                'product_id' => $userProduct->id,
                'quantity' => 1,
            ]);

        $this->assertDatabaseHas('carts', ['user_id' => $user->id]);
        $this->assertDatabaseMissing('carts', ['cart_token' => $guestToken]);
    }
}
