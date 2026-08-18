import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { events } from "@/data/site";

export const metadata = {
  title: "News & Events | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Discover UPEC entrepreneurship workshops, innovation events, bootcamps, startup calls and community programmes.",
};

export default function EventsPage() {
  const featured = events[0];
  const rest = events.slice(1);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
            <CalendarDays size={15} className="text-[#f7b733]" />
            News & Events
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            Connect, learn and grow with UPEC.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Stay up to date with our latest workshops, innovation events,
            bootcamps, startup calls and community programmes.
          </p>
        </div>
      </section>

      {/* FEATURED EVENT */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-blue-100 bg-[#f7fbff] p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="grid h-32 w-32 place-items-center rounded-3xl bg-[#003b73] text-center text-white">
              <span className="text-5xl font-black leading-none">
                {featured.date}
              </span>
              <span className="mt-2 text-xs font-bold tracking-[0.2em]">
                {featured.month}
              </span>
            </div>

            <div>
              <span className="rounded-full bg-[#e3f2ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#003b73]">
                Featured · {featured.type}
              </span>
              <h2 className="mt-4 text-2xl font-black text-[#003b73] sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                {featured.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0070c9]" />
                  Abuja Park, UNIPORT Choba
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-[#0070c9]" />
                  Time to be announced
                </span>
              </div>
              <Link href="/contact" className="btn-primary mt-7">
                Register Interest
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MORE EVENTS */}
      <section className="bg-[#f7fbff] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <CalendarDays size={15} />
              Upcoming
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              More events and workshops.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((event) => (
              <article
                key={event.title}
                className="group flex flex-col rounded-3xl border border-blue-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#003b73] text-center text-white">
                    <span className="text-xl font-black leading-none">
                      {event.date}
                    </span>
                    <span className="mt-1 text-[10px] font-bold tracking-[0.14em]">
                      {event.month}
                    </span>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#0070c9]">
                    {event.type}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-black leading-7 text-[#003b73]">
                  {event.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                  {event.description}
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0070c9] group-hover:text-[#003b73]"
                >
                  Register interest
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Event dates and details are sample content and will be updated with
            official UPEC announcements.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003b73] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Never miss a UPEC event.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
            Get in touch to stay informed about upcoming workshops, bootcamps,
            innovation events and community programmes.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-primary bg-[#f7b733] text-[#003b73] hover:bg-white"
            >
              Contact UPEC
              <ArrowRight size={18} />
            </Link>
            <Link href="/programmes" className="btn-outline">
              Explore Programmes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
