<?php

namespace App\Services;

use App\Facades\Event;
use App\Facades\Response;
use Exception;
use Google\Service\Calendar;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

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

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     * @throws Exception
     */
    public function getAccessToken(): JsonResponse|array
    {
        // TODO How to track this so user stays logged in?
        // Is it safe to store an oauth token on the frontend in cookies or local storage etc?
        $client = Event::initialize();
        $token = $client->fetchAccessTokenWithAuthCode(request()->get('code'));

        if(isset($token['error'])) {
            Log::error(json_encode($token));
            throw new Exception($token['error']);
        }
        
        return $token;
    }
}