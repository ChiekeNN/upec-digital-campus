import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  MonitorPlay,
} from "lucide-react";
import { postgraduateProgrammes, postgraduateInfo } from "@/data/site";

export const metadata = {
  title: "Programmes | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Explore UPEC's postgraduate programmes — Master of Science (M.Sc) and Postgraduate Diploma (PGD) in Entrepreneurship.",
};

const highlights = [
  {
    icon: MonitorPlay,
    title: "Flexible Learning",
    text: "Full time and part time options to fit your schedule.",
  },
  {
    icon: BadgeCheck,
    title: "Recognized Degrees",
    text: "Earn accredited postgraduate qualifications.",
  },
  {
    icon: GraduationCap,
    title: "Career Growth",
    text: "Advance your career and entrepreneurial journey.",
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
            Advance your career with a postgraduate degree.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Postgraduate programmes in Entrepreneurship built for practical
            learning, real skills and measurable outcomes.
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

      {/* POSTGRADUATE PROGRAMMES */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="section-label">
              <GraduationCap size={15} />
              Postgraduate Programmes
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              Master of Science & Postgraduate Diploma.
            </h2>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-black text-amber-700">
              🎓 {postgraduateInfo.session}
            </p>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Applications are invited from suitably qualified candidates for
              admission into Postgraduate Degrees such as the Master of Science
              (M.Sc) and Postgraduate Diploma (PGD) in Entrepreneurship at the
              University of Port Harcourt Entrepreneurial Centre.
            </p>
          </div>

          {/* Programme cards */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {postgraduateProgrammes.map((prog) => (
              <div
                key={prog.title}
                className="flex flex-col rounded-3xl border border-blue-100 bg-[#f7fbff] p-8"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#003b73] text-white">
                  <GraduationCap size={24} />
                </div>
                <h3 className="mt-5 text-xl font-black text-[#003b73]">
                  {prog.title}
                </h3>

                <div className="mt-4 flex items-start gap-2 rounded-xl bg-white p-3 text-sm">
                  <Calendar
                    size={18}
                    className="mt-0.5 shrink-0 text-[#0070c9]"
                  />
                  <span className="font-semibold text-slate-700">
                    {prog.duration}
                  </span>
                </div>

                <p className="mt-6 text-xs font-black uppercase tracking-wide text-slate-400">
                  Admission Requirements
                </p>
                <div className="mt-3 space-y-3">
                  {prog.requirements.map((req) => (
                    <div key={req} className="flex gap-2">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#0070c9]"
                      />
                      <p className="text-sm leading-6 text-slate-600">{req}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/apply?programme=${
                    prog.title.includes("M.Sc") ? "msc" : "pgd"
                  }`}
                  className="btn-primary mt-7 w-full justify-center"
                >
                  Apply Now
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>

          {/* Application & Payment info */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <Building2 size={22} />
                </div>
                <h3 className="text-lg font-black text-[#003b73]">
                  Method of Application
                </h3>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Applicants should apply online via the official registration
                portal, or visit the University of Port Harcourt Entrepreneurial
                Centre (UPEC) at the University of Port Harcourt.
              </p>
              <Link href="/apply?programme=pg" className="btn-primary mt-6">
                Register Online
                <ArrowRight size={18} />
              </Link>
              <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-600">
                <p className="font-bold text-[#003b73]">Enquiries</p>
                <p className="mt-2">📞 {postgraduateInfo.phones}</p>
                <p className="mt-1">{postgraduateInfo.registrar}</p>
                <p className="mt-1">
                  University of Port Harcourt, Choba, PMB 5323, Port Harcourt.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <CreditCard size={22} />
                </div>
                <h3 className="text-lg font-black text-[#003b73]">Payments</h3>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                A non-refundable application fee of{" "}
                <span className="font-black text-[#003b73]">
                  {postgraduateInfo.applicationFee}
                </span>{" "}
                should be paid into:
              </p>

              <div className="mt-5 space-y-3 rounded-2xl bg-[#f7fbff] p-5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Bank Name</span>
                  <span className="text-right font-bold text-[#003b73]">
                    {postgraduateInfo.bankName}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Account Name</span>
                  <span className="text-right font-bold text-[#003b73]">
                    {postgraduateInfo.accountName}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Account Number</span>
                  <span className="text-right font-bold text-[#003b73]">
                    {postgraduateInfo.accountNumber}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-slate-500">
                Narration of transaction should be in the candidate&apos;s name
                and in favour of UPEC. Payment can also be made online on the
                website using debit or credit card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003b73] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Ready to start your postgraduate journey?
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
