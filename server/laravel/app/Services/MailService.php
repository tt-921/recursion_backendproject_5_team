<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;
use App\Models\User;
use App\Models\Order;


class MailService
{
    /**
     * ユーザー登録時のウェルカムメール　（非同期処理にキューを使用可能）
     */
    public function sendWelcomeMail(User $user)
    {
        Mail::to($user->email)->send(new WelcomeMail($user));
    }

    /**
     * 注文出荷メール（今後実装予定）
     */
    // public function sendOrderShippedMail(Order $order)
    // {
    //     Mail::to($order->user->email)->send(new OrderShippedMail($order));
    // }

    /**
     * 購入完了メール　(今後実装予定）
     */
    // public function sendPurchaseMail(Order $order)
    // {
    //     Mail::to($order->user->email)->send(new PurchaseMail($order));
    // }
}
