<?php

namespace App\Http\Controllers\Auth;

use App\Facades\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Facades\Auth;

class LoginController extends Controller
{
    public function getAuthUrl(Request $request): JsonResponse
    {
        $redirectUrl = $request->input('redirect_url');

        if(!$redirectUrl) {
            return Response::respond([], 422, 'No request URL was provided.');
        }
        
        $redirectUrl = Auth::authenticate($redirectUrl);
        
        return Response::respond([
            'url' => $redirectUrl
        ]);
    }

    public function getAuthCode(Request $request): JsonResponse
    {
        $code = $request->input('code');
        $scope = $request->input('scope');

        if(!$code) {
            return Response::respond([], 422, 'No code was provided.');
        }

        if(!$scope) {
            return Response::respond([], 422, 'No scope was provided.');
        }

        return Response::respond([
            'token' => Auth::getAccessToken()
        ]);
    }
}
