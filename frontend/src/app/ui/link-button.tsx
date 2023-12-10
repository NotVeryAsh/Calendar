import Link from "next/link";

export default function LinkButton({ href, text, color }: { href: string, text: string, color: string }) {

    const style = color + " text-white text-center px-4 py-2 rounded-md drop-shadow-sm transition ease-in-out hover:-translate-y-1";

    return (
        <Link href={href} className={style}>
            {text}
        </Link>
    )
}