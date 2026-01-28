<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'status'      => $this->status,
            'released_at' => optional($this->released_at)->toDateString(),
            'default_price' => $this->whenLoaded('defaultPrice', function () {
                return [
                    'id' => $this->defaultPrice->id,
                    'unit_amount' => $this->defaultPrice->unit_amount,
                    'stripe_price_id' => $this->defaultPrice->stripe_price_id,
                ];
            }),
        ];
    }
}
