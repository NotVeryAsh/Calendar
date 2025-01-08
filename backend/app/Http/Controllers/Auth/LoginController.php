<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Google\Client;
use Google\Service\Calendar;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function getAuthUrl(Request $request): JsonResponse
    {
        $redirectURI = $request->input('redirect_url');

        if(!$redirectURI) {
            return $this->error('No request URI was provided.', [], 422);
        }

        $client = new Client();

        // TODO try catch
        $client->setAuthConfig(base_path('client-secret.json'));
        $client->addScope([
            Calendar::CALENDAR,
            Calendar::CALENDAR_EVENTS,
            Calendar::CALENDAR_SETTINGS_READONLY
        ]);
        $client->setRedirectUri($redirectURI);
        $client->setAccessType('offline');

        // TODO add state variable to above code
        // https://github.com/googleapis/google-api-php-client/blob/main/docs/oauth-web.md#state

        return $this->success([
            'url' => $client->createAuthUrl()
        ]);
    }

    public function getAuthCode(Request $request): JsonResponse
    {
        $code = $request->input('code');
        $scope = $request->input('scope');

        if(!$code) {
            return $this->error('No code was provided.', [], 422);
        }

        if(!$scope) {
            return $this->error('No scope was provided.', [], 422);
        }

        $client = new Client();
        $client->setAuthConfig(base_path('client-secret.json'));

        // TODO How to track this so user stays logged in?
        // Is it safe to store an oauth token on the frontend in cookies or local storage etc?
        $token = $client->fetchAccessTokenWithAuthCode($request->get('code'));

        if(isset($token['error'])) {
            Log::error(json_encode($token));
            return $this->error($token['error']);
        }

        return $this->success([
            'token' => $token
        ]);
    }
}
