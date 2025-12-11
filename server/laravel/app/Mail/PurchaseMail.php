<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class PurchaseMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * メッセージのインスタンスを作成
     */
    public function __construct(User $user)
    {
        //
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('支払い成功しました')
                    ->view('emails.purchase');
    }
}
