import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { events } from "@/data/site";
import NewsImage from "@/components/NewsImage";

export const metadata = {
  title: "News & Events | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Latest news, leadership updates, partnerships, collaborations, entrepreneurship trainings and innovation events from UPEC.",
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
            Latest News & Events from UPEC.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Leadership announcements, strategic partnerships, collaborations,
            entrepreneurship training, innovation hubs and community impact
            programmes from the University of Port Harcourt Entrepreneurial Centre.
          </p>
        </div>
      </section>

      {/* FEATURED NEWS */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-0 overflow-hidden rounded-[2rem] border border-blue-100 bg-[#f7fbff] shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[380px] w-full overflow-hidden bg-slate-100">
              <NewsImage
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-5 top-5 flex gap-2">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[#003b73] text-center text-white shadow-lg">
                  <span className="text-3xl font-black leading-none">
                    {featured.date}
                  </span>
                  <span className="mt-1 text-[10px] font-bold tracking-[0.2em]">
                    {featured.month}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <span className="inline-flex rounded-full bg-[#e3f2ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#003b73]">
                Featured · {featured.type} · {featured.fullDate}
              </span>
              <h2 className="mt-5 text-2xl font-black leading-tight text-[#003b73] sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {featured.description}
              </p>
              <div className="mt-6 rounded-2xl bg-white p-5 text-sm leading-7 text-slate-700">
                <p className="whitespace-pre-line">{featured.content}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0070c9]" />
                  Abuja Park, UNIPORT Choba
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-[#0070c9]" />
                  {featured.fullDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL NEWS & EVENTS GRID */}
      <section className="bg-[#f7fbff] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <CalendarDays size={15} />
              News & Events Archive
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              All recent updates from UPEC.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore our journey - from leadership and strategic blueprints to
              partnerships with OPay, TETFund, Bayelsa Medical University, Bayelsa
              State Entrepreneurship Day, hands-on trainings and women empowerment
              programmes.
            </p>
          </div>

          <div className="mt-12 grid gap-8">
            {rest.map((event) => (
              <article
                key={event.id}
                id={`news-${event.id}`}
                className="group grid overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-sm transition hover:shadow-xl lg:grid-cols-[380px_1fr]"
              >
                <div className="relative min-h-[280px] w-full overflow-hidden bg-slate-100">
                  <NewsImage
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#003b73] text-center text-white shadow">
                      <span className="text-lg font-black leading-none">
                        {event.date}
                      </span>
                      <span className="mt-1 text-[9px] font-bold tracking-[0.14em]">
                        {event.month}
                      </span>
                    </div>
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#003b73] shadow">
                      {event.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col p-7 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#0070c9]">
                    {event.fullDate}
                  </p>
                  <h3 className="mt-3 text-xl font-black leading-7 text-[#003b73] sm:text-2xl">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {event.description}
                  </p>

                  <details className="mt-5 group/details">
                    <summary className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#f7fbff] px-4 py-2 text-sm font-bold text-[#003b73] transition hover:bg-[#e3f2ff]">
                      <span className="group-open/details:hidden">Read full story</span>
                      <span className="hidden group-open/details:inline">Hide story</span>
                      <ArrowRight size={16} className="transition group-open/details:rotate-90" />
                    </summary>
                    <div className="mt-5 rounded-2xl bg-[#f7fbff] p-5 text-sm leading-7 text-slate-700">
                      <p className="whitespace-pre-line">{event.content}</p>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003b73] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Never miss a UPEC News & Events update.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
            Get in touch to stay informed about upcoming workshops, bootcamps,
            innovation events, entrepreneurship trainings and community programmes.
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
