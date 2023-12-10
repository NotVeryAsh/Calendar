<?php

namespace App\Http\Requests\Auth;

use App\Rules\PassesRecaptcha;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'name' => [
                'required',
                'max:255',
                'string'
            ],
            'password' => [
                'required',
                'min:8',
                'max:60',
                'confirmed',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email is required.',
            'email.email' => 'Email is invalid.',
            'email.max' => 'Email must not be greater than 255 characters.',
            'email.unique' => 'Email has already been taken.',
            'name.required' => 'Name is required.',
            'name.max' => 'Name must not be greater than 20 characters.',
            'name.string' => 'Name checkbox must be checked or not.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.max' => 'Password must not be greater than 60 characters.',
            'password.confirmed' => 'Passwords do not match.',
        ];
    }
}
