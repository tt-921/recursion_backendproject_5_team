<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CartController extends Controller
{
    // GET /cart
    public function index(Request $request)
    {
        [$cart, $cookie] = $this->resolveCart($request);

        $response = response()->json($this->serializeCart($cart));
        if ($cookie) {
            $response->withCookie($cookie);
        }

        return $response;
    }

    // POST /cart
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'price_id'   => ['required', 'exists:prices,id'],
            'quantity'   => ['required', 'integer', 'min:1'],
        ]);

        [$cart, $cookie] = $this->resolveCart($request);

        $price = Price::findOrFail($data['price_id']);
        if ($price->product_id !== $data['product_id']) {
            abort(422, 'price_id does not belong to the given product_id');
        }

        $item = $cart->items()
            ->where('product_id', $data['product_id'])
            ->where('price_id', $data['price_id'])
            ->first();

        if ($item) {
            $item->increment('quantity', $data['quantity']);
        } else {
            $cart->items()->create($data);
        }

        $cart->refresh();

        $response = response()->json($this->serializeCart($cart));
        if ($cookie) {
            $response->withCookie($cookie);
        }

        return $response;
    }

    // PUT /cart
    public function update(Request $request)
    {
        $data = $request->validate([
            'cart_item_id' => ['required', 'exists:cart_items,id'],
            'quantity'     => ['required', 'integer', 'min:1'],
        ]);

        [$cart, $cookie] = $this->resolveCart($request);

        $item = $cart->items()->where('id', $data['cart_item_id'])->firstOrFail();
        
        $item->update(['quantity' => $data['quantity']]);

        $cart->refresh();

        $response = response()->json($this->serializeCart($cart));
        if ($cookie) {
            $response->withCookie($cookie);
        }

        return $response;
    }

    // DELETE /cart
    public function destroy(Request $request)
    {
        $data = $request->validate([
            'cart_item_id' => ['required', 'exists:cart_items,id'],
        ]);

        [$cart, $cookie] = $this->resolveCart($request);

        $item = $cart->items()->where('id', $data['cart_item_id'])->firstOrFail();
        $item->delete();

        $cart->refresh();

        $response = response()->json($this->serializeCart($cart));
        if ($cookie) {
            $response->withCookie($cookie);
        }

        return $response;
    }

    private function resolveCart(Request $request): array
    {
        $cart = null;
        $cookie = null;
        $cart_token = $request->cookie('cart_token');

        $cart = Cart::where('cart_token', $cart_token)->first();

        if (!$cart) {
            $cart = Cart::create([
                'cart_token' => (string) Str::uuid(),
                'user_id' => null,
            ]);
            $cookie = cookie('cart_token', $cart->cart_token, 60 * 24 * 30);
        }

        // ここから認証ステータスを考慮する
        $user = Auth::user();
        if ($user) {
            $userCart = Cart::where('user_id', $user->id)->first();
            if ($userCart) {
                if ($userCart->id !== $cart->id) {
                    $this->mergeCarts($userCart, $cart);
                    $cart = $userCart;

                    $cookie = cookie('cart_token', $cart->cart_token, 60 * 24 * 30);
                }
            } else {
                $cart->user_id = $user->id;
                $cart->save();
            }
        }

        return [
            $cart->load(['items.product:id,title', 'items.price:id,unit_amount']),
            $cookie,
        ];
    }

    private function mergeCarts(Cart $target, Cart $source): void
    {
        // ソースカートのアイテムをロード
        $source->load('items');

        // ターゲットカートにアイテムをマージ
        foreach ($source->items as $item) {
            $existing = $target->items()
                ->where('product_id', $item->product_id)
                ->where('price_id', $item->price_id)
                ->first();

            if ($existing) {
                $existing->increment('quantity', $item->quantity);
            } else {
                $target->items()->create([
                    'product_id' => $item->product_id,
                    'price_id' => $item->price_id,
                    'quantity' => $item->quantity,
                ]);
            }
        }

        // ソースカートを削除
        $source->delete();
    }

    private function serializeCart(Cart $cart): array
    {
        $items = $cart->items->map(function (CartItem $item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'price_id' => $item->price_id,
                'quantity' => $item->quantity,
                'product_title' => optional($item->product)->title,
                'unit_amount' => optional($item->price)->unit_amount,
            ];
        });

        return [
            'id' => $cart->id,
            'user_id' => $cart->user_id,
            'cart_token' => $cart->cart_token,
            'items' => $items,
        ];
    }
}
