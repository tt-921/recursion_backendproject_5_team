<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\PurchaseMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Stripe\Stripe;
use Stripe\Webhook;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = config('services.stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
        } catch (\Exception $e) {
            Log::error('Stripe Webhookエラー: ' . $e->getMessage());
            return response()->json(['error' => 'Invalid payload'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            $userId = $session->metadata->user_id ?? null;

            if ($userId) {
                $user = User::find($userId);
                if ($user) {
                    Mail::to($user->email)->send(new PurchaseMail($user));
                    Log::info("購入確定メールをユーザー：{$user->email}を送信");
                } else {
                    Log::warning("ユーザーIDに一致するユーザーが見つかりません: {$userId}");
                }
            } else {
                Log::warning("セッションメタデータにユーザーIDが存在しません");
            }
        }


        return response()->json(['status' => 'success']);
    }
}
