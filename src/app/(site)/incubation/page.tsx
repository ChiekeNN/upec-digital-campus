import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building2,
  Handshake,
  Lightbulb,
  LineChart,
  Presentation,
  Rocket,
  Target,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Incubation Hub | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Turn your idea into an enterprise. The UPEC Incubation Hub provides mentorship, startup support, accelerator programmes and pitch opportunities.",
};

const support = [
  {
    icon: Lightbulb,
    title: "Idea Validation",
    text: "Test and refine your business idea with expert guidance.",
  },
  {
    icon: Target,
    title: "Business Modelling",
    text: "Build a clear model, understand your customer and your market.",
  },
  {
    icon: Users,
    title: "Mentorship",
    text: "Connect with facilitators, experts and enterprise mentors.",
  },
  {
    icon: LineChart,
    title: "Growth Support",
    text: "Plan finances, operations and a path to sustainable growth.",
  },
  {
    icon: Presentation,
    title: "Pitch Preparation",
    text: "Prepare compelling pitches for partners and opportunities.",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    text: "Access networks, partners and pitch and demo-day platforms.",
  },
];

const steps = [
  {
    step: "01",
    title: "Submit Your Idea",
    text: "Tell us about your business or community solution through our application.",
  },
  {
    step: "02",
    title: "Selection & Review",
    text: "Our team reviews submissions and selects promising ventures for support.",
  },
  {
    step: "03",
    title: "Join a Cohort",
    text: "Take part in a structured accelerator cohort with mentorship and training.",
  },
  {
    step: "04",
    title: "Pitch & Grow",
    text: "Present at demo day, access opportunities and grow your enterprise.",
  },
];

export default function IncubationPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
              <BriefcaseBusiness size={15} className="text-[#f7b733]" />
              UPEC Incubation Hub
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.03] tracking-tight sm:text-6xl">
              Turn your idea into an enterprise.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              The UPEC Incubation Hub supports emerging entrepreneurs with
              mentorship, structured programmes, pitch opportunities and the
              tools to move from concept to sustainable venture.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-primary bg-[#f7b733] text-[#003b73] hover:bg-white"
              >
                Submit Your Idea
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Request Mentorship
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1633114127451-558041183c3b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Entrepreneurs collaborating on a startup idea"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003b73]/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* SUPPORT GRID */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <Rocket size={15} />
              How We Help
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              Support at every stage of your journey.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {support.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-100 bg-[#f7fbff] p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#003b73] text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-[#003b73]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <Target size={15} />
              The Process
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              From idea to demo day.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-100 bg-white p-7"
              >
                <p className="text-4xl font-black text-[#84c7ff]">
                  {item.step}
                </p>
                <h3 className="mt-4 text-lg font-black text-[#003b73]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCELERATOR BANNER */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#003b73] p-10 text-white sm:p-16">
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-blue-100">
                <Award size={15} className="text-[#f7b733]" />
                UPEC Startup Accelerator
              </span>
              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Join our next accelerator cohort.
              </h2>
              <p className="mt-5 text-base leading-8 text-blue-100">
                A structured programme for entrepreneurs ready to build. Get
                mentorship, business support, investor-readiness training and a
                place on our demo day.
              </p>
              <Link
                href="/contact"
                className="btn-primary mt-8 bg-[#f7b733] text-[#003b73] hover:bg-white"
              >
                Apply for Incubation
                <ArrowRight size={18} />
              </Link>
            </div>

            <Building2
              className="absolute -right-8 -bottom-8 text-white/5"
              size={220}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7fbff] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#003b73] sm:text-4xl">
            Are you a partner or sponsor?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Partner with UPEC to support innovation, sponsor a cohort or host a
            pitch opportunity. Together, we can build the next generation of
            enterprises.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Partner with UPEC
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
