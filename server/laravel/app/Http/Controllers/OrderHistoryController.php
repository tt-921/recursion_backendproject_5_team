<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderHistoryController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('user_id');

        if(!$userId){
            return response()->json(['message' => 'User ID is required'], 400);
        }

        $orders = Order::where('user_id', $userId)
            ->with(['orderItems.product'])
            ->get();

        return response()->json([
            'status' => 'success',
            'data' =>$orders
        ]);
    }
}
