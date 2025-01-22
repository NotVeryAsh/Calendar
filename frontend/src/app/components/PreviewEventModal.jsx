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

export default function PreviewEventModal ({hideModal, setHideModal, event}) {

    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        startDay: moment(event.start.toISOString()),
        startTime: moment(event.end).format('HH:mm'),
        endDay: moment(event.end).format('MM/dd/yyyy'),
        endTime: moment(event.start).format('HH:mm'),
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
                            <SuccessButton onClick={() => handleClickSave(setEditMode)}>Save</SuccessButton>
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

const handleClickSave = async (setEditMode) => {
    setEditMode(false)
}

const handleInputChange = (setFormData, formData, property, value) => {

}

const Content = ({event}) => {
    const startDate = moment(event?.start.toISOString())
    const endDate = moment(event?.end.toISOString())

    const startDay = startDate.format('dddd, MMM Do')
    const endDay = endDate.format('dddd, MMM Do')

    return (
        <>
            <Modal.Title>{event?.title}</Modal.Title>
            <div className={"flex flex-col space-y-1"}>
                <span>
                    {startDay}{startDay !== endDay && ( - endDay)}
                </span>
                <span>
                    {startDate.format('h:mmA')} - {endDate.format('h:mmA')}
                </span>
            </div>
        </>
    )
}

const Form = ({event, formData, setFormData}) => {
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
                <div className={"flex flex-col space-y-1"}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={['DateTimePicker']}>
                            <span className={"font-medium"}>Start</span>
                            <div className={"flex flex-row"}>
                                <DatePicker label="Start Date"
                                            value={formData.startDay}
                                            onChange={e => handleInputChange(setFormData, formData, 'startTime', e)}
                                />
                                <DesktopTimePicker label="Start Time"
                                                   // value={formData.startTime}
                                                   onChange={e => handleInputChange(setFormData, formData, 'startTime', e)}
                                />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={['DateTimePicker']}>
                            <span className={"font-medium"}>End</span>
                            <div className={"flex flex-row"}>
                                <DatePicker label="End Date"
                                            // value={formData.endDay}
                                            onChange={e => handleInputChange(setFormData, formData, 'endDay', e)}
                                />
                                <DesktopTimePicker label="End Time"
                                             // value={formData.endTime}
                                             onChange={e => handleInputChange(setFormData, formData, 'endTime', e)}
                                />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                    {/*<DateTimePicker label="Start" />*/}
                    {/*<span>*/}
                    {/*    {startDay}{startDay !== endDay && ( - endDay)}*/}
                    {/*</span>*/}
                    {/*<span>*/}
                    {/*    {startDate.format('h:mmA')} - {endDate.format('h:mmA')}*/}
                    {/*</span>*/}
                </div>
            </form>
        </>
    )
}