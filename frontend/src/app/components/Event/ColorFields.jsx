export default function ColorFieldsContent ({event}) {
      
    return (
        <>
            <div className={"flex flex-row space-x-3"}>
                <span className={"font-medium my-auto"}>Color</span>
                <span className={"m-auto rounded-md border border-gray-500 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
            </div>
        </>
    );
}

export const ColorFieldsInputs = ({handleInputChange, setFormData, formData}) => {
    const handleColorSelected = (event) => {

    }
    
    return (
        <div className={"flex flex-col space-y-3"}>
            <span className={"font-medium"}>Color</span>
            <div className={"grid grid-cols-4 px-10 gap-5 p-2 border border-1 border-gray-400 rounded bg-gray-200"}>
                <span className={"m-auto rounded-md border border-gray-400 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
                <span className={"m-auto rounded-md border border-gray-400 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
                <span className={"m-auto rounded-md border border-gray-400 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
                <span className={"m-auto rounded-md border border-gray-400 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
                <span className={"m-auto rounded-md border border-gray-400 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
                <span className={"m-auto rounded-md border border-gray-400 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
                <span className={"m-auto rounded-md border border-gray-400 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
                <span className={"m-auto rounded-md border border-gray-400 drop-shadow-xl w-8 h-8 bg-[#FF2D20]"}></span>
            </div>
        </div>
    )
}