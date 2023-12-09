import Link from "next/link";
import LinkButton from "@/app/ui/link-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
        <h1 className="text-6xl font-bold text-slate-900">Calendars</h1>
        <LinkButton href={"/get-started"} text={"Get Started"} color={"bg-teal-500"} />
        <p className="text-2xl text-slate-700">Calendars... But better.</p>
    </main>
  )
}
