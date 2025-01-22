import Button from "@/app/components/Button";

export default function SuccessButton({onClick, children})
{
    return (
        <Button onClick={onClick} color={'bg-green-400'}>
            {children}
        </Button>
    )
}