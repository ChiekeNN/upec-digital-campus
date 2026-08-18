import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}

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
                <a href="#about" className="hover:text-white">
                  About UPEC
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-white">
                  Programmes
                </a>
              </li>
              <li>
                <a href="#learn" className="hover:text-white">
                  Learn Online
                </a>
              </li>
              <li>
                <a href="#incubation" className="hover:text-white">
                  Incubation Hub
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-white">
                  News & Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Future Portal
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-blue-100">
              <li>Online Applications</li>
              <li>Payments & Receipts</li>
              <li>Student Dashboard</li>
              <li>Moodle LMS</li>
              <li>Certificates</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Contact UPEC
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-6 text-blue-100">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex gap-3 hover:text-white"
              >
                <Mail size={18} className="mt-1 shrink-0 text-[#84c7ff]" />
                <span>{siteConfig.email}</span>
              </a>

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

            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                aria-label="Facebook"
                className="social-icon"
              >
                <FacebookIcon />
              </a>
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                className="social-icon"
              >
                <InstagramIcon />
              </a>
              <a
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                className="social-icon"
              >
                <LinkedinIcon />
              </a>
              <a
                href={siteConfig.social.youtube}
                aria-label="YouTube"
                className="social-icon"
              >
                <YoutubeIcon />
              </a>
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
