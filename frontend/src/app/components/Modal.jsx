import Button from "@/app/components/Button";

export default function Modal({hidden=true, children}) {
    
    const hiddenClass = hidden ? "hidden": ""

    return (
        <div className={"relative z-10 " + hiddenClass} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-500/75 transition-opacity">
                <div className="flex flex-col min-h-full justify-center p-4 mx-auto h-full">
                    <div
                        className="flex flex-col justify-between relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-5xl mx-auto w-full h-full">
                        {children}
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
        <div className={"text-center font-bold mb-3 text-xl"}>
            {children}
        </div>
    )
}

const Footer = ({setHideModal, children}) => {
    return (
        <div className="flex bg-gray-50 px-4 py-3 items-end justify-between">
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

const Content = ({children}) => {
    return (
        <div className="bg-white px-4 pb-4 pt-5 text-sm space-y-1">
            {children}
        </div>
    )
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Title = Title;
Modal.Footer = Footer;