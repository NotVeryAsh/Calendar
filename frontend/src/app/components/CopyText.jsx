import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CopyText({children})
{
    return (
        <div className={"flex p-2 bg-gray-100 rounded"} onClick={handleClickComponent}>
            <div
                className={"flex text-center truncate m-auto mr-2"}>
                {children}
            </div>
            <div className={"flex flex-shrink-0 w-10 h-10 rounded bg-gray-200"} onClick={(e) => {handleClickCopy(e, children)}}>
                <FontAwesomeIcon icon={faCopy} className={"m-auto text-xl"}/>
            </div>
        </div>
    )
}

const handleClickComponent = (e) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(e.target);
    selection.removeAllRanges();
    selection.addRange(range);
}

const handleClickCopy = (e, text) => {
    navigator.clipboard.writeText(text).then(() => {
        // TODO Show popup 'Link copied!'
    })
}