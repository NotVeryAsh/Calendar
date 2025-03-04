"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import sendRequest from "@/app/lib/request";
import {useEffect, useState} from "react";
import PreviewEventModal from "@/app/components/Event/PreviewEventModal";
import Popup from "@/app/components/Event/Popup";
import {clearSession} from "@/app/lib/session";

export default function Calendar() {

    useEffect(() => {
        getEvents().then((events) => {
            setEvents(events)
        })
    }, [])

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(undefined)
    const [hideModal, setHideModal] = useState(true)

    const [message, setMessage] = useState({
        message: undefined,
        type: 'success'
    });
    
    return (
        <>
            <Popup message={message?.message} type={message?.type} setMessage={setMessage} />
            {selectedEvent &&
                <PreviewEventModal hideModal={hideModal} setHideModal={setHideModal} event={selectedEvent} setEvent={setSelectedEvent} setMessage={setMessage}/>
            }
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
                eventClick={(info) => handleClickEvent(info, setHideModal, setSelectedEvent, events)}
            />
        </>
    );
}

const getEvents = async () => {
    const response = await sendRequest("/api/events", "GET");

    if (response.status !== 200) {
        throw new Error('Failed to fetch calendar events');
    }

    const json = await response.json();
    return json.events;
}

const handleClickEvent = (info, setHideModal, setSelectedEvent, events) => {
    const event = events.find(event => event.id === info.event.id)
    setSelectedEvent(event)
    setHideModal(false)
}