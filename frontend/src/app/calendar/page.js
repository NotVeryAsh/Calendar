"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import sendRequest from "@/app/lib/request";
import {useEffect, useState} from "react";

export default function Calendar() {

    useEffect(() => {
        getEvents().then((events) => {
            setEvents(events)
        })
    }, [])

    const [events, setEvents] = useState([]);

    return (
        <FullCalendar
            plugins={[
                dayGridPlugin,
            ]}
            events={events}
            initialView={"dayGridMonth"}
            height={"100vh"}
            headerToolbar={{
                start: '',
                center: 'title',
                end: ''
            }}
            titleFormat={{
                month: 'long',
            }}
            eventBackgroundColor={"#34d399"}
        />
    );
}

const getEvents = async () => {
    const response = await sendRequest("/api/events", "GET");

    if(response.status !== 200) {
        throw new Error('Failed to fetch calendar events');
    }

    const json = await response.json();
    return json.events;
}