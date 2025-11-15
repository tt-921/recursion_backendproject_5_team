<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Category::all()
        );
    }

    public function show(int $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }
}