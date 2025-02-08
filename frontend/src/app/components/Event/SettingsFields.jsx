import {ucFirst} from "@/app/lib/string";
import moment from "moment-timezone";
export default function SettingsFieldsContent ({event, formData}) {

    const lastUpdated = moment.tz(event?.start, formData.timezone)
    const format =  lastUpdated.year() !== moment().year() ? 'dddd, MMM Do, Y, hh:mm A' : 'dddd, MMM Do, hh:mm A'

    return (
        <>
            <div className={"flex flex-col space-y-2"}>
                <span className={"font-medium"}>Status</span>
                <span>
                    {ucFirst(event.status)}
                </span>
            </div>
            <div className={"flex flex-col space-y-2"}>
                <span className={"font-medium"}>Last Updated</span>
                <span>
                    {lastUpdated.format(format)}
                </span>
            </div>
        </>
    );
}

export const SettingsFieldsInputs = ({event, formData, setFormData}) => {
    return (
        <>
            <div className={"flex flex-col space-y-3"}>
                <span className={" font-medium"}>Status</span>
                <div className={"flex flex-col"}>
                    <select onChange={(e) => {
                        handleStatusSelected(e, setFormData)
                    }}
                            className={"text-center p-2 border border-1 border-gray-400 rounded"}
                            defaultValue={formData.status}>
                        {event.statuses.map((status => (
                            <option key={status} value={status}>
                                {ucFirst(status)}
                            </option>
                        )))}
                    </select>
                </div>
            </div>
        </>
    )
}

const handleStatusSelected = (e, setFormData) => {
    // Handle condition where cancelled is selected
    const status = e.target.value
    setFormData(prev => ({
        ...prev,
        ...{
            status: status 
        }
    }));
}