import Button from "@/app/components/Button";

export default function DangerButton({onClick, children})
{
    return (
        <Button onClick={onClick} color={'bg-red-400'}>
            {children}
        </Button>
    )
}