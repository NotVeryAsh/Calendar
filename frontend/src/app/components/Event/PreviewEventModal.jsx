import Modal from "@/app/components/Modal";
import moment from 'moment-timezone';
import Button from "@/app/components/Button";
import DangerButton from "@/app/components/DangerButton";
import {useEffect, useState} from "react";
import SuccessButton from "@/app/components/SuccessButton";
import sendRequest from "@/app/lib/request";
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faBell,
    faUsers,
    faPalette,
    faClock,
    faLocationDot,
    faGear,
    faPhone,
    faFont
} from "@fortawesome/free-solid-svg-icons";
import DateFieldsContent, {DateFieldsInputs} from "@/app/components/Event/DateFields";
import AttendeeFieldsContent, {AttendeeFieldsInputs} from "@/app/components/Event/AttendeeFields";
import CallFieldsContent from "@/app/components/Event/CallFields";
import SettingsFieldsContent, {SettingsFieldsInputs} from "@/app/components/Event/SettingsFields";
import ColorFieldsContent, {ColorFieldsInputs} from "@/app/components/Event/ColorFields";
import NotificationFieldsContent, {NotificationFieldsInputs} from "@/app/components/Event/NotificationFields";
import TextFieldsContent, {TextFieldsInputs} from "@/app/components/Event/TextFields";

library.add(faBell, faUsers, faPalette, faClock, faLocationDot, faGear, faPhone, faFont)

