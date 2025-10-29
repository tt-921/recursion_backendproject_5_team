<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders');
            $table->string('tracking_no');
            $table->enum('status',['created','in_transit','delivered']);
            $table->timestamp('est_at')->nullable()->comment('予定日時');
            $table->timestamp('shipped_at')->nullable()->comment('発送日時');
            $table->timestamp('delivered_at')->nullable()->comment('配達完了日時');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
