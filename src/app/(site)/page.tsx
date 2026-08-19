import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Lightbulb,
  MapPin,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";

import { events, programmes, successStories } from "@/data/site";

const impactStats = [
  { value: "10,000+", label: "Future-ready learners to serve" },
  { value: "500+", label: "Entrepreneurs to support yearly" },
  { value: "50+", label: "Industry & community partners" },
  { value: "1", label: "Connected UPEC digital campus" },
];

const benefits = [
  "Practical entrepreneurship and enterprise skills",
  "Flexible online, physical and hybrid learning",
  "Industry-focused facilitators and mentors",
  "Startup support, incubation and pitch opportunities",
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden bg-[#003b73] pb-20 pt-42 text-white sm:pb-28 sm:pt-48"
      >
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-blue-100 backdrop-blur">
              <Sparkles size={15} className="text-[#f7b733]" />
              Entrepreneurship • Innovation • Future Skills
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-[#84c7ff]">
              University of Port Harcourt
            </p>

            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
              Where ideas become{" "}
              <span className="text-[#84c7ff]">enterprises.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              UPEC equips students, entrepreneurs and communities with practical
              skills, business confidence and innovation opportunities for the
              future of work.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/programmes"
                className="btn-primary bg-white text-[#003b73] shadow-white/10 hover:bg-[#f7b733] hover:text-[#003b73]"
              >
                Explore Programmes
                <ArrowRight size={18} />
              </Link>

              <Link href="/incubation" className="btn-outline">
                Launch Your Idea
                <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-blue-100">
              <span className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-[#84c7ff]" />
                Skills that create value
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-[#84c7ff]" />
                Built for real-world impact
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
              <Image
                src="https://images.unsplash.com/photo-1653565685060-e15e492a7fda?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Young professionals collaborating during an entrepreneurship training session"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#003b73]/90 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#003b73]/85 p-5 backdrop-blur-md">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#84c7ff]">
                      UPEC Digital Campus
                    </p>
                    <p className="mt-2 text-xl font-extrabold">
                      Learn. Build. Launch.
                    </p>
                  </div>

                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#f7b733] text-[#003b73]">
                    <PlayCircle size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-100 px-5 sm:grid-cols-4 sm:px-8">
          {impactStats.map((stat) => (
            <div key={stat.label} className="px-5 py-8 sm:px-8">
              <p className="text-3xl font-black tracking-tight text-[#003b73]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1739292774739-ee38cd9a5735?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Students collaborating during a learning session"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#003b73]/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 text-[#003b73] shadow-lg backdrop-blur">
              <p className="text-sm font-black">
                UPEC is building a culture of enterprise.
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                From classroom ideas to community impact and scalable ventures.
              </p>
            </div>
          </div>

          <div>
            <span className="section-label">
              <Lightbulb size={15} />
              About UPEC
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#003b73] sm:text-5xl">
              Entrepreneurship education with real-world direction.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              The University of Port Harcourt Entrepreneurial Centre supports
              learners, staff, entrepreneurs and host communities with practical
              enterprise, innovation and future-work skills.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Our digital campus will make UPEC programmes easier to discover,
              access and complete—whether a learner is on campus, in Port
              Harcourt, elsewhere in Rivers State or beyond.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex gap-3 rounded-2xl border border-blue-100 bg-white p-4"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#0070c9]"
                  />
                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary mt-8">
              Learn More About UPEC
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section id="programmes" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="section-label">
                <GraduationCap size={15} />
                Explore Programmes
              </span>

              <h2 className="mt-5 text-4xl font-black tracking-tight text-[#003b73] sm:text-5xl">
                Learn skills that move ideas forward.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                Professional, vocational, executive and enterprise programmes
                designed for practical learning and measurable outcomes.
              </p>
            </div>

            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 font-bold text-[#003b73] transition hover:gap-3"
            >
              View all programmes
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {programmes.map((programme) => (
              <article
                key={programme.slug}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={programme.image}
                    alt={programme.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003b73]/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#003b73]">
                    {programme.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold leading-6 text-[#003b73]">
                    {programme.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {programme.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold text-slate-500">
                      {programme.duration}
                    </span>
                    <span className="text-sm font-black text-[#003b73]">
                      {programme.fee}
                    </span>
                  </div>

                  <Link
                    href={`/programmes/${programme.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#0070c9] hover:text-[#003b73]"
                  >
                    View programme
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-xs leading-5 text-slate-400">
            Programme titles, durations and fees displayed here are editable
            sample content pending official UPEC approval.
          </p>
        </div>
      </section>

      {/* LEARN ONLINE */}
      <section
        id="learn"
        className="overflow-hidden bg-[#003b73] py-20 text-white sm:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-100">
              <BookOpen size={15} />
              Learn Online with UPEC
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Your UPEC classroom, wherever you are.
            </h2>

            <p className="mt-6 text-base leading-8 text-blue-100">
              The UPEC Moodle Learning Management System will give learners
              access to videos, notes, quizzes, assignments, feedback,
              certificates and live-class links through one unified UPEC
              platform.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Access courses through upec.uniport.edu.ng/learn",
                "Learn on mobile phone, tablet or computer",
                "Track progress, deadlines, grades and certificates",
                "Join a structured learning community",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="shrink-0 text-[#84c7ff]" />
                  <p className="text-sm font-semibold text-blue-50">{item}</p>
                </div>
              ))}
            </div>

            <Link
              href="/admissions"
              className="btn-primary mt-9 bg-[#f7b733] text-[#003b73] hover:bg-white"
            >
              Get Ready to Learn
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-[1.45rem] bg-[#f7fbff] p-5 text-slate-800 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0070c9]">
                    Learner Dashboard Preview
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-[#003b73]">
                    Good morning, Ada.
                  </h3>
                </div>

                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#e8f4ff] text-[#003b73]">
                  <GraduationCap size={24} />
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-[#003b73] p-5 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Digital Entrepreneurship</p>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-xs font-bold text-blue-100">
                    Active
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[68%] rounded-full bg-[#84c7ff]" />
                </div>

                <div className="mt-3 flex justify-between text-xs text-blue-100">
                  <span>68% complete</span>
                  <span>Next class: Thursday</span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Upcoming Task
                  </p>
                  <p className="mt-2 text-sm font-extrabold text-[#003b73]">
                    Submit Business Model Canvas
                  </p>
                  <p className="mt-2 text-xs font-semibold text-[#0070c9]">
                    Due in 3 days
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Certificate Status
                  </p>
                  <p className="mt-2 text-sm font-extrabold text-[#003b73]">
                    Complete 2 more modules
                  </p>
                  <p className="mt-2 text-xs font-semibold text-emerald-600">
                    You are on track
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INCUBATION */}
      <section id="incubation" className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-label">
              <BriefcaseBusiness size={15} />
              UPEC Incubation Hub
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#003b73] sm:text-5xl">
              Have an idea worth building?
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              UPEC supports emerging entrepreneurs with practical business
              tools, mentorship, incubation opportunities, pitch preparation and
              connections that can move an idea from concept to enterprise.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Lightbulb,
                  title: "Submit Your Idea",
                  text: "Share an innovative business or community solution.",
                },
                {
                  icon: Users,
                  title: "Access Mentorship",
                  text: "Connect with facilitators, experts and enterprise mentors.",
                },
                {
                  icon: Building2,
                  title: "Join Incubation",
                  text: "Apply for structured startup support and accelerator cohorts.",
                },
                {
                  icon: Handshake,
                  title: "Pitch & Partner",
                  text: "Prepare for pitch opportunities, partners and growth.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-[#f7fbff] p-5"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 font-extrabold text-[#003b73]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <Link href="/incubation" className="btn-primary mt-8">
              Explore the Incubation Hub
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#003b73]">
            <Image
              src="https://images.unsplash.com/photo-1653565685009-8ccebd8ecec1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Entrepreneurs discussing ideas in a collaborative workspace"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#003b73] via-[#003b73]/25 to-transparent" />

            <div className="absolute bottom-7 left-7 right-7 rounded-3xl border border-white/15 bg-[#003b73]/85 p-6 text-white backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#84c7ff]">
                UPEC Startup Accelerator
              </p>
              <h3 className="mt-3 text-2xl font-black">
                Turn your business idea into a structured venture.
              </h3>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                Build your model, understand your customer, prepare your pitch
                and access meaningful support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="bg-[#f7fbff] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="section-label">
              <CalendarDays size={15} />
              News & Events
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#003b73] sm:text-5xl">
              Connect, learn and grow with UPEC.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Discover entrepreneurship workshops, innovation events, startup
              calls, community programmes and learning opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.title}
                className="group rounded-3xl border border-blue-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
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

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {event.description}
                </p>

                <Link
                  href="/events"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0070c9] group-hover:text-[#003b73]"
                >
                  Register interest
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <span className="section-label">
              <Sparkles size={15} />
              UPEC Impact Stories
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#003b73] sm:text-5xl">
              Building people who build value.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {successStories.map((story) => (
              <figure
                key={story.name}
                className="rounded-3xl border border-slate-100 bg-[#f7fbff] p-7"
              >
                <div className="text-5xl font-black text-[#84c7ff]">“</div>
                <blockquote className="mt-2 text-base font-semibold leading-8 text-slate-700">
                  {story.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-blue-100 pt-5">
                  <p className="font-black text-[#003b73]">{story.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{story.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY CTA */}
      <section id="apply" className="bg-[#003b73] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-blue-100">
            <MapPin size={15} />
            Abuja Park, UNIPORT Choba
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Your next opportunity can start here.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
            Explore UPEC programmes, prepare for upcoming applications, grow
            your skills and turn your ideas into meaningful enterprise.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-primary bg-[#f7b733] text-[#003b73] hover:bg-white"
            >
              Contact UPEC
              <ArrowUpRight size={18} />
            </Link>

            <Link href="/programmes" className="btn-outline">
              Explore Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
