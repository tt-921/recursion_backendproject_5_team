<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

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

    protected $hidden = ['default_price_id', 'stripe_product_id', 'creator', 'seo_tags'];

    public function scopePublished($q)
    {
        return $q->where('status', 'published');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites')
            ->withTimestamps();
    }

    public function defaultPrice()
    {
        return $this->belongsTo(Price::class, 'default_price_id');
    }
}
