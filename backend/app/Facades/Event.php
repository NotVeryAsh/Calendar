<?php
namespace App\Facades;
use App\Services\EventService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Facade;
use Google\Service\Calendar\Event as GoogleEvent;
use Google\Service\Calendar\Events;
use Google\Client;
use Google\Service\Calendar;

/**
 * @method static Client|JsonResponse initialize()
 * @method static static|JsonResponse authenticate()
 * @method static Calendar getCalendarService()
 * @method static GoogleEvent|JsonResponse getEvent($calendarId, $eventId)
 * @method static Events|JsonResponse getEvents($calendarId)
 * @method static GoogleEvent|JsonResponse updateEvent($calendarId, $eventId, $data, array $optParams = [])
 * 
 * @see EventService
 */
class Event extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'event';
    }
}