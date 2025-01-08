<?php

namespace App\Http\Controllers;

use Google\Service\Calendar;
use Illuminate\Http\Request;
use Google\Client;
use Illuminate\Support\Carbon;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $client = new Client();
        $client->setAuthConfig(base_path('client-secret.json'));
        $client->setAccessToken($request->header('Authorization'));

        // TODO Get events from this
        // Below code gets user's calendar
        $calendar = new Calendar($client);

        $events = collect($calendar->events->listEvents("primary"))->map(function ($event) {
            return [
                "id" => $event->id,
                "title" => $event->summary,
                "start" => $event->start->dateTime,
                "end" => $event->end->dateTime,
            ];
        });

        return response()->json(['events' => $events]);
    }
}
