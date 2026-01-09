<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Schema;


class OrderHistoryControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Schema::disableForeignKeyConstraints();
    }

    // 各テストメソッドが終わった後に呼ばれる
    protected function tearDown(): void
    {
        Schema::enableForeignKeyConstraints();
        parent::tearDown();
    }

    public function test_user_can_get_order_history_with_products(): void
    {
        $user = User::factory()->create();
        $order = Order::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create(['title' => 'test_product']);

        OrderItem::factory()->create([
            'order_id' => $order->id,
            'product_id' => $product->id,
        ]);

        $response = $this->actingAs($user)
                         ->getJson("/api/order_history?user_id={$user->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'data' => [
                    '*'=>[
                        'id',
                        'user_id',
                        'order_items' => [
                            '*' => [
                                'id',
                                'product'=>[
                                    'id',
                                    'title'
                                ]
                            ]
                        ]
                    ]
                ]
            ])
            ->assertJsonPath('data.0.order_items.0.product.title', 'test_product');
    }

    public function test_returns_error_if_user_id_is_missing()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->getJson('/api/order_history');

        $response->assertStatus(400);
    }
}


