<?php
namespace App\Facades;
use Illuminate\Support\Facades\Facade;
use Illuminate\Http\JsonResponse;

/**
 * @method static JsonResponse success(array $data = [], int $status = 200)
 * @method static JsonResponse error(array $data = [], int $status = 400, string $message = '')
 * @method static JsonResponse respond(array $data = [], int $status = 400, string $message = '')
 * 
 * @return string
 */
class Response extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'response';
    }
}