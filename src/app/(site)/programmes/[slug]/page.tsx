import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  GraduationCap,
  ListChecks,
  MonitorPlay,
  Wallet,
} from "lucide-react";
import { programmes } from "@/data/site";

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);

  if (!programme) {
    return { title: "Programme Not Found | UPEC" };
  }

  return {
    title: `${programme.title} | UPEC`,
    description: programme.description,
  };
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);

  if (!programme) {
    notFound();
  }

  const related = programmes.filter((p) => p.slug !== slug).slice(0, 3);

  const quickFacts = [
    { icon: Clock, label: "Duration", value: programme.duration },
    { icon: MonitorPlay, label: "Mode", value: programme.mode },
    { icon: Wallet, label: "Fee", value: programme.fee },
    { icon: BadgeCheck, label: "Category", value: programme.category },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-100 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Programmes
            </Link>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
              <GraduationCap size={15} className="text-[#f7b733]" />
              {programme.category}
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              {programme.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100">
              {programme.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admissions"
                className="btn-primary bg-[#f7b733] text-[#003b73] hover:bg-white"
              >
                Apply for this Programme
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Ask a Question
              </Link>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
            <Image
              src={programme.image}
              alt={programme.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="border-b border-slate-100 bg-white py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 sm:grid-cols-4 sm:px-8">
          {quickFacts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    {fact.label}
                  </p>
                  <p className="text-sm font-black text-[#003b73]">
                    {fact.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-[#f7fbff] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* OUTCOMES */}
          <div>
            <span className="section-label">
              <ListChecks size={15} />
              What You Will Learn
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73]">
              Learning outcomes
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              By the end of this programme, you will be able to:
            </p>

            <div className="mt-8 space-y-4">
              {programme.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-5"
                >
                  <CheckCircle2
                    size={22}
                    className="mt-0.5 shrink-0 text-[#0070c9]"
                  />
                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MODULES */}
          <div>
            <span className="section-label">
              <GraduationCap size={15} />
              Programme Structure
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73]">
              Course modules
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              This programme is delivered through the following modules:
            </p>

            <div className="mt-8 space-y-3">
              {programme.modules.map((module, index) => (
                <div
                  key={module}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#003b73] text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm font-bold text-slate-700">{module}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-7">
              <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                Programme Fee
              </p>
              <p className="mt-2 text-3xl font-black text-[#003b73]">
                {programme.fee}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Indicative fee — subject to UPEC approval.
              </p>
              <Link
                href="/admissions"
                className="btn-primary mt-6 w-full justify-center"
              >
                Apply Now
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-2xl font-black tracking-tight text-[#003b73] sm:text-3xl">
            Related programmes
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <article
                key={item.slug}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003b73]/70 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-extrabold leading-6 text-[#003b73]">
                    {item.title}
                  </h3>
                  <Link
                    href={`/programmes/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#0070c9] hover:text-[#003b73]"
                  >
                    View details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
