import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  Eye,
  Handshake,
  Lightbulb,
  MapPin,
  Rocket,
  Target,
  Users,
} from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "About UPEC | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Learn about the mandate, mission, leadership and impact of the University of Port Harcourt Entrepreneurial Centre.",
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "We encourage creative thinking and practical problem-solving that creates real value.",
  },
  {
    icon: Handshake,
    title: "Enterprise",
    text: "We build the confidence and skills needed to start and grow sustainable ventures.",
  },
  {
    icon: Users,
    title: "Community",
    text: "We serve students, staff, entrepreneurs and host communities across Rivers State.",
  },
  {
    icon: Rocket,
    title: "Impact",
    text: "We focus on measurable outcomes—skills gained, ventures launched and lives changed.",
  },
];

const mandate = [
  "Equip students with entrepreneurship and 21st-century work skills",
  "Support staff with enterprise and innovation capacity",
  "Empower host communities with practical skills-acquisition programmes",
  "Incubate startups and support emerging entrepreneurs",
  "Deliver professional, vocational and executive training",
  "Build partnerships that expand opportunity and impact",
];

const leadership = [
  {
    name: "Dr Henry O. Wobo, B.Sc, M.Sc, ACA, ACTI, PhD",
    role: "Director",
    image: "/director.jpeg",
    note: "University of Port Harcourt Entrepreneurial Centre",
  },
  {
    name: "Deputy Director",
    role: "Deputy Director, UPEC",
    image: "",
    note: "To be updated by UPEC",
  },
  {
    name: "Programme Coordinator",
    role: "Academic & Programmes",
    image: "",
    note: "To be updated by UPEC",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
            <Compass size={15} className="text-[#f7b733]" />
            About UPEC
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            Building a culture of enterprise at the University of Port Harcourt.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            The University of Port Harcourt Entrepreneurial Centre (UPEC) equips
            students, staff, entrepreneurs and host communities with practical
            entrepreneurship, innovation and future-work skills.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85"
              alt="Team collaborating during an entrepreneurship session"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003b73]/75 via-transparent to-transparent" />
          </div>

          <div>
            <span className="section-label">
              <Lightbulb size={15} />
              Who We Are
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#003b73] sm:text-4xl">
              Entrepreneurship education with real-world direction.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              UPEC is the entrepreneurship and innovation hub of the University
              of Port Harcourt. We exist to help people turn knowledge into
              practical skill, ideas into enterprises, and opportunity into
              impact.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Through structured training, business incubation and community
              outreach, we prepare learners for the realities of the modern
              economy—whether they aim to build a business, advance a career or
              strengthen their community.
            </p>

            <Link href="/programmes" className="btn-primary mt-8">
              Explore Our Programmes
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-blue-100 bg-[#f7fbff] p-8 sm:p-10">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#003b73] text-white">
              <Target size={24} />
            </div>
            <h3 className="mt-6 text-2xl font-black text-[#003b73]">
              Our Mission
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              To equip students, staff, entrepreneurs and host communities with
              practical entrepreneurship, innovation and 21st-century work
              skills that create value and drive sustainable enterprise.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-[#f7fbff] p-8 sm:p-10">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#003b73] text-white">
              <Eye size={24} />
            </div>
            <h3 className="mt-6 text-2xl font-black text-[#003b73]">
              Our Vision
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              To be a leading centre for entrepreneurship education, business
              incubation and community empowerment—recognised for producing
              confident innovators and job creators.
            </p>
          </div>
        </div>
      </section>

      {/* MANDATE */}
      <section className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <Building2 size={15} />
              Our Mandate
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              What UPEC is here to do.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {mandate.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-5"
              >
                <CheckCircle2
                  size={22}
                  className="mt-0.5 shrink-0 text-[#0070c9]"
                />
                <p className="text-sm font-bold leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <Rocket size={15} />
              Our Values
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              The principles that guide us.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-3xl border border-slate-100 bg-[#f7fbff] p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-[#003b73]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <Users size={15} />
              Leadership
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
              The people behind UPEC.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Meet the leadership driving entrepreneurship and innovation at
              UPEC.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <div
                key={person.role}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {person.image ? (
                  <div className="relative aspect-square w-full overflow-hidden border-b-4 border-[#003b73] bg-[#e3f2ff]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="grid aspect-square w-full place-items-center border-b-4 border-[#003b73] bg-[#e3f2ff] text-6xl font-black text-[#003b73]">
                    {person.name.charAt(0)}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-base font-black leading-6 text-[#003b73]">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-[#0070c9]">
                    {person.role}
                  </p>
                  {person.note && (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {person.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION CTA */}
      <section className="bg-[#003b73] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-blue-100">
            <MapPin size={15} />
            Visit Us
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Find UPEC on the UNIPORT campus.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
            {siteConfig.address}
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
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
