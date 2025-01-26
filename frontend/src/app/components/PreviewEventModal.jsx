import Modal from "@/app/components/Modal";
import moment from "moment";
import Button from "@/app/components/Button";
import DangerButton from "@/app/components/DangerButton";
import {useState} from "react";
import SuccessButton from "@/app/components/SuccessButton";
import {
    DatePicker,
    DesktopTimePicker,
    LocalizationProvider,
} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import sendRequest from "@/app/lib/request";

export default function PreviewEventModal ({hideModal, setHideModal, event}) {

    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        startDate: moment(event.start),
        startTime: moment(event.end),
        endDate: moment(event.end),
        endTime: moment(event.start),
        title: event.title
    })

    return (
        <Modal hidden={hideModal}>
            <Modal.Content>
                {editMode ? (<Form event={event} formData={formData} setFormData={setFormData} />) : (<Content event={event} />)}
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

const Content = ({event}) => {
    const startDate = moment(event?.start.toISOString())
    const endDate = moment(event?.end.toISOString())

    const startDay = startDate.format('dddd, MMM Do')
    const endDay = endDate.format('dddd, MMM Do')
    
    return (
        <>
            <Modal.Title>{event?.title}</Modal.Title>
            <div className={"flex flex-col space-y-2"}>
                <span>
                    {startDay}{startDay !== endDay && ( ' - ' + endDay)}
                </span>
                <span>
                    {startDate.format('h:mmA')} - {endDate.format('h:mmA')}
                </span>
            </div>
        </>
    )
}

const Form = ({formData, setFormData}) => {
    return (
        <>
            <form>
                <Modal.Title>
                    <input className={"text-center p-1 outline outline-1 outline-offset-2 outline-gray-400 rounded-sm"}
                           type={"text"}
                           value={formData.title}
                           onChange={e => handleInputChange(setFormData, formData, 'title', e)}
                           placeholder={"title"}
                    />
                </Modal.Title>
                <div className={"flex flex-col space-y-4"}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={['DateTimePicker']}>
                            <span className={"font-medium"}>Start</span>
                            <div className={"flex flex-row !mt-4"}>
                                <DatePicker label="Start Date"
                                            value={formData.startDate}
                                            onChange={e => handleInputChange(setFormData, formData, 'startDate', e)}
                                            // sx={{
                                            //     "& .MuiOutlinedInput-input" : {
                                            //         padding: "0.8rem"
                                            //     }
                                            // }}
                                
                                />
                                <DesktopTimePicker label="Start Time"
                                                   value={formData.startTime}
                                                   onChange={e => handleInputChange(setFormData, formData, 'startTime', e)}
                                />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={['DateTimePicker']}>
                            <span className={"font-medium"}>End</span>
                            <div className={"flex flex-row !mt-4"}>
                                <DatePicker label="End Date"
                                            value={formData.endDate}
                                            onChange={e => handleInputChange(setFormData, formData, 'endDate', e)}
                                />
                                <DesktopTimePicker label="End Time"
                                             value={formData.endTime}
                                             onChange={e => handleInputChange(setFormData, formData, 'endTime', e)}
                                />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                    {/*<DateTimePicker label="Start" />*/}
                    {/*<span>*/}
                    {/*    {startDate}{startDate !== endDate && ( - endDate)}*/}
                    {/*</span>*/}
                    {/*<span>*/}
                    {/*    {startDate.format('h:mmA')} - {endDate.format('h:mmA')}*/}
                    {/*</span>*/}
                </div>
            </form>
        </>
    )
}

const handleClickSave = async (event, formData) => {
    
     const data = {
        start: moment(formData.startDate).format('MM/DD/YYYY') + ' ' + moment(formData.startTime).format('hh:mm A'),
        end: moment(formData.endDate).format('MM/DD/YYYY') + ' ' + moment(formData.endTime).format('hh:mm A'),
        title: formData.title 
    }
    console.log(data)
    // Call api to save data and show error messages where necessary
    const response = await sendRequest(`/api/event/${event.id}`, "PUT", data);

    if (response.status !== 200) {
        throw new Error('Failed to update event');
    }

    const json = await response.json();
    console.log(json.event)
}

const handleInputChange = (setFormData, formData, property, input) => {
    const value = input instanceof moment ? input : input.target.value

    setFormData(prev => ({
        ...prev,
        [property]: value
    }));
}