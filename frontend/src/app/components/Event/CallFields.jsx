import CopyText from "@/app/components/CopyText";

export default function CallFieldsContent ({event}) {
    
    return (
        <>
            <div className={"flex flex-col space-y-2"}>
                <span className={"font-medium"}>Hangout Link</span>
                <div className={"flex flex-col"}>
                    <CopyText>
                        {event.hangoutLink}
                    </CopyText>
                </div>
            </div>
            <div className={"flex flex-col space-y-2"}>
                <span className={"font-medium"}>Event Link</span>
                <div className={"flex flex-col"}>
                    <CopyText>
                        {event.htmlLink}
                    </CopyText>
                </div>
            </div>
        </>
    );
}