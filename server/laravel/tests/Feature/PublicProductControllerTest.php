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

        $response = $this->apiGet('products');
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
        $responsePublished = $this->apiGet("products/{$published->id}");
        $responsePublished->assertOk();
        $responsePublished->assertJsonFragment(['id' => $published->id]);
        $responseDraft = $this->apiGet("products/{$draft->id}");
        $responseDraft->assertStatus(404);
    }

    public function test_product_search_returns_matching_published_products_only()
    {
        $category = Category::factory()->create();

        $matchByTitle = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'published',
            'title' => 'Alpha Phone',
        ]);
        $matchByDescription = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'published',
            'title' => 'Gamma Device',
            'description' => 'A powerful alpha gadget',
        ]);
        $nonMatch = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'published',
            'title' => 'Beta Phone',
            'description' => 'Nothing to see here',
        ]);
        $draft = Product::factory()->create([
            'category_id' => $category->id,
            'status' => 'draft',
            'title' => 'Alpha Draft',
        ]);

        $response = $this->apiGet('products/search?keyword=alpha');

        $response->assertOk();
        $response->assertJsonPath('count', 2);
        $this->assertEqualsCanonicalizing(
            [$matchByTitle->id, $matchByDescription->id],
            $response->json('products.*.id')
        );
        $this->assertNotContains($nonMatch->id, $response->json('products.*.id'));
        $this->assertNotContains($draft->id, $response->json('products.*.id'));
    }

    public function test_product_search_requires_keyword()
    {
        $response = $this->apiGet('products/search');

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['keyword']);
    }
}
