<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Price;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartItemFactory extends Factory
{
    protected $model = CartItem::class;

    public function definition(): array
    {
        $price = Price::factory()->create();
        $cart = Cart::factory()->create();

        return [
            'cart_id' => $cart->id,
            'product_id' => $price->product_id,
            'price_id' => $price->id,
            'quantity' => $this->faker->numberBetween(1, 5),
        ];
    }
}
