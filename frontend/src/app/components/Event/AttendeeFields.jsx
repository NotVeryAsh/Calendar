import {useState} from "react";

export default function AttendeeFieldsContent ({event}) {
    
    return (
        <>
            <span className={"font-medium mt-4"}>Guests can...</span>
            <ul className={"list-disc px-4"}>
                <li className={getConditions(event).canModify ? '' : 'line-through'}>Modify the event</li>
                <li className={getConditions(event).inviteOthers ? '' : 'line-through'}>Invite others</li>
                <li className={getConditions(event).seeOthers ? '' : 'line-through'}>See the guest list</li>
            </ul>
        </>
    );
}

export const AttendeeFieldsInputs = ({handleInputChange, setFormData, formData}) => {    
    return (
        <>
            <span className={"font-medium mt-4"}>Guests can...</span>
            <div className={"flex flex-row !mt-2 space-x-2"}>
                <input id={"modify-event"} type={"checkbox"}
                       onChange={e => {
                           handleGuestsCanModifyChecked(setFormData, e)
                       }}
                       checked={getConditions(formData).canModify}
                />
                <label htmlFor={"modify-event"}>Modify the event</label>
            </div>
            <div className={"flex flex-row !mt-2 space-x-2"}>
                <input id={"invite-others"} type={"checkbox"} className={"disabled:opacity-80"}
                       onChange={e => {
                           handleGuestCanInviteOthersChecked(formData, setFormData, e)
                       }}
                       checked={getConditions(formData).inviteOthers}
                       disabled={getConditions(formData).canModify}
                />
                <label htmlFor={"invite-others"}>Invite others</label>
            </div>
            <div className={"flex flex-row !mt-2 space-x-2"}>
                <input id={"see-guest-list"} type={"checkbox"} className={"disabled:opacity-80"}
                       onChange={e => {
                           handleGuestCanSeeOtherGuestsChecked(formData, setFormData, e)
                       }}
                       checked={getConditions(formData).seeOthers}
                       disabled={getConditions(formData).canModify}
                />
                <label htmlFor={"modify-event"}>See the guest list</label>
            </div>
        </>
    )
}

const handleGuestsCanModifyChecked = (setFormData, event) => {    
    setFormData(prev => ({
        ...prev,
        ...{
            guestsCanInviteOthers: null,
            guestsCanSeeOtherGuests: null,
            guestsCanModify: event.target.checked ? true : null
        }
    }));
}

const handleGuestCanSeeOtherGuestsChecked = (formData, setFormData, event) => {    
    setFormData(prev => ({
        ...prev,
        guestsCanSeeOtherGuests: event.target.checked ? null : false,
    }));
}

const handleGuestCanInviteOthersChecked = (formData, setFormData, event) => {
    setFormData(prev => ({
        ...prev,
        guestsCanInviteOthers:  event.target.checked ? null : false,
    }));
}

const getConditions = (data) => {    
    // Google's conditions are abysmal. So we have this function.
    const canModify = data.guestsCanModify
    const inviteOthers = data.guestsCanInviteOthers
    const seeOthers = data.guestsCanSeeOtherGuests

    let conditions = {
        canModify: false,
        inviteOthers: false,
        seeOthers: false
    }
    
    if(canModify === null && inviteOthers === false && seeOthers === false) {
        return conditions
    }
    
    if(canModify === true && inviteOthers === null && seeOthers === null) {
        conditions.canModify = true
        conditions.inviteOthers = true
        conditions.seeOthers = true
        return conditions
    }
    
    if(canModify === null && inviteOthers === null && seeOthers === false) {
        conditions.inviteOthers = true
        return conditions
    }
    
    if(canModify === null && inviteOthers === false && seeOthers === null) {
        conditions.seeOthers = true
        return conditions
    }
    
    if(canModify === null && inviteOthers === null && seeOthers === null) {
        conditions.inviteOthers = true
        conditions.seeOthers = true
        return conditions
    }
}