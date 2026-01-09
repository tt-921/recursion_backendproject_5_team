<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'product_id',
        'price_id',
        'quantity',
        'unit_amount',
        'created_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
