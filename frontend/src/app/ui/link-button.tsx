import Link from "next/link";

export default function LinkButton({ href, text, color }: { href: string, text: string, color: string }) {

    const style = color + " text-white text-center px-4 py-2 rounded-md";

    return (
        <Link href={href} className={style}>
            {text}
        </Link>
    )
}