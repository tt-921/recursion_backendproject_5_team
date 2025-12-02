<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FavoriteStoreRequest;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $favorites = $user->favoriteProducts()->with('category')->get();

        return response()->json($favorites);
    }

    public function store(FavoriteStoreRequest $request)
    {
        $user = $request->user();
        $validated = $request->validated();

        $user->favoriteProducts()->syncWithoutDetaching([
        $validated['product_id']]); 
        return response()->json(['message' => 'お気に入りに追加しました。'], 201);       
    }

    public function destroy(Request $request, $productId)
    {
        $user = $request->user();

        $user->favoriteProducts()->detach($productId);

        return response()->json(['message' => 'お気に入りから削除しました。']);
    }
}
