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
            // TODO Add all relevant properties eg. calendar color, link, other people invited etc.
            // TODO Allow user to choose custom color for event - or preset from google's colors
            return [
                "id" => $event->id,
                "title" => $event->summary,
                "start" => $event->getStart()->dateTime,
                "end" => $event->getEnd()->dateTime,
                "guestsCanModify" => $event->getGuestsCanModify(),
                "guestsCanInviteOthers" => $event->getGuestsCanInviteOthers(),
                "guestsCanSeeOtherGuests" => $event->getGuestsCanSeeOtherGuests(),
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
