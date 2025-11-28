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

    // GET /products/search
    public function search(Request $request)
    {
        $data = $request->validate([
            'keyword' => ['required', 'string', 'max:255'],
        ]);

        $keyword = trim($data['keyword']);
        if ($keyword === '') {
            return response()->json([
                'count' => 0,
                'products' => [],
            ]);
        }

        $term = addcslashes($keyword, "%_\\");
        $products = Product::published()
            ->where(function ($q) use ($term) {
                $q->where('title', 'like', "%{$term}%")
                    ->orWhere('description', 'like', "%{$term}%");
            })
            ->with(['category' => fn($qq) => $qq->select('id','name')])
            ->orderByDesc('released_at')
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'count' => $products->count(),
            'products' => $products->map(
                fn($product) => (new ProductResource($product))->toArray($request)
            ),
        ]);
    }
}
