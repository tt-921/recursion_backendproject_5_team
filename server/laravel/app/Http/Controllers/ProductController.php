<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /products
    public function index(Request $req)
    {
        $q = Product::published()->orderByDesc('released_at')->orderByDesc('id');

        if ($req->filled('category_id')) {
            $q->where('category_id', (int)$req->input('category_id'));
        }
        if ($req->filled('q')) {
            $term = addcslashes((string)$req->input('q'), "%_\\");
            $q->where('title', 'like', "{$term}%");
        }

        return ProductResource::collection(
            $q->with(['category' => fn($qq) => $qq->select('id','name')])->get()
        );
    }

    // GET /products/{id}
    public function show(int $id)
    {
        $p = Product::published()
            ->with(['category' => fn($qq) => $qq->select('id','name')])
            ->findOrFail($id);

        return new ProductResource($p);
    }
}