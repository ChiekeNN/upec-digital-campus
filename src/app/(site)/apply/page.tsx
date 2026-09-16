import Link from "next/link";
import {
  BadgeCheck,
  ClipboardList,
  Clock,
  HeadphonesIcon,
  ShieldCheck,
} from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";
import PostgraduateApplicationForm from "@/components/PostgraduateApplicationForm";
import { postgraduateInfo } from "@/data/site";

const pgProgrammes: Record<string, string> = {
  msc: "Master of Science (M.Sc) in Entrepreneurship",
  pgd: "Postgraduate Diploma (PGD) in Entrepreneurship",
};

export const metadata = {
  title: "Apply | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Apply to UPEC. Submit an Expression of Interest or a Full Online Application for your chosen programme.",
};

const assurances = [
  {
    icon: Clock,
    title: "Takes a few minutes",
    text: "Our forms are short and straightforward.",
  },
  {
    icon: ShieldCheck,
    title: "Your data is protected",
    text: "We handle your information securely and responsibly.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support available",
    text: "Our team is ready to help if you get stuck.",
  },
  {
    icon: BadgeCheck,
    title: "Open to everyone",
    text: "Students, staff, entrepreneurs and the public can apply.",
  },
];

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ programme?: string }>;
}) {
  const params = await searchParams;
  const key = (params?.programme || "").toLowerCase();
  const pgProgramme = pgProgrammes[key];
  const choosePg = key === "pg" && !pgProgramme;

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
            <ClipboardList size={15} className="text-[#f7b733]" />
            Apply to UPEC
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            {pgProgramme || choosePg
              ? "Postgraduate Application"
              : "Take the first step today."}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            {pgProgramme
              ? `Complete the online application form for the ${pgProgramme}. ${postgraduateInfo.session}.`
              : choosePg
              ? `Select the postgraduate programme you are applying for. ${postgraduateInfo.session}.`
              : "Choose how you would like to start—express your interest for more information, or complete a full application for your chosen programme."}
          </p>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="bg-[#f7fbff] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* FORM */}
          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="text-2xl font-black text-[#003b73]">
              {pgProgramme || (choosePg ? "Choose Your Programme" : "Application Form")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {pgProgramme
                ? "Please complete every section. Fields marked * are required."
                : choosePg
                ? "Select a programme below to open its application form."
                : "Select your preferred route below to begin."}
            </p>

            <div className="mt-8">
              {pgProgramme ? (
                <PostgraduateApplicationForm programme={pgProgramme} />
              ) : choosePg ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {Object.entries(pgProgrammes).map(([slug, title]) => (
                    <Link
                      key={slug}
                      href={`/apply?programme=${slug}`}
                      className="flex flex-col rounded-2xl border border-blue-100 bg-[#f7fbff] p-6 transition hover:border-[#0070c9] hover:shadow-md"
                    >
                      <span className="text-base font-black text-[#003b73]">
                        {title}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#0070c9]">
                        Start Application →
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <ApplicationForm />
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-blue-100 bg-white p-7 sm:p-8">
              <h3 className="text-lg font-black text-[#003b73]">
                Why apply to UPEC?
              </h3>
              <div className="mt-6 space-y-5">
                {assurances.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-black text-[#003b73]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {(pgProgramme || choosePg) && (
              <div className="rounded-3xl border border-blue-100 bg-white p-7 sm:p-8">
                <h3 className="text-lg font-black text-[#003b73]">
                  Application Fee & Payment
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  A non-refundable application fee of{" "}
                  <span className="font-black text-[#003b73]">
                    {postgraduateInfo.applicationFee}
                  </span>{" "}
                  should be paid into:
                </p>
                <div className="mt-4 space-y-3 rounded-2xl bg-[#f7fbff] p-5 text-sm">
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
                <div className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <p className="font-bold text-[#003b73]">Enquiries</p>
                  <p className="mt-2">📞 {postgraduateInfo.phones}</p>
                  <p className="mt-1">{postgraduateInfo.registrar}</p>
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-slate-100 bg-[#003b73] p-7 text-white sm:p-8">
              <h3 className="text-lg font-black">Need help applying?</h3>
              <p className="mt-3 text-sm leading-7 text-blue-100">
                Our admissions team is happy to guide you through the process
                and help you choose the right programme.
              </p>
              <Link
                href="/contact"
                className="btn-primary mt-6 w-full justify-center bg-[#f7b733] text-[#003b73] hover:bg-white"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
