<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
            ],
            'start' => [
                'required',
                'date',
                'before_or_equal:end',
            ],
            'end' => [
                'required',
                'date',
                'after_or_equal:start',
            ],
            "guestsCanModify" => [
                'nullable',
                'bool'
            ],
            "guestsCanInviteOthers" => [
                'nullable',
                'bool'
            ],
            "guestsCanSeeOtherGuests" => [
                'nullable',
                'bool'
            ],
            'status' => [
                'required',
                'in:confirmed,tentative,cancelled',
            ]
        ];
    }
}
