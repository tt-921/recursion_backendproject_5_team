<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\WishlistRequest;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $wishlists = $user->wishlistProducts()->get();

        return response()->json($wishlists);
    }

    public function add(Request $request)
    {
        // 1. バリデーション
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = $request->user();

        // 2. 親のウィッシュリストを取得、なければ作成
        // ここで 'name' と 'is_public' を確実にセットします
        $wishlist = $user->wishlist()->firstOrCreate(
            [], // 検索条件
            [
                'name' => '欲しいものリスト',
                'is_public' => false,
            ]
        );

        // 3. 中間テーブル（wishlist_items）の操作
        // 複合キーでのエラーを避けるため、クエリを直接指定して更新・作成します
        $itemQuery = $wishlist->items()->where('product_id', $validated['product_id']);

        if ($itemQuery->exists()) {
            // すでにデータがある場合は、その行を「削除されていない状態」に更新
            $itemQuery->update(['is_deleted' => false]);
        } else {
            // データがない場合は、新しく登録
            $wishlist->items()->create([
                'product_id' => $validated['product_id'],
                'is_deleted' => false,
            ]);
        }

        return response()->json(['message' => '欲しいものリストに追加しました。']);
    }

    public function remove(Request $request)
    {
        $validated = $request->validate(
            [
                'product_id' => 'required|exists:products,id',
            ]
            );

        $user = $request->user();

        $wishlist = $user->wishlist;

        if ($wishlist) {
            $wishlist->items()
                ->where('product_id' , $validated['product_id'])
                ->update(['is_deleted' => true]);
        }

        return response()->json(['message' => '欲しいものリストから削除しました。']);
    }
}
