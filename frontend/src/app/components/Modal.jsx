import Button from "@/app/components/Button";

export default function Modal({hidden=true, children}) {
    
    const hiddenClass = hidden ? "hidden": ""

    return (
        <div className={"relative z-10 " + hiddenClass} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-500/75 transition-opacity">
                <div className="flex flex-col min-h-full justify-center p-4 mx-auto">
                    <div
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-5xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Header = ({children}) => {

}

const Footer = ({setModalHidden, children}) => {
    return (
        <div className="flex bg-gray-50 px-4 py-3 items-end flex-row-reverse">
            { children ? (
                children
            ): (
                <Button onClick={() => {setModalHidden(true)}}>
                    Close
                </Button>
            )}
        </div>
    )
}

const Content = ({children}) => {
    return (
        <div className="bg-white px-4 pb-4 pt-5">
            {children}
        </div>
    )
}

Modal.Header = Header;
Modal.Footer = Footer;
Modal.Content = Content;