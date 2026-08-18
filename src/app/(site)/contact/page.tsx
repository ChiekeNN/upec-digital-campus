import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact UPEC | University of Port Harcourt Entrepreneurial Centre",
  description:
    "Get in touch with the University of Port Harcourt Entrepreneurial Centre. Find our location, contact details and enquiry form.",
};

const contactCards = [
  {
    icon: Mail,
    label: "Email Us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with UPEC",
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#003b73] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
            <Mail size={15} className="text-[#f7b733]" />
            Contact UPEC
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            We would love to hear from you.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Whether you have a question about programmes, admissions, incubation
            or partnerships, our team is ready to help.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                href={card.href}
                className="group rounded-3xl border border-slate-100 bg-[#f7fbff] p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#003b73] text-white">
                  <Icon size={24} />
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-wide text-slate-400">
                  {card.label}
                </p>
                <p className="mt-2 font-extrabold text-[#003b73] group-hover:text-[#0070c9]">
                  {card.value}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="bg-[#f7fbff] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* FORM */}
          <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="text-2xl font-black text-[#003b73]">
              Send us a message
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Fill in the form below and a member of the UPEC team will get back
              to you.
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-7 sm:p-8">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-black text-[#003b73]">Our Location</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {siteConfig.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-7 sm:p-8">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e3f2ff] text-[#003b73]">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-black text-[#003b73]">Office Hours</h3>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
                    <p>Saturday: 10:00 AM – 2:00 PM</p>
                    <p>Sunday & Public Holidays: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
              <iframe
                title="UPEC Location Map"
                src="https://www.google.com/maps?q=University+of+Port+Harcourt+Choba&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003b73] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Ready to take the next step?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
            Explore our programmes or start your application to join the UPEC
            community of learners and entrepreneurs.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/admissions"
              className="btn-primary bg-[#f7b733] text-[#003b73] hover:bg-white"
            >
              Apply Now
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
