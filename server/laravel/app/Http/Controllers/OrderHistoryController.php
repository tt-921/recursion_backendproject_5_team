<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderHistoryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $orders = Order::where('user_id', $user->id)
        ->with(['orderItems.product'])
        ->get();

        return response()->json(['status' => 'success', 'data' => $orders]);
    }
}
