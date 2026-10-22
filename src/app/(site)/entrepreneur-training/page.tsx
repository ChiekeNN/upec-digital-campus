import Link from "next/link";
import {
  ArrowDownRight,
  Award,
  BriefcaseBusiness,
  ClipboardList,
  Handshake,
  Sparkles,
  Wrench,
} from "lucide-react";
import EntrepreneurTrainingSection from "@/components/EntrepreneurTrainingSection";

export const metadata = {
  title:
    "Entrepreneur Training Registration | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Register for hands-on Entrepreneur Training and Skills Acquisition at UPEC — Fashion & Designing, Shoe Making, Catering & Baking, Driving, Paint Production, Soap Making, AI & Coding, Hair Dressing & Styling, Welding & Fabrication, Perfume Production, Photography, Videography and more.",
};

const trainingHighlights = [
  {
    icon: Wrench,
    title: "12 Practical Skill Tracks",
    text: "Hands-on vocational, technical, industrial and ICT skills taught in UPEC labs.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Enterprise & Startup Support",
    text: "Business registration guidance, pricing, bookkeeping and business plan preparation.",
  },
  {
    icon: Handshake,
    title: "Mentorship & Microfinance",
    text: "Post-training incubation support and access to partner microfinance opportunities.",
  },
  {
    icon: Award,
    title: "UPEC Certification",
    text: "Recognized certificate of participation and completion from UNIPORT Entrepreneurial Centre.",
  },
];

export default function EntrepreneurTrainingPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
            <Sparkles size={15} className="text-[#f7b733]" />
            Entrepreneur Training & Skills Acquisition
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl">
            Transform practical skills into thriving enterprises.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Complete the official UPEC{" "}
            <strong className="text-white">
              Entrepreneur Training Registration Form
            </strong>{" "}
            below to enroll in hands-on vocational, technical, and digital
            entrepreneurship training programmes.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#register"
              className="btn-primary bg-[#f7b733] text-[#003b73] hover:bg-white"
            >
              <ClipboardList size={18} />
              Fill Registration Form
            </a>
            <a href="#tracks" className="btn-outline">
              Explore 12 Training Areas
              <ArrowDownRight size={18} />
            </a>
            <a href="#pricing" className="btn-outline">
              View Skill Pricing
              <ArrowDownRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS BAR */}
      <section className="border-b border-slate-100 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {trainingHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <Icon size={22} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-[#003b73]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE TRACKS + FULL REGISTRATION FORM */}
      <EntrepreneurTrainingSection />
    </main>
  );
}
