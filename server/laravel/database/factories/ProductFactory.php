<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition()
    {
        return [
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(),
            'default_price_id' => null,
            'status' => 'draft',
            'category_id' => 1,
            'creator' => $this->faker->name(),
            'stripe_product_id' => 'prod_' . $this->faker->unique()->regexify('[A-Za-z0-9]{14}'),
            'seo_tags' => [
                'title' => $this->faker->sentence(4),
                'description' => $this->faker->sentence(8),
                'image' => $this->faker->imageUrl(),
            ],
            'released_at' => now(),
        ];
    }
}
