import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  GraduationCap,
  Layers,
  MonitorPlay,
} from "lucide-react";
import { programmes } from "@/data/site";

export const metadata = {
  title: "Programmes | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Explore UPEC's professional, vocational, executive and enterprise programmes designed for practical learning and measurable outcomes.",
};

const highlights = [
  {
    icon: MonitorPlay,
    title: "Flexible Learning",
    text: "Online, physical and hybrid options to fit your schedule.",
  },
  {
    icon: BadgeCheck,
    title: "Practical Skills",
    text: "Learn by doing, with real-world tools and outcomes.",
  },
  {
    icon: GraduationCap,
    title: "Certificates",
    text: "Earn certificates for eligible completed programmes.",
  },
];

export default function ProgrammesPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
            <GraduationCap size={15} className="text-[#f7b733]" />
            UPEC Programmes
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            Learn skills that move ideas forward.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Professional, vocational, executive and enterprise programmes built
            for practical learning, real skills and measurable outcomes.
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="border-b border-slate-100 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-black text-[#003b73]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROGRAMME GRID */}
      <section className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <Layers size={15} />
              All Programmes
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              Find the right programme for you.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => (
              <article
                key={programme.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={programme.image}
                    alt={programme.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003b73]/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#003b73]">
                    {programme.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-extrabold leading-6 text-[#003b73]">
                    {programme.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {programme.description}
                  </p>

                  <div className="mt-5 flex items-center gap-4 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {programme.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MonitorPlay size={14} />
                      {programme.mode}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-sm font-black text-[#003b73]">
                      {programme.fee}
                    </span>
                    <Link
                      href={`/programmes/${programme.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0070c9] hover:text-[#003b73]"
                    >
                      View details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            Programme titles, durations and fees displayed here are editable
            sample content pending official UPEC approval.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003b73] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Ready to start learning?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
            Begin your application today and take the next step in your
            entrepreneurship journey with UPEC.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/admissions"
              className="btn-primary bg-[#f7b733] text-[#003b73] hover:bg-white"
            >
              Apply Now
              <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-outline">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
