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
            
            // TODO Add all relevant properties eg. calendar color, link, other people invited etc.
            // TODO Allow user to choose custom color for event - or preset from google's colors
            // TODO Eventually, if this endpoint is kinda slow, we can split it up into categories -> only return data for that category
            return Event::asResource($event);
        });

        return Response::respond(['events' => $events]);
    }
    
    public function update($eventId, UpdateEventRequest $request)
    {        
        $event = Event::updateEvent('primary', $eventId, $request->validated());

        return response()->json(['event' => Event::asResource($event)]);
    }
}
