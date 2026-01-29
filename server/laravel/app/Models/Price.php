<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    use HasFactory;

    // public $timestamps = false;

    protected $fillable = [
        'product_id',
        'stripe_price_id',
        'unit_amount',
        'created_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
