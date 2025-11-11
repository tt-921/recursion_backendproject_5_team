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
        Schema::table('carts', function (Blueprint $table) {
            // 既存のユニーク制約を削除
            $table->dropUnique(['session_id']);

            // 型変更
            $table->string('session_id', 255)->change();

            // 外部キー追加
            $table->foreign('session_id')
                ->references('id')
                ->on('sessions')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('carts', function (Blueprint $table) {
            $table->dropForeign(['session_id']);
            $table->integer('session_id')->unique()->change();
        });
    }
};
