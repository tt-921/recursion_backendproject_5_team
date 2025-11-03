<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];

    public function scopeLatestFirst($q)
    {
        return $q->orderByDesc('created_at')->orderByDesc('id');
    }
}