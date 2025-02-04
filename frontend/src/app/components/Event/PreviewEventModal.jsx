import Modal from "@/app/components/Modal";
import moment from 'moment-timezone';
import Button from "@/app/components/Button";
import DangerButton from "@/app/components/DangerButton";
import {useState} from "react";
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
import EmailAutofill from "@/app/components/EmailAutofill";

library.add(faBell, faUsers, faPalette, faClock, faLocationDot, faGear, faPhone, faFont)

export default function PreviewEventModal ({hideModal, setHideModal, event}) {

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
        timezone:  moment(event.start).format('z'),
        guestsCanInviteOthers: event.guestsCanInviteOthers,
        guestsCanModify: event.guestsCanModify,
        guestsCanSeeOtherGuests: event.guestsCanSeeOtherGuests
    })
    const [activeTab, setActiveTab] = useState(null)

    // TODO - When all day is clicked, store the previous end and start times, so if they unselect all day, instead of the start / end times being 12am and 11:59pm, they revert back to what they were before
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
    
    return (
        <Modal hidden={hideModal} tabs={tabs}>
            <Modal.Content>
                {editMode ? 
                    (<Form event={event} formData={formData} setFormData={setFormData} activeTab={activeTab}/>) : 
                    (<Content event={event} activeTab={activeTab}/>)
                }
            </Modal.Content>
            <Modal.Footer setHideModal={setHideModal}>
                {editMode ? (
                    <>
                        <SuccessButton onClick={() => handleClickSave(event, formData)}>Save</SuccessButton>
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

const Content = ({event, activeTab}) => {

    return (
        <>
            <Modal.Title>{event?.title}</Modal.Title>
            <div className={"flex flex-col space-y-2"}>
                {activeTab === 'dates' && <DateFieldsContent event={event}/>}
            </div>
            <div className={"flex flex-col space-y-2"}>
                {activeTab === 'users' && <AttendeeFieldsContent event={event}/>}
            </div>
        </>
    )
}

const Form = ({formData, setFormData, activeTab}) => {
    return (
        <>
            <form>
                <Modal.Title>
                    <input className={"text-center p-1 border border-1 border-gray-400 rounded"}
                           type={"text"}
                           value={formData.title}
                           onChange={e => handleInputChange(setFormData, formData, 'title', e)}
                           placeholder={"title"}
                    />
                </Modal.Title>
                <div className={"flex flex-col space-y-4"}>
                    {activeTab === 'dates' &&
                        <DateFieldsInputs handleInputChange={handleInputChange} setFormData={setFormData}
                                          formData={formData}/>}
                </div>
                <div className={"flex flex-col space-y-4"}>
                    {activeTab === 'users' &&
                        <AttendeeFieldsInputs handleInputChange={handleInputChange} setFormData={setFormData}
                                          formData={formData}/>}
                </div>
            </form>
        </>
    )
}


const handleClickSave = async (event, formData) => {

    const data = {
        start: moment(formData.startDate).format('MM/DD/YYYY') + ' ' + moment(formData.startTime).format('hh:mm A') + ' ' + moment(event.start).format('z'),
        end: moment(formData.endDate).format('MM/DD/YYYY') + ' ' + moment(formData.endTime).format('hh:mm A') + ' ' + moment(event.start).format('z'),
        title: formData.title,
        guestsCanInviteOthers: formData.guestsCanInviteOthers,
        guestsCanModify: formData.guestsCanModify,
        guestsCanSeeOtherGuests: formData.guestsCanSeeOtherGuests
    }

    // Call api to save data and show error messages where necessary
    const response = await sendRequest(`/api/event/${event.id}`, "PUT", data);

    if (response.status !== 200) {
        throw new Error('Failed to update event');
    }

    const json = await response.json();
}

const handleInputChange = (setFormData, formData, property, input) => {
    let value = input instanceof moment ? input : input.target.value
    value = input.target.type === 'checkbox' ? input.target.checked : input.target.value
    setFormData(prev => ({
        ...prev,
        [property]: value
    }));
}