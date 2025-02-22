<?php

namespace App\Http\Controllers;

use App\Facades\Event;
use App\Facades\Response;
use App\Http\Requests\Event\UpdateEventRequest;
use Google\Service\Calendar\Event as GoogleEvent;

class EventController extends Controller
{
    public function index()
    {        
        $events = collect(Event::getEvents("primary"))->map(function (GoogleEvent $event) {
            // TODO Eventually, allow user to click on organizer to view a list of events etc they have created?
            $organizer = $event->getOrganizer();
            
            // TODO Add all relevant properties eg. calendar color, link, other people invited etc.
            // TODO Allow user to choose custom color for event - or preset from google's colors
            // TODO Eventually, if this endpoint is kinda slow, we can split it up into categories -> only return data for that category
            return [
                "id" => $event->id,
                "title" => $event->summary,
                "start" => $event->getStart()->dateTime,
                "end" => $event->getEnd()->dateTime,
                "guestsCanModify" => $event->getGuestsCanModify(),
                "guestsCanInviteOthers" => $event->getGuestsCanInviteOthers(),
                "guestsCanSeeOtherGuests" => $event->getGuestsCanSeeOtherGuests(),
                'hangoutLink' => $event->getHangoutLink(),
                'htmlLink' => $event->getHtmlLink(),
                'timezone' => $event->getStart()->getTimeZone(),
                'status' => $event->getStatus(),
                'last_updated' => $event->getUpdated(),
                'organizer' => [
                    'displayName' => $organizer->getDisplayName(),
                    'email' => $organizer->getEmail(),
                    'self' => $organizer->getSelf(),
                ],
                'statuses' => [
                    'confirmed',
                    'tentative',
                    'cancelled',
                ],
                'colors' => Event::getCalendarService()->colors,
                'colorId' => $event->getColorId()
            ];
        });

        return Response::respond(['events' => $events]);
    }
    
    public function update($eventId, UpdateEventRequest $request)
    {        
        $event = Event::updateEvent('primary', $eventId, $request->validated());

        return response()->json(['event' => $event]);
    }
}
