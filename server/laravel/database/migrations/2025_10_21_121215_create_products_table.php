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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->foreignId('default_price_id')->nullable();
            $table->string('status');
            $table->foreignId('category_id')->constrained('categories');
            $table->string('creator');
            $table->timestamps();
            $table->timestamp('released_at')->nullable();
            $table->bigInteger('stripe_product_id')->unique();
            $table->json('seo_tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
