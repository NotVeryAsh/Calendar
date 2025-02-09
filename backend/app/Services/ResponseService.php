<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use JetBrains\PhpStorm\NoReturn;

class ResponseService
{
    #[NoReturn]
    /**
     * Send a response back to the browser
     */
    public function respond($data = [], $code = 200, $message = 'Something went wrong. Please try again later.'): JsonResponse
    {        
        if($code > 399){
            $data['message'] = $message;
        }
                
         return response()->json($data, $code);
    }
}