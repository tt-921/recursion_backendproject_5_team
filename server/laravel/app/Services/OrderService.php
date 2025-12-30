<?php

namespace App\Services;

use App\Models\User;
use App\Models\Inventory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Services\MailService;

class OrderService
{
    protected MailService $mailService;

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    /**
     * Stripe セッション完了通知を処理
     */
    public function handleCheckoutSession(object $session)
    {
        $userId = $session->metadata->user_id ?? null;
        $items = json_decode($session->metadata->items ?? '[]', true);

        // メール用に整形
        $itemsForMail = [];
        foreach ($items as $item) {
            if (isset($item['name'], $item['quantity'])) {
                $itemsForMail[] = [
                    'name' => $item['name'],
                    'quantity' => $item['quantity'],
                ];
            } else {
                Log::warning("itemsに必要な情報が不足しています: " . json_encode($item));
            }
        }

        // 在庫確認・引当
        $insufficientStock = [];
        DB::beginTransaction();
        try {
            foreach ($items as $item) {
                $inventory = DB::table('inventories')
                    ->where('product_id', $item['product_id'])
                    ->lockForUpdate() // 同時購入対策
                    ->first();

                if (!$inventory) {
                    $insufficientStock[] = "商品ID {$item['product_id']} が存在しません";
                    continue;
                }

                if ($inventory->stock_quantity < $item['quantity']) {
                    $insufficientStock[] = "商品 {$item['name']} の在庫が足りません";
                }
            }

            if (!empty($insufficientStock)) {
                DB::rollBack();
                Log::warning("購入中止: " . implode(', ', $insufficientStock));
                return;
            }

            // 在庫引当（購入確定）
            foreach ($items as $item) {
                DB::table('inventories')
                    ->where('product_id', $item['product_id'])
                    ->decrement('stock_quantity', $item['quantity']);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("在庫引当中にエラー: " . $e->getMessage());
            return;
        }

        if ($userId) {
            $user = User::find($userId);
            if ($user) {
                // メール送信は MailService に委譲
                $this->mailService->sendPurchaseMail($user, $itemsForMail);
                Log::info("購入確定メールをユーザー：{$user->email}に送信");
            } else {
                Log::warning("ユーザーIDに一致するユーザーが見つかりません: {$userId}");
            }
        } else {
            Log::warning("セッションメタデータにユーザーIDが存在しません");
        }
    }
}
