import {useEffect, useState} from "react";

export default function Popup({message=null, type='error'}) {

    const [hidden, setHidden] = useState(true)
    const [width, setWidth] = useState(0)
    
    useEffect(() => {
        if (message === null) {
            return;
        }
        
        setHidden(false)
        setTimeout(() => {setHidden(true); setWidth(0)}, 3000);
        
    }, [message]);

    const types = {
        error: "bg-red-400",
        success: "bg-green-400",
    };
    
    return (
        <div className={"fixed inset-x-0 top-0 z-20 mx-auto " + (hidden ? 'opacity-0': '')} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className={"flex flex-col bg-white h-20 mx-4 mt-4 rounded-lg text-center shadow-xl"}>
                <span className={"flex m-auto"}>
                    {message}
                </span>
                <div className={`overflow-hidden rounded-lg rounded-tl-none h-2 ${types[type]} transition-[width] ease-linear duration-[3s] ` + (hidden ? 'w-[0%]' : 'w-[100%]')}></div>
            </div>   
        </div>
    )
}