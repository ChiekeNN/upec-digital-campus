"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { siteConfig, navigation } from "@/data/site";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/10 bg-[#00284f]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs sm:px-8">
          <p className="hidden text-blue-100 sm:block">
            {siteConfig.university} · Entrepreneurship, Innovation & Enterprise
            Development
          </p>

          <a
            href={`mailto:${siteConfig.email}`}
            className="ml-auto text-blue-100 transition hover:text-white"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>

      <nav className="border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#003b73] text-sm font-black tracking-tight text-white shadow-lg shadow-blue-900/20">
              U
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-tight text-[#003b73]">
                {siteConfig.shortName}
              </p>
              <p className="max-w-44 text-[10px] font-semibold uppercase leading-tight tracking-[0.13em] text-slate-500">
                UNIPORT Entrepreneurial Centre
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "text-[#003b73]"
                    : "text-slate-600 hover:text-[#003b73]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link href="/apply" className="btn-primary">
              Apply Now
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-[#003b73] lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-xl lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isActive(item.href)
                      ? "bg-blue-50 text-[#003b73]"
                      : "text-slate-700 hover:bg-blue-50 hover:text-[#003b73]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/apply"
                onClick={closeMenu}
                className="btn-primary mt-3 justify-center"
              >
                Start Your Application
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
