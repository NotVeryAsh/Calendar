export default function NotificationFieldsContent ({event}) {
      
    return (
        <>
            <div className={"flex flex-col space-y-2"}>
            <span className={"font-medium mt-4"}>You will be notified via...</span>
                <ul className={"list-disc px-4"}>
                    {/* TODO Ask Sasha how she wants these to look / work */}
                    {/* TODO Change conditions below - are these options selected from the event? */}
                    <li className={true ? '' : 'line-through'}>Email</li>
                    <li className={true ? '' : 'line-through'}>Google</li>
                    {/* TODO Google does not have SMS support for notifications - we will need to add this */}
                    {/*<li className={true ? '' : 'line-through'}>SMS</li>*/}
                </ul>
            </div>
        </>
    );
}

export const NotificationFieldsInputs = ({handleInputChange, setFormData, formData}) => {

    const handleNotificationTypeChecked = (event, type='email') => {
        // Store in notification_types ... ?
    }
    
    return (
        <>
            <span className={"font-medium mt-4"}>You will be notified via...</span>
            <div className={"flex flex-row !mt-2 space-x-2"}>
                {/* TODO refactor checked - Is it selected? */}
                <input type={"checkbox"}
                       onChange={e => {
                           handleNotificationTypeChecked(e, 'email')
                       }}
                       checked={true}
                />
                <label htmlFor={"modify-event"}>Email</label>
            </div>
            {/* TODO Google does not support this - we will need to add this ourselves */}
            {/*<div className={"flex flex-row !mt-2 space-x-2"}>*/}
            {/*    <input type={"checkbox"} className={"disabled:opacity-80"}*/}
            {/*           onChange={e => {*/}
            {/*               handleNotificationTypeChecked(e, 'sms')*/}
            {/*           }}*/}
            {/*           checked={true}*/}
            {/*    />*/}
            {/*    <label htmlFor={"invite-others"}>SMS</label>*/}
            {/*</div>*/}
            <div className={"flex flex-row !mt-2 space-x-2"}>
                <input type={"checkbox"} className={"disabled:opacity-80"}
                       onChange={e => {
                           handleNotificationTypeChecked(e, 'google')
                       }}
                       checked={true}
                />
                <label htmlFor={"modify-event"}>Google</label>
            </div>
        </>
    )
}