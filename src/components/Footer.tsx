import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";


export default function Footer() {
  return (
    <footer id="contact" className="bg-[#00284f] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/uniport-logo.png"
                alt="UNIPORT UPEC Logo"
                className="h-11 w-11 object-contain"
              />

              <div>
                <p className="font-bold">{siteConfig.shortName}</p>
                <p className="text-xs text-blue-200">
                  University of Port Harcourt Entrepreneurial Centre
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-blue-100">
              Building practical entrepreneurship, innovation and future-work
              skills for students, entrepreneurs and communities.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-blue-100">
              <li>
                <Link href="/about" className="hover:text-white">
                  About UPEC
                </Link>
              </li>
              <li>
                <Link href="/programmes" className="hover:text-white">
                  Programmes
                </Link>
              </li>
              <li>
                <Link
                  href="/entrepreneur-training"
                  className="font-semibold text-[#f7b733] hover:text-white"
                >
                  Entrepreneur Training
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-white">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/incubation" className="hover:text-white">
                  Incubation Hub
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Entrepreneur Training
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-blue-100">
              <li>
                <Link
                  href="/entrepreneur-training#register"
                  className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#f7b733]"
                >
                  Registration Form
                  <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link
                  href="/entrepreneur-training#tracks"
                  className="hover:text-white"
                >
                  Fashion, Shoe Making & Hair Dressing
                </Link>
              </li>
              <li>
                <Link
                  href="/entrepreneur-training#tracks"
                  className="hover:text-white"
                >
                  Catering, Soap & Perfume Production
                </Link>
              </li>
              <li>
                <Link
                  href="/entrepreneur-training#tracks"
                  className="hover:text-white"
                >
                  ICT, Paint Production, Welding & Driving
                </Link>
              </li>
              <li>
                <Link
                  href="/entrepreneur-training#register"
                  className="hover:text-white"
                >
                  Post-Training & Incubation Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Contact UPEC
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-6 text-blue-100">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex gap-3 hover:text-white"
              >
                <Phone size={18} className="mt-1 shrink-0 text-[#84c7ff]" />
                <span>{siteConfig.phone}</span>
              </a>

              <div className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-[#84c7ff]" />
                <span>{siteConfig.address}</span>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-blue-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <a href="#privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
