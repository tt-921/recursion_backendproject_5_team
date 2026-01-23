<?php

namespace Database\Factories;

use App\Models\Price;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriceFactory extends Factory
{
    protected $model = Price::class;

    public function definition(): array
    {
        $category = Category::factory()->create();
        $product = Product::factory()->create(['category_id' => $category->id, 'status' => 'published']);

        return [
            'product_id' => $product->id,
            'stripe_price_id' => 'price_' . $this->faker->unique()->regexify('[A-Za-z0-9]{14}'),
            'unit_amount' => $this->faker->numberBetween(500, 30000),
            'created_at' => now(),
        ];
    }
}
