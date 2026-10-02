"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  Compass,
  Handshake,
  Layers,
  MapPin,
  Phone,
  Sparkles,
  Wrench,
} from "lucide-react";
import EntrepreneurTrainingForm from "@/components/EntrepreneurTrainingForm";
import { entrepreneurTrainingTracks, siteConfig } from "@/data/site";

const pathwaySteps = [
  {
    step: "01",
    title: "Registration & Orientation",
    text: "Complete the online form, upload your passport photograph, and select your preferred vocational or digital training track.",
  },
  {
    step: "02",
    title: "Hands-On Practical Sessions",
    text: "Learn directly from industry master-trainers and facilitators inside UPEC's specialised workshops and Fashion/Innovation Hubs.",
  },
  {
    step: "03",
    title: "Enterprise & Financial Literacy",
    text: "Combine technical skills with pricing, bookkeeping, branding, customer acquisition, and business plan preparation.",
  },
  {
    step: "04",
    title: "Graduation & Post-Training Support",
    text: "Receive your UPEC certificate alongside ongoing incubation, mentorship, and linkage to microfinance opportunities.",
  },
];

export default function EntrepreneurTrainingSection() {
  const [selectedTrack, setSelectedTrack] = useState<string | undefined>(
    undefined,
  );

  function handleSelectTrack(trackName: string) {
    setSelectedTrack(trackName);
    const el = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {/* INTERACTIVE TRAINING TRACKS */}
      <section id="tracks" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="section-label">
                <Wrench size={14} />
                10+ Practical Skill Areas
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#003b73] sm:text-4xl">
                Areas of Training Interest
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Click any training track below to automatically add it to your
                registration form, or select multiple tracks directly in Section
                D of the form.
              </p>
            </div>
            <a
              href="#register"
              className="btn-primary self-start lg:self-auto"
            >
              Jump to Registration Form
              <ArrowDownRight size={17} />
            </a>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {entrepreneurTrainingTracks.map((track) => {
              const isSelected = selectedTrack === track.name;
              return (
                <div
                  key={track.name}
                  className={`group flex flex-col justify-between rounded-3xl border p-6 transition duration-200 ${
                    isSelected
                      ? "border-[#003b73] bg-[#f0f7ff] shadow-md"
                      : "border-slate-200/80 bg-[#f7fbff] hover:-translate-y-1 hover:border-[#0070c9] hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div>
                    <span className="inline-block rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#0070c9] shadow-2xs">
                      {track.category}
                    </span>
                    <h3 className="mt-4 text-base font-black text-[#003b73]">
                      {track.name}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {track.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectTrack(track.name)}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-[#003b73] transition group-hover:text-[#0070c9]"
                  >
                    <CheckCircle2 size={15} className="text-[#0070c9]" />
                    Select & Register →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM + SIDEBAR */}
      <section id="register" className="bg-[#f7fbff] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* FORM CARD */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
            <EntrepreneurTrainingForm preselectedTrack={selectedTrack} />
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* UPEC TRAINING PATHWAY */}
            <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-xs sm:p-8">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <Compass size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#003b73]">
                    Your Training Journey
                  </h3>
                  <p className="text-xs text-slate-500">
                    From enrolment to enterprise launch
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {pathwaySteps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#003b73] text-xs font-black text-[#f7b733]">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-black text-[#003b73]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM SECTIONS OVERVIEW */}
            <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xs sm:p-8">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#003b73]">
                    Registration Form Checklist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sections A – G overview
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2">
                  <BadgeCheck size={16} className="shrink-0 text-[#0070c9]" />
                  <span>
                    <strong className="text-[#003b73]">Passport & Header:</strong>{" "}
                    Passport Photo, Programme/Organisation, Title, Date & Venue
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={16} className="shrink-0 text-[#0070c9]" />
                  <span>
                    <strong className="text-[#003b73]">Section A:</strong>{" "}
                    Personal Information (Name, Gender, DOB, Phone, Email, State,
                    Address, LGA)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={16} className="shrink-0 text-[#0070c9]" />
                  <span>
                    <strong className="text-[#003b73]">Section B:</strong>{" "}
                    Educational & Professional Background
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={16} className="shrink-0 text-[#0070c9]" />
                  <span>
                    <strong className="text-[#003b73]">Section C:</strong>{" "}
                    Entrepreneurship & Business Information
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={16} className="shrink-0 text-[#0070c9]" />
                  <span>
                    <strong className="text-[#003b73]">Section D:</strong> Areas
                    of Training Interest (10+ Skills)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={16} className="shrink-0 text-[#0070c9]" />
                  <span>
                    <strong className="text-[#003b73]">Section E:</strong>{" "}
                    Training Expectations & Post-Training Support
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={16} className="shrink-0 text-[#0070c9]" />
                  <span>
                    <strong className="text-[#003b73]">Section F & G:</strong>{" "}
                    Emergency Contact & Official Declaration
                  </span>
                </li>
              </ul>
            </div>

            {/* SUPPORT CARD */}
            <div className="rounded-3xl bg-[#003b73] p-7 text-white sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f7b733]">
                <Sparkles size={13} />
                UPEC Training Desk
              </span>
              <h3 className="mt-4 text-lg font-black">
                Partnering Organisations & Group Cohorts
              </h3>
              <p className="mt-2 text-xs leading-6 text-blue-100">
                Registering under a special cohort (such as GES 400.2 Practical
                Projects, RIWUT Women Empowerment, OPay Hub, or corporate
                capacity building)? Indicate your organisation at the top of the
                form.
              </p>

              <div className="mt-5 space-y-2.5 border-t border-white/15 pt-4 text-xs text-blue-100">
                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-[#f7b733]" />
                  <span>{siteConfig.phone}</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[#f7b733]" />
                  <span>{siteConfig.address}</span>
                </p>
              </div>

              <Link
                href="/contact"
                className="btn-primary mt-6 w-full justify-center bg-[#f7b733] text-[#003b73] hover:bg-white"
              >
                Contact Training Coordinator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
