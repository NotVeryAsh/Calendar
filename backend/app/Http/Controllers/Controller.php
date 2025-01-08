<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class Controller
{
    public function success($data = [], $code = 200): JsonResponse
    {
        return response()->json($data, $code);
    }

    public function error($message, $data = [], $code = 400): JsonResponse
    {
        return response()->json([
            'message' => $message,
            ...$data
        ], $code);
    }
}
