<?php

namespace App\Http\Requests\Auth;

use App\Rules\PassesRecaptcha;
use Illuminate\Foundation\Http\FormRequest;

class ResendEmailVerificationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
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
            'recaptcha_action.required' => 'Recaptcha action is required.',
            'recaptcha_action.string' => 'Recaptcha action is invalid.',
            'recaptcha_response.required' => 'Recaptcha response is required.',
            'recaptcha_response.string' => 'Recaptcha response is invalid.',
        ];
    }
}
