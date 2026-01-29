<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Adjust authorization logic as needed.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'default_price_id' => 'nullable|integer',
            'status' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'creator' => 'nullable|string',
            'stripe_product_id' => 'nullable|string',
            'seo_tags' => 'nullable|array',
            'released_at' => 'nullable|date',
        ];
    }
}
