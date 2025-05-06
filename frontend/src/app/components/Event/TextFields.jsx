export default function TextFieldsContent ({event}) {

    return (
        <>
            <div className={"flex flex-col space-y-2"}>
                <span className={"font-medium"}>Description</span>
                <span>
                    {event.description}
                </span>
            </div>
        </>
    );
}

export const TextFieldsInputs = ({formData, setFormData}) => {
    const handleDescriptionChanged = (e) => {
        // TODO Handle condition where cancelled is selected
        setFormData(prev => ({
            ...prev,
            ...{
                description: e.target.value
            }
        }));
    }
    
    return (
        <>
            <div className={"flex flex-col space-y-3"}>
                <span className={"font-medium"}>Description</span>
                <div className={"flex flex-col"}>
                    <textarea className={"p-2 border border-1 border-gray-400 rounded"}
                           rows={10}
                           value={formData.description}
                           onChange={handleDescriptionChanged}
                           placeholder={"Really awesome hangout..."}
                    />
                </div>
            </div>
        </>
    )
}