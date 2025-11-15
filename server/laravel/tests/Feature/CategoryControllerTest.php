<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_index()
    {
        Category::factory()->count(2)->create();
        $response = $this->get('/categories');
        $response->assertOk()->assertJsonCount(2);
    }

    public function test_category_show()
    {
        $category = Category::factory()->create();
        $response = $this->get("/categories/{$category->id}");
        $response->assertOk()->assertJsonFragment(['id' => $category->id,]);
    }
}