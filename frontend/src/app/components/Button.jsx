export default function Button({onClick, children, color='bg-blue-400'})
{
    const className = color + ' flex py-2 px-4 rounded-lg font-bold text-white drop-shadow-md'
    return (
        <button onClick={onClick} type="button" className={className}>
            {children}
        </button>
    )
}