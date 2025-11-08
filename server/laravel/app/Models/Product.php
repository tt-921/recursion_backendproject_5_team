<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'default_price_id',
        'status',
        'category_id',
        'creator',
        'stripe_product_id',
        'seo_tags',
        'released_at',
    ];

    protected $casts = [
        'seo_tags' => 'array',
        'released_at' => 'datetime',
    ];
}
