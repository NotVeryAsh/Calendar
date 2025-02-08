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
     * Fields that have to be set first - other fields may depend on the value of these fields
     */
    private const PRIORITY_FIELDS = [
        'guestsCanModify'
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
            \Log::info(json_encode($this->getCalendarService()->events->listEvents($calendarId)));
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
        // TODO Data to explore / set:
        // Grouped data means we can possibly put them into their own section together:
        // See https://developers.google.com/calendar/api/v3/reference/events

        // ** recurrence
        // recurrence, see: https://developers.google.com/calendar/api/v3/reference/events#:~:text=default%20is%20False.-,recurrence%5B%5D,-list
        // Recurring event id - the event that each recurrence is imitating / belongs to / the original it is copying (immutable)
        
        // ** attendees
        // Attendees: see https://developers.google.com/calendar/api/v3/reference/events#:~:text=writable-,attendees%5B%5D,-list
        // attendees omitted - boolean - whether any of an event's attendees may have been excluded from the response when getting the event from Calendar API. This may be true if parameters such as maxAttendees is set to a lower number than the amount of attendees for that event (eg, the event has 100 attendees, but the maxAttendees parameter is set to 10, so only 10 attendees come back in the api response, meaning 90 of them were left out of the response)
        // guests can invite others - DONE
        // guests can modify - DONE
        // guests can see other guests - DONE
        
        // birthday properties (If event type is 'birthday')
        // color id - Eventually allow user to update colors as well
        // conference data: see https://developers.google.com/calendar/api/v3/reference/events#:~:text=writable-,conferenceData,-nested%20object
        
        // ** creator        
        // created (Read only)
        // creator (Read only)
        // description (Can contain HTML) (Check how we can safely validate and sanitize this)
        // organizer (Read only except when importing an event)
        
        // ** time        
        // original start time (immutable, for recurring events, this is the time that the event is supposed to take place - this value does not change, even if you change the time that the reccuring event takes place)
        
        // ** call        
        // Hangout link (read only) DONE
        // HTML link (read only)
        
        // Event type (cannot be edited after event created. See values: https://developers.google.com/calendar/api/v3/reference/events#:~:text=of%20the%20resource.-,eventType,-string)
        // set kind (api docs do not specify that it is writable. Its value is calendar#event)

        // ** location        
        // out of office properties (used if event type is out of office)
        // working location properties - https://developers.google.com/calendar/api/v3/reference/events#:~:text=writable-,workingLocationProperties,-nested%20object
        // location - geographic location of the event as free-form text (free-form meaning it has no limits or constraints) (maybe for this field, allow the user to pick a post on the google map, or enter a custom value eg. 'the coffee house'

        // ** transparency        
        // transparency - whether the event blocks time on the calendar? could be availability? https://developers.google.com/calendar/api/v3/reference/events#:~:text=writable-,transparency,-string 
        // visibility - 'default' - the default visibility status defined for that calendar, see: https://developers.google.com/calendar/api/v3/reference/events#:~:text=change.%20Read%2Donly.-,visibility,-string

        // ** private        
        // private copy (immutable after created. If set to true, event propagation is disabled (eg. if you make a change on the event on the organization's calendar, the changes won't be reflected for the attendees on their calendars))
        // locked (read only boolean - if event was copied, the main fields cannot be edited (including summary, description, location, start, end recurrence)
        
        // ** settings / meta?
        // status - status of the event - 'confirmed', 'tentative', 'cancelled': see https://developers.google.com/calendar/api/v3/reference/events#:~:text=writable-,status,-string
        // updated - a timestamp of the last time the event was updated
        // set id (writable, but with restrictions: see https://developers.google.com/calendar/api/v3/reference/events#:~:text=events.get%20method.-,id,-string)
        // etag - a string attached to objects which is changed anytime the resource is changed (eg. if we updated an event, the etag is changed) etags are used to check if a resource has been modified since a new etag is generated when the resource is modified

        // reminders - https://developers.google.com/calendar/api/v3/reference/events#:~:text=instance%20belongs.%20Immutable.-,reminders,-object
        
        // Attachments: see https://developers.google.com/calendar/api/v3/reference/events#:~:text=writable-,attachments%5B%5D,-list
        // extended properties: see https://developers.google.com/calendar/api/v3/reference/events#:~:text=writable-,extendedProperties,-object
        // focus time properties: https://developers.google.com/calendar/api/v3/reference/events#:~:text=the%20corresponding%20value.-,focusTimeProperties,-nested%20object
        // gadget (Deprecated)
        // sequence (the revision sequence number of the event - a version number)
        // source (the source which the even was created eg. a web page, or email message - can only be seen or modified by the creator of the event)

        // Handle fields that must be set before others
        foreach(self::PRIORITY_FIELDS as $priorityField) {
            
            $value = $data[$priorityField];
            
            // eg. setGuestsCanModify
            $function = 'set' . ucfirst($priorityField);
            $event->$function($value);
            
            // Remove from data since we have already processed this field
            unset($data[$priorityField]);
        }
        
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