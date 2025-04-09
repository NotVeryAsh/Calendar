"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import {useEffect, useState} from "react";
import PreviewEventModal from "@/app/components/Event/PreviewEventModal";
import Popup from "@/app/components/Event/Popup";
import {getEvents} from "@/app/lib/event";

export default function Calendar() {

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(undefined)
    const [hideModal, setHideModal] = useState(true)
    
    useEffect(() => {
        getEvents().then((events) => {
            setEvents(events)
        })
    }, [])

    const [message, setMessage] = useState({
        message: undefined,
        type: 'success'
    });

    const handleClickEvent = (info) => {
        const event = events.find(event => event.id === info.event.id)
        setSelectedEvent(event)
        setHideModal(false)
    }
    
    return (
        <>
            <Popup message={message?.message} type={message?.type} setMessage={setMessage} />
            {selectedEvent &&
                <PreviewEventModal hideModal={hideModal} setHideModal={setHideModal} event={selectedEvent} setEvent={setSelectedEvent} setEvents={setEvents} getEvenets={getEvents} events={events} setMessage={setMessage}/>
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
                eventClick={(info) => handleClickEvent(info)}
            />
        </>
    );
}