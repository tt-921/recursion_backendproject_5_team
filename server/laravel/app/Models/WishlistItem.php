<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishlistItem extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'wishlist_id',
        'product_id',
        'is_deleted'
    ];

    public function wishlist()
    {
        return $this->belongsTo(Product::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
