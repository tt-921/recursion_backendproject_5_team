<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        // 権限チェックを追加する場合はここで行う
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255','unique:categories,name'],
            'image_url' => ['nullable', 'url'],
        ];
    }
}