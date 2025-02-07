import Button from "@/app/components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

export default function Modal({hidden=true, tabs=[], children}) {
    
    const hiddenClass = hidden ? "hidden": ""
    const [activeTab, setActiveTab] = useState(null);
    
    let currentTop = 0
    
    return (
        <div className={"relative z-10 " + hiddenClass} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-500/75 transition-opacity">
                <div className="flex flex-col min-h-full justify-center sm:p-4 mx-auto h-full">
                    <div className="relative flex flex-col max-w-5xl ml-auto w-[90%] sm:mx-auto sm:w-full h-full p3">
                        <div
                            className="z-10 flex flex-col justify-between rounded-lg bg-white text-left shadow-xl transition-all mx-auto w-full h-full">
                            {children}
                        </div>
                        {tabs.map((tab) => {
                            currentTop += 3.8
                            return <Tab color={tab.color} icon={tab.icon} top={currentTop} onClick={tab.onClick} name={tab.key} key={tab.key} activeTab={activeTab} setActiveTab={setActiveTab} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Header = ({children}) => {

}

const Title = ({children}) => {
    return (
        <div className={"text-center font-bold mb-6 text-2xl flex flex-col"}>
            {children}
        </div>
    )
}

const Footer = ({setHideModal, children}) => {
    return (
        <div className="flex bg-gray-50 px-4 py-3 items-end justify-between sm:rounded-b-lg">
            { children ? (
                children
            ): (
                <Button onClick={() => {setHideModal(true)}}>
                    Close
                </Button>
            )}
        </div>
    )
}

const Tab = ({color, icon, top, onClick, activeTab, setActiveTab, name}) => {
    
    const activeClass = activeTab === name ? 'outline outline-2 outline-white' : ''

    return (
        <div
            style={{top: `${top}rem`}}
            className={ `${activeClass} ${color} ${top} flex absolute inset-0 items-center z-1 h-12 w-9 sm:w-20 -left-[2.18rem] sm:-left-10 rounded-l-md px-2 drop-shadow-md`}
            onClick={() => {setActiveTab(name); onClick()}}
        >
            <FontAwesomeIcon icon={icon} className={"m-auto text-lg"}/>
        </div>
    );
}

const Content = ({children}) => {
    return (
        <div className="bg-white px-4 pb-4 pt-5 space-y-1 text-base sm:rounded-lg">
            {children}
        </div>
    )
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Title = Title;
Modal.Footer = Footer;