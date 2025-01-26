<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;

class ResponseService
{
    public function success($data = [], $code = 200): JsonResponse
    {
        return response()->json($data, $code);
    }

    public function error($data = [], $code = 400, $message = ''): JsonResponse
    {
        return response()->json([
            'message' => $message,
            ...$data
        ], $code);
    }
    
    public function respond($data = [], $code = 200, $message = ''): JsonResponse
    {
        if($code > 200 && $code < 300){
            return $this->success($data, $code);
        }
        
        return $this->error($data, $code, $message);
    }
}