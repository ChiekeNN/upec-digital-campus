import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  CreditCard,
  FileCheck2,
  FileText,
  HelpCircle,
  ListChecks,
  Mail,
  UserPlus,
} from "lucide-react";

export const metadata = {
  title: "Admissions | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Learn how to apply to UPEC. Discover entry requirements, application steps, and choose between an Expression of Interest or a full online application.",
};

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    text: "Register using any email address you can access and verify.",
  },
  {
    icon: ClipboardList,
    title: "Choose a Programme",
    text: "Select the course or programme that matches your goals.",
  },
  {
    icon: FileText,
    title: "Complete the Form",
    text: "Fill in your details and upload any required documents.",
  },
  {
    icon: CreditCard,
    title: "Pay & Submit",
    text: "Pay the application fee where applicable and submit.",
  },
  {
    icon: FileCheck2,
    title: "Track Your Status",
    text: "Follow your application from submission to decision.",
  },
];

const requirements = [
  "A valid email address you can access and verify",
  "Basic personal and contact information",
  "Relevant academic or professional background (where applicable)",
  "Any supporting documents requested for your chosen programme",
  "Application fee payment where the programme requires it",
];

const faqs = [
  {
    q: "Do I need to be a UNIPORT student to apply?",
    a: "No. UPEC welcomes UNIPORT students, staff, entrepreneurs and members of the public, including external and community learners.",
  },
  {
    q: "What is the difference between Expression of Interest and Full Application?",
    a: "An Expression of Interest is a quick way to indicate interest and receive information. A Full Application is the complete process, including forms, documents and payment where applicable.",
  },
  {
    q: "How do I pay my application or course fee?",
    a: "Payments will be made securely online through an approved payment provider. Downloadable receipts will be available in your dashboard.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, digital certificates are issued for eligible completed short courses and programmes.",
  },
];

export default function AdmissionsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
            <ClipboardList size={15} className="text-[#f7b733]" />
            Admissions
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            Start your journey with UPEC.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Applying is simple. Choose the route that suits you—express your
            interest, or complete a full online application today.
          </p>
        </div>
      </section>

      {/* TWO ROUTES */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Expression of Interest */}
            <div className="flex flex-col rounded-3xl border border-blue-100 bg-[#f7fbff] p-8 sm:p-10">
              <span className="w-fit rounded-full bg-[#e3f2ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#003b73]">
                Not ready yet?
              </span>
              <h2 className="mt-5 text-2xl font-black text-[#003b73]">
                Expression of Interest
              </h2>
              <p className="mt-4 flex-1 text-base leading-8 text-slate-600">
                Perfect if you want to learn more before applying. Share a few
                details and the UPEC team will follow up with information and
                guidance.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Quick and simple form",
                  "No payment required",
                  "Receive programme information",
                  "Get invited to apply fully",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                  >
                    <ArrowRight size={16} className="text-[#0070c9]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply"
                className="btn-primary mt-8 w-full justify-center"
              >
                Express Interest
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Full Application */}
            <div className="flex flex-col rounded-3xl border border-[#003b73] bg-[#003b73] p-8 text-white sm:p-10">
              <span className="w-fit rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-blue-100">
                Ready to apply?
              </span>
              <h2 className="mt-5 text-2xl font-black">
                Full Online Application
              </h2>
              <p className="mt-4 flex-1 text-base leading-8 text-blue-100">
                Apply directly for your chosen programme. Complete the form,
                upload documents, pay where required and track your progress.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Complete application form",
                  "Secure document upload",
                  "Online payment where applicable",
                  "Real-time status tracking",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-50"
                  >
                    <ArrowRight size={16} className="text-[#84c7ff]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/apply"
                className="btn-primary mt-8 w-full justify-center bg-[#f7b733] text-[#003b73] hover:bg-white"
              >
                Start Full Application
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <ListChecks size={15} />
              How to Apply
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              Five simple steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative rounded-3xl border border-slate-100 bg-white p-6"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#003b73] text-white">
                    <Icon size={22} />
                  </div>
                  <p className="mt-4 text-xs font-black uppercase tracking-wide text-[#0070c9]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 font-black text-[#003b73]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-label">
              <FileCheck2 size={15} />
              Entry Requirements
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              What you will need.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Requirements vary by programme. The list below covers the general
              essentials. Specific programmes may request additional documents.
            </p>
          </div>

          <div className="space-y-4">
            {requirements.map((req) => (
              <div
                key={req}
                className="flex gap-3 rounded-2xl border border-slate-100 bg-[#f7fbff] p-5"
              >
                <FileCheck2
                  size={22}
                  className="mt-0.5 shrink-0 text-[#0070c9]"
                />
                <p className="text-sm font-bold leading-6 text-slate-700">
                  {req}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <span className="section-label">
              <HelpCircle size={15} />
              FAQs
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              Frequently asked questions.
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-100 bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4">
                  <span className="font-black text-[#003b73]">{faq.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e3f2ff] text-[#003b73] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003b73] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Have a question about admissions?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
            Our team is ready to guide you through the process and help you
            choose the right programme.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-primary bg-[#f7b733] text-[#003b73] hover:bg-white"
            >
              <Mail size={18} />
              Contact Admissions
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
