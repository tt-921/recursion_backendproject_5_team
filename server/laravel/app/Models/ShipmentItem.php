<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShipmentItem extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'shipment_id',
        'order_item_id',
        'quantity',
    ];

    public function shipment()
    {
        return $this->belongsTo(Shipment::class);
    }
}
