import {DatePicker, DesktopTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import moment from "moment-timezone";

export default function DateFieldsContent ({event, formData}) {

    const startDate = moment.tz(event?.start, formData.timezone)
    const endDate = moment.tz(event?.end, formData.timezone)

    const year = moment().year()
    
    const format = 'dddd, MMM Do'
    const startDayFormat = startDate.year() === year ? format : format + ', Y'
    const endDayFormat = endDate.year() === year ? format : format + ', Y'
    
    const startDay = startDate.format(startDayFormat)
    const endDay = endDate.format(endDayFormat)
    
    return (
        <>
            <span>
                {startDay}{startDay !== endDay && (' - ' + endDay)}
            </span>
            <span>
                {startDate.format('h:mmA')} - {endDate.format('h:mmA')}
            </span>
        </>
    );
}

export const DateFieldsInputs = ({handleInputChange, setFormData, formData}) => {
    return (
        <>
            <div className={"flex flex-row !mt-4 space-x-2"}>
                <input id={"all-day"} type={"checkbox"}
                       onChange={e => {handleAllDayChecked(formData, setFormData, e); handleInputChange(setFormData, formData, 'allDay', e)}}/>
                <label htmlFor={"all-day"}>All Day</label>
            </div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer components={['DateTimePicker']}>
                    <span className={"font-medium"}>Start</span>
                    <div className={"flex flex-row !mt-4"}>
                        <DatePicker
                            label="Start Date"
                            className={formData.allDay === true ? '!w-full' : ''}
                            value={moment.tz(formData.startDate, formData.timezone)}
                            onChange={e => handleInputChange(setFormData, formData, 'startDate', e)}
                            sx={getInputStyle()}
                        />
                        <DesktopTimePicker
                            className={formData.allDay === true ? '!hidden' : ''}
                            label="Start Time"
                            value={moment.tz(formData.startTime, formData.timezone)}
                            onChange={e => {handleInputChange(setFormData, formData, 'startTime', e); handleChangeTime(e, formData, setFormData, true)}}
                            sx={getInputStyle()}
                        />
                    </div>
                </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer components={['DateTimePicker']}>
                    <span className={"font-medium"}>End</span>
                    <div className={"flex flex-row !mt-4"}>
                        <DatePicker
                            label="End Date"
                            className={formData.allDay === true ? '!w-full' : ''}
                            value={moment.tz(formData.endDate, formData.timezone)}
                            onChange={e => handleInputChange(setFormData, formData, 'endDate', e)}
                            sx={getInputStyle()}
                        />
                        <DesktopTimePicker
                            className={formData.allDay === true ? '!hidden' : ''}
                            label="End Time"
                            value={moment.tz(formData.endTime, formData.timezone)}
                            onChange={e => {handleInputChange(setFormData, formData, 'endTime', e); handleChangeTime(e, formData, setFormData, false)}}
                            sx={getInputStyle()}
                        />
                    </div>
                </DemoContainer>
            </LocalizationProvider>
            <div className={"flex flex-col space-y-3"}>
                <span className={" font-medium"}>Timezone</span>
                <div className={"flex flex-col"}>
                    <select onChange={(e) => {handleSelectTimezone(e, setFormData, formData)}}
                        className={"text-center p-2 border border-1 border-gray-400 rounded"} defaultValue={formData.timezone}>
                        {getTimezones().map((timezone => (
                            <option key={timezone.timezone} value={timezone.timezone}>
                                {timezone.label}
                            </option>
                        )))}
                    </select>
                </div>
            </div>
        </>
    )
}

const handleChangeTime = (value, formData, setFormData, start = false) => {
    const timezone = formData.timezone
    let property
    if(start) {
        property = 'originalStartTime' 
    } else {
        property = 'originalEndTime'
    }

    setFormData(prev => ({
        ...prev,
        ...{
            [property]: moment.tz(value, timezone)
        }
    }));
}

const handleSelectTimezone = (e, setFormData, formData) => {
    const timezone = e.target.value
    setFormData(prev => ({
        ...prev,
        ...{
            timezone: timezone,
            startDate: moment.tz(formData.startDate.format(), timezone),
            originalStartTime: moment.tz(formData.originalStartTime.format(), timezone),
            startTime: moment.tz(formData.startTime.format(), timezone),
            endDate: moment.tz(formData.endDate.format(), timezone),
            originalEndTime: moment.tz(formData.originalEndTime.format(), timezone),
            endTime: moment.tz(formData.endTime.format(), timezone),
        }
    }));
}

const handleAllDayChecked = (formData, setFormData, event) => {
    const startTime = event.target.checked ? formData.startDate.startOf('day') : formData.originalStartTime;
    const endTime = event.target.checked ? formData.endDate.endOf('day') : formData.originalEndTime;
    
    setFormData(prev => ({
        ...prev,
        ...{
            startTime: startTime,
            endTime: endTime
        }
    }));
}

const getTimezones = () => {
    const timezoneNames = moment.tz.names()
        .filter((timezone) => timezone.includes('/') && !timezone.includes('Etc'))
        .sort((a, b) => moment.tz(a).utcOffset() - moment.tz(b).utcOffset())

    let timezones = []

    for(let i in timezoneNames)
    {
        let name = timezoneNames[i]

        timezones.push({
            label: `(GMT${moment.tz(name).format('Z')}) ` + name.replace(/_/g, " "),
            timezone: name
        });
    }

    return timezones
}

const getInputStyle = () => {
    return {
        "& .MuiOutlinedInput-root": {
            borderRadius: "0.25rem !important",
            fontFamily: "Montserrat, Montserrat Fallback;"
        },
        "& .MuiOutlinedInput-input" : {
            padding: "0.8rem",
        },
        '& .MuiStack-root': {
            paddingTop: '0 !important',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid rgb(156 163 175) !important'
        },
        '& .MuiInputAdornment-root': {
            display: 'none !important'
        }
    };
}