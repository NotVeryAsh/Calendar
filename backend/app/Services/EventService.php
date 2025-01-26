<?php

namespace App\Services;

use App\Facades\Event;
use App\Facades\Response;
use DateTime;
use DateTimeInterface;
use Exception;
use Google\Client;
use Google\Service\Calendar;
use Google_Service_Calendar_EventDateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Google\Service\Calendar\Event as GoogleEvent;
use Google\Service\Calendar\Events;

class EventService
{    
    private ?Client $client;
    private ?Calendar $calendarService;

    /**
     * An array of date fields so we know which fields to parse into Google's DateTime objects
     */
    private const DATE_FIELDS = [
        'start',
        'end'
    ];

    /**
     * An array of generic property names and the Google Event property they map to
     */
    private const MAP_DATA = [
        'title' => 'summary'
    ];

    /**
     * Create the client and set the config credentials to authorize with the API
     * 
     * @return Client|JsonResponse
     */
    public function initialize(): Client|JsonResponse
    {
        if(!isset($this->client)) {
            $this->client = new Client();   
        }

        try {
            $this->client->setAuthConfig(base_path('client-secret.json'));
            return $this->client;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::respond([], 400, 'Something went wrong. Please try again later.');
        }
    }

    /**
     * Authenticate with Google's API
     * 
     * @return JsonResponse|$this
     */
    private function authenticate(): static|JsonResponse
    {
        $this->initialize();
        try {
            $this->client->setAccessToken(request()->header('Authorization'));
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::respond([], 400, 'Something went wrong. Please try again later.');
        }
        
        return $this;
    }

    /**
     * Get or create the calendar service
     * 
     * @return Calendar
     */
    public function getCalendarService(): Calendar
    {
        if(!isset($this->calendarService)) {
            $this->calendarService = new Calendar($this->client);
        }
        
        return $this->calendarService;
    }

    /**
     * Get a specific event for a calendar
     * 
     * @param $calendarId
     * @param $eventId
     * @return GoogleEvent|JsonResponse
     */
    public function getEvent($calendarId, $eventId): GoogleEvent|JsonResponse
    {
        $this->authenticate();    
        try {
            return $this->getCalendarService()->events->get($calendarId, $eventId);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::respond([], 400, 'Something went wrong. Please try again later.');
        }
    }

    /**
     * Get a ist of events for a calendar
     * 
     * @param $calendarId
     * @return Events|JsonResponse
     */
    public function getEvents($calendarId): Events|JsonResponse
    {
        $this->authenticate();
        try {
            return $this->getCalendarService()->events->listEvents($calendarId);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::respond([], 400, 'Something went wrong. Please try again later.');
        }
    }

    /**
     * Update an event with the given data
     * 
     * @param $calendarId
     * @param $eventId
     * @param $data
     * @param array $optParams
     * 
     * @return GoogleEvent|JsonResponse
     */
    public function updateEvent($calendarId, $eventId, $data, array $optParams = []): GoogleEvent|JsonResponse
    {
        $this->authenticate();
        
        $data = $this->updateDataKeys($data);
        
        $event = Event::getEvent("primary", $eventId);
        $event = $this->setEventData($event, $data);
        try {
            return $this->getCalendarService()->events->update($calendarId, $eventId, $event, $optParams);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::respond([], 400, 'Something went wrong. Please try again later.');
        }
    }

    /**
     * Update the keys of the data array to match the names that Google gave them eg. Google use 'summary' instead of 'title'
     * 
     * @param $data
     * @return array
     */
    private function updateDataKeys($data): array
    {
        $newData = [];
        foreach($data as $key => $value) {

            // We only need to replace the key names that we define in MAP_DATA
            if(!array_key_exists($key, self::MAP_DATA)) {
                continue;
            }

            // Get key name that Google uses
            $mapping = self::MAP_DATA[$key];
            
            // Add Google's key name to new array
            $newData[$mapping] = $value;
        
            // Remove current key from data since Google does not use this key name
            unset($data[$key]);
        }

        return array_merge($data, $newData);
    }

    /**
     * Set the data on the event object so we can pass it to Google to update
     * 
     * @param GoogleEvent $event
     * @param $data
     * 
     * @return GoogleEvent
     */
    private function setEventData(GoogleEvent $event, $data): GoogleEvent
    {
        foreach($data as $key => $value) {
    
            if(in_array($key, self::DATE_FIELDS)) {
                $value = $this->formatDate($value);
            }
            
            // eg. setStart, setSummary
            $function = 'set' . ucfirst($key);
            $event->$function($value);
        }
        
        return $event;
    }

    /**
     * Format the date so it is compatible with Google's API
     * 
     * @param $date
     * @return Google_Service_Calendar_EventDateTime|JsonResponse
     */
    private function formatDate($date): Google_Service_Calendar_EventDateTime|JsonResponse
    {
        try {
            $dateTime = new DateTime($date);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return Response::respond([], 400, 'Something went wrong. Please try again later.');
        }
        $calendarDateTime = new Google_Service_Calendar_EventDateTime();
        $calendarDateTime->setDateTime($dateTime->format(DateTimeInterface::RFC3339));
        
        return $calendarDateTime;
    }
}