export default function PreviewEventModal ({hideModal, setHideModal, event, setEvent, setMessage, setEvents}) {
    
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        startDate: moment(event.start),
        originalStartTime: moment(event.start), 
        startTime: moment(event.start),
        endDate: moment(event.end),
        originalEndTime: moment(event.end),
        endTime: moment(event.end),
        title: event.title,
        allDay: false,
        timezone: event.timezone,
        guestsCanInviteOthers: event.guestsCanInviteOthers,
        guestsCanModify: event.guestsCanModify,
        guestsCanSeeOtherGuests: event.guestsCanSeeOtherGuests,
        attendees: event.attendees,
        attendeesOmitted: event.attendeesOmitted,
        status: event.status,
        colors: Object.entries(event.colors),
        colorId: event.colorId
    })
    const [activeTab, setActiveTab] = useState(null)
    
    // TODO - split each input group into their own components eg. time / day inputs for start time / end time, start date / end date, all day, timezone - since we will have a lot of fields and want it to be clean
    // TODO - Sasha - "Start date, Start time, End date, End time could all be on separate lines instead of start date & time on same line, and end date & time on same line
    
    const tabs = [
        {
            key: 'text',
            color: 'bg-pink-400',
            icon: 'font',
            onClick: () => {setActiveTab('text')}
        },
        {
            key: 'dates',
            color: 'bg-yellow-400',
            icon: 'clock',
            onClick: () => {setActiveTab('dates')}
        },
        {
            key: 'notifications',
            color: 'bg-red-400',
            icon: 'bell',
            onClick: () => {setActiveTab('notifications')}
        },
        {
            key: 'users',
            color: 'bg-sky-400',
            icon: 'users',
            onClick: () => {setActiveTab('users')}
        },
        {
            key: 'colors',
            color: 'bg-green-400',
            icon: 'palette',
            onClick: () => {setActiveTab('colors')}
        },
        {
            key: 'location',
            color: 'bg-orange-400',
            icon: 'location-dot',
            onClick: () => {setActiveTab('location')}
        },
        {
            key: 'call',
            color: 'bg-violet-400',
            icon: 'phone',
            onClick: () => {setActiveTab('call')}
        },
        {
            key: 'settings',
            color: 'bg-teal-400',
            icon: 'gear',
            onClick: () => {setActiveTab('settings')}
        }
    ]

    const handleClickSave = async () => {
        const data = {
            start: moment.tz(formData.startDate.format('MM/DD/YYYY') + ' ' + formData.startTime.format('HH:mm'), 'MM/DD/YYYY HH:mm', formData.timezone).format(),
            end: moment.tz(formData.endDate.format('MM/DD/YYYY') + ' ' + formData.endTime.format('HH:mm'), 'MM/DD/YYYY HH:mm', formData.timezone).format(),
            title: formData.title,
            description: formData.description,
            guestsCanInviteOthers: formData.guestsCanInviteOthers,
            guestsCanModify: formData.guestsCanModify,
            guestsCanSeeOtherGuests: formData.guestsCanSeeOtherGuests,
            attendees: formData.attendees,
            attendeesOmitted: formData.attendeesOmitted,
            status: formData.status
        }

        // Call api to save data and show error messages where necessary
        const response = await sendRequest(`/api/event/${event.id}`, "PUT", data);

        if (response.status !== 200) {
            setMessage({
                message: 'Something went wrong. Please try again later.',
                type: 'error'
            })

            return
        }

        const json = await response.json();

        setMessage({
            message: 'Successfully updated the event!',
            type: 'success'
        })

        setEvent(json.event)


        setEvents(prev => ([
            ...prev.filter((event) => event.id !== json.event.id),
            json.event
        ]))

        setEditMode(false)

        // TODO Is this necessary? If the event is updated over and over, and this endpoint takes a while to come back, that could mean the events become out of sync
        // TODO We could disable the save button until this comes back
        // TODO Or only fetch the events when the page loads etc
        // getEvents().then((events) => {
        //     setEvents(events)
        // })
    }

    const handleInputChange = (property, input) => {
        let value
        if(input instanceof moment) {
            value = input
        }
        else if(input.target.type === 'checkbox') {
            value = input.target.checked
        }
        else {
            value = input.target.value
        }

        setFormData(prev => ({
            ...prev,
            [property]: value
        }));
    }

    const handleKeyDown = (keyDownEvent) => {
        if(keyDownEvent.key !== 'Enter') {
            return;
        }

        handleClickSave()
    }
    
    return (
        <Modal hidden={hideModal} tabs={tabs}>
            <Modal.Content>
                {editMode ? 
                    (
                        <>
                            <div onKeyDown={handleKeyDown}>
                                <Modal.Title>
                                    <input className={"text-center p-1 border border-1 border-gray-400 rounded"}
                                           type={"text"}
                                           value={formData.title}
                                           onChange={e => handleInputChange('title', e)}
                                           placeholder={"title"}
                                    />
                                </Modal.Title>
                                <div className={"flex flex-col space-y-4"}>
                                    {activeTab === 'text' &&
                                        <TextFieldsInputs setFormData={setFormData} 
                                                          formData={formData}/>}
                                </div>
                                <div className={"flex flex-col space-y-4"}>
                                    {activeTab === 'dates' &&
                                        <DateFieldsInputs handleInputChange={handleInputChange}
                                                          setFormData={setFormData}
                                                          formData={formData}/>}
                                </div>
                                <div className={"flex flex-col space-y-4"}>
                                    {activeTab === 'users' &&
                                        <AttendeeFieldsInputs setFormData={setFormData}
                                                              formData={formData}/>}
                                </div>
                                <div className={"flex flex-col space-y-4"}>
                                    {activeTab === 'settings' &&
                                        <SettingsFieldsInputs handleInputChange={handleInputChange}
                                                              setFormData={setFormData}
                                                              formData={formData} event={event}/>}
                                </div>
                                <div className={"flex flex-col space-y-4"}>
                                    {activeTab === 'colors' &&
                                        <ColorFieldsInputs handleInputChange={handleInputChange}
                                                           setFormData={setFormData}
                                                           formData={formData} event={event}/>}
                                </div>
                                <div className={"flex flex-col space-y-4"}>
                                    {activeTab === 'notifications' &&
                                        <NotificationFieldsInputs handleInputChange={handleInputChange}
                                                                  setFormData={setFormData}
                                                                  formData={formData} event={event}/>}
                                </div>
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <Modal.Title>{event?.title}</Modal.Title>
                            <div className={"flex flex-col space-y-5"}>
                                {activeTab === 'text' && <TextFieldsContent event={event}/>}
                                {activeTab === 'dates' && <DateFieldsContent event={event} formData={formData}/>}
                                {activeTab === 'users' && <AttendeeFieldsContent event={event}/>}
                                {activeTab === 'call' && <CallFieldsContent event={event} setMessage={setMessage}/>}
                                {activeTab === 'settings' && <SettingsFieldsContent event={event} formData={formData}/>}
                                {activeTab === 'colors' && <ColorFieldsContent event={event} formData={formData}/>}
                                {activeTab === 'notifications' && <NotificationFieldsContent event={event} formData={formData}/>}
                            </div>
                        </>
                    )
                }
            </Modal.Content>
            <Modal.Footer setHideModal={setHideModal}>
                {editMode ? (
                    <>
                        <SuccessButton onClick={handleClickSave}>Save</SuccessButton>
                        <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <DangerButton onClick={() => setEditMode(true)}>Edit</DangerButton>
                        <Button onClick={() => setHideModal(true)}>Close</Button>
                    </>
                )
                }
            </Modal.Footer>
        </Modal>
    );
}