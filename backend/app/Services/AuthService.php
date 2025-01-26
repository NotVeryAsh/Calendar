<?php

namespace App\Services;

use App\Facades\Event;
use App\Facades\Response;
use Exception;
use Google\Service\Calendar;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AuthService
{    
    public function authenticate(string $redirectUrl): JsonResponse|string
    {
        $client = Event::initialize();

        // TODO add state variables
        // https://github.com/googleapis/google-api-php-client/blob/main/docs/oauth-web.md#state
        
        $client->addScope([
            Calendar::CALENDAR,
            Calendar::CALENDAR_EVENTS,
            Calendar::CALENDAR_SETTINGS_READONLY
        ]);
        
        $client->setRedirectUri($redirectUrl);
        $client->setAccessType('offline');

        return $client->createAuthUrl();
    }
    
    public function getAccessToken(): JsonResponse|array
    {
        // TODO How to track this so user stays logged in?
        // Is it safe to store an oauth token on the frontend in cookies or local storage etc?
        $client = Event::initialize();
        try {
            $token = $client->fetchAccessTokenWithAuthCode(request()->get('code'));
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::respond([], 400, 'Something went wrong. Please try again later.');
        }

        if(isset($token['error'])) {
            Log::error(json_encode($token));
            return Response::respond([], 400, 'Something went wrong. Please try again later.');
        }
        
        return $token;
    }
}