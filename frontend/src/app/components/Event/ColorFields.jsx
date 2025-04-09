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

    const [selectedColor, setSelectedColor] = useState(formData.colorId)
    const [customColor, setCustomColor] = useState('#ffffff')
    const customColorRef = useRef(null);
    
    return (
        <div className={"flex flex-col space-y-3"}>
            <span className={"font-medium"}>Color</span>
            <div className={"grid grid-cols-4 px-10 gap-5 p-2 border border-1 border-gray-400 rounded"}>
                {/* TODO Check if Google can support custom colors */}
                {/*<span className={"m-auto rounded-md w-8 h-8 flex border bg-gray-200"}*/}
                {/*      onClick={() => customColorRef.current.click()}>*/}
                {/*    <FontAwesomeIcon icon={faBrush} className={"m-auto text-xl"}/>*/}
                {/*    <input ref={customColorRef} type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className={"w-0 h-0"}/>*/}
                {/*</span>*/}
                {formData.colors.map(([key, color]) => (
                    <span key={key} className={`m-auto rounded-md border w-8 h-8 ${selectedColor === key ? 'ring ring-2 ring-blue-400' : ''}`} style={{background: color.background}} onClick={() => setSelectedColor(key)}></span>
                ))}
            </div>
        </div>
    )
}