import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Popup from "@/app/components/Event/Popup";
import {useState} from "react";

export default function CopyText({setMessage, children})
{    
    const handleClickComponent = (e) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(e.target);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    const handleClickCopy = (e, text) => {
        if(text === null) {
            return;
        }
        navigator.clipboard.writeText(text)
            .then(setMessage({
                message: 'Link Copied!',
                type: 'success'
            }))
    }
    
    return (
        <>
            <div className={"flex p-2 bg-gray-100 rounded hover:cursor-pointer hover:bg-gray-200"} onClick={handleClickComponent}>
                <div
                    className={"flex text-center truncate m-auto mr-2"}>
                    {children}
                </div>
                <button className={"flex flex-shrink-0 w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 active:bg-gray-400"} onClick={(e) => {handleClickCopy(e, children)}}>
                    <FontAwesomeIcon icon={faCopy} className={"m-auto text-xl"}/>
                </button>
            </div>
        </>
    )
}