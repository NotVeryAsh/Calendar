<?php

namespace App\Http\Requests\Auth;

use App\Rules\PassesRecaptcha;
use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'token' => [
                'required',
            ],
            'email' => [
                'required',
                'email',
                'exists:users,email',
            ],
            'password' => [
                'required',
                'min:8',
                'max:60',
                'confirmed',
            ],
            // Validation for a remember checkbox
            'remember' => [
                'nullable',
                'string',
                'in:on',
            ],
            'recaptcha_action' => [
                'required',
                'string',
            ],
            'recaptcha_response' => [
                'required',
                'string',
                new PassesRecaptcha(),
            ],
        ];
    }

    public function messages(): array
    {

        return [
            'token.required' => 'Token is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email is invalid.',
            'email.exists' => 'Email not found.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.max' => 'Password must not be greater than 60 characters.',
            'password.confirmed' => 'Passwords do not match.',
            'remember.in' => 'The remember checkbox must be checked or not.',
            'remember.string' => 'The remember checkbox must be checked or not.',
            'recaptcha_action.required' => 'Recaptcha action is required.',
            'recaptcha_action.string' => 'Recaptcha action is invalid.',
            'recaptcha_response.required' => 'Recaptcha response is required.',
            'recaptcha_response.string' => 'Recaptcha response is invalid.',
        ];
    }
}
