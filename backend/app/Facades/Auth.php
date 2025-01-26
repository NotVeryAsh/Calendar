<?php
namespace App\Facades;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Facade;

/**
 * @method static JsonResponse|string authenticate(string $redirectUrl)
 * @method static JsonResponse|array getAccessToken()
 * 
 * @see AuthService
 */
class Auth extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'auth';
    }
}