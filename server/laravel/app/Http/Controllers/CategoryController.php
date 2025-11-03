<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Category::orderBy('id','asc')->get()
        );
    }

    public function show(Category $category): JsonResponse
    {
        return response()->json($category);
    }
}