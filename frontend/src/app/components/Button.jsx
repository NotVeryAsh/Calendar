export default function Button({children})
{
    return (
        <button type="button" className="flex bg-blue-400 py-2 px-4 rounded-lg font-bold text-white drop-shadow-md">
            {children}
        </button>
    )
}