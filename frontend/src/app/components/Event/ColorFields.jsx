import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrush} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";

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
    
    const [color, setColor] = useState('#ffffff')
    const customColorRef = useRef(null);
    
    return (
        <div className={"flex flex-col space-y-3"}>
            <span className={"font-medium"}>Color</span>
            <div className={"grid grid-cols-4 px-10 gap-5 p-2 border border-1 border-gray-400 rounded"}>
                <span className={"m-auto rounded-md w-8 h-8 flex border bg-gray-200"}
                      onClick={() => customColorRef.current.click()}>
                    <FontAwesomeIcon icon={faBrush} className={"m-auto text-xl"}/>
                    <input ref={customColorRef} type="color" value={color} onChange={(e) => setColor(e.target.value)} className={"w-0 h-0"}/>
                </span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#D50000]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#E67C73]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#F4511E]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#F6BF26]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#33B679]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#0B8043]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#039BE5]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#3F51B5]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#7986CB]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#8E24AA]"}></span>
                <span className={"m-auto rounded-md border w-8 h-8 bg-[#616161]"}></span>
            </div>
        </div>
    )
}