import LinkButton from "@/app/ui/link-button";

export default function Page() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
        <h1 className="text-6xl font-bold text-slate-900">Get Started</h1>
          <div className={"flex flex-col space-y-5"}>
            <LinkButton href={"/get-started"} text={"Import Google Calendar"} color={"bg-teal-500"} />
            <LinkButton href={"/get-started"} text={"Start your own"} color={"bg-teal-600"} />
          </div>
          <p className="text-2xl text-slate-700">Calendars... But better.</p>
      </main>
  )
}
