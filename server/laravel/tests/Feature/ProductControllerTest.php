<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PublicProductControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_index()
    {
        $category = Category::factory()->create();
        $published = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'published',
        ]);

        $draft = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'draft',
        ]);

        $response = $this->get('/products');
        $response->assertOk();
        $response->assertJsonFragment(['id' => $published->id]);
        $response->assertJsonMissing(['id' => $draft->id]);
    }

    public function test_product_show()
    {
        $category = Category::factory()->create();
        $published = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'published',
        ]);

        $draft = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'draft',
        ]);
        $responsePublished = $this->get("/products/{$published->id}");
        $responsePublished->assertOk();
        $responsePublished->assertJsonFragment(['id' => $published->id]);
        $responseDraft = $this->get("/products/{$draft->id}");
        $responseDraft->assertStatus(404);
    }
}