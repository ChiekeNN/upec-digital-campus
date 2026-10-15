"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  FileText,
  Users,
  Settings,
  ShieldCheck,
  Wallet,
  Calendar,
  Mail,
  Building2,
  Database,
  Activity,
  Receipt,
  CreditCard,
} from "lucide-react";
import { PortalRole, roleLabel } from "@/lib/portal-roles";

type NavLink = { label: string; tab: string; icon: any };

const linksByRole: Record<PortalRole, NavLink[]> = {
  secretary: [
    { label: "Dashboard", tab: "overview", icon: LayoutDashboard },
    { label: "Correspondence", tab: "correspondence", icon: Mail },
    { label: "Appointments", tab: "appointments", icon: Calendar },
    { label: "Meeting Minutes", tab: "minutes", icon: FileText },
    { label: "Staff Directory", tab: "directory", icon: Users },
    { label: "Notifications", tab: "notifications", icon: Activity },
  ],
  administration: [
    { label: "Dashboard", tab: "overview", icon: LayoutDashboard },
    { label: "Staff Records", tab: "staff", icon: Users },
    { label: "Leave & Attendance", tab: "leave", icon: Calendar },
    { label: "Documents", tab: "documents", icon: FileText },
    { label: "Facilities", tab: "facilities", icon: Building2 },
    { label: "Reports", tab: "reports", icon: Activity },
  ],
  it: [
    { label: "Dashboard", tab: "overview", icon: LayoutDashboard },
    { label: "User Management", tab: "users", icon: Users },
    { label: "Content (CMS)", tab: "content", icon: FileText },
    { label: "Database & Backups", tab: "database", icon: Database },
    { label: "Security Logs", tab: "security", icon: ShieldCheck },
    { label: "Settings", tab: "settings", icon: Settings },
  ],
  finance: [
    { label: "Dashboard", tab: "overview", icon: LayoutDashboard },
    { label: "Invoices", tab: "invoices", icon: Receipt },
    { label: "Fee Payments", tab: "payments", icon: CreditCard },
    { label: "Payroll", tab: "payroll", icon: Wallet },
    { label: "Expenses", tab: "expenses", icon: FileText },
    { label: "Reconciliation", tab: "reconciliation", icon: Activity },
  ],
};

export default function PortalNav({
  role,
  name,
}: {
  role: PortalRole;
  name: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const links = linksByRole[role];

  async function handleLogout() {
    try {
      await fetch("/api/portal/logout", { method: "POST" });
    } finally {
      window.location.href = "/portal/login";
    }
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-[#003b73] hover:bg-blue-50"
          >
            <Menu size={20} />
          </button>
          <Image src="/icon-192.png" alt="UPEC" width={36} height={36} className="rounded-lg" />
          <div className="leading-tight">
            <p className="text-sm font-black text-[#003b73]">UPEC Portal</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {roleLabel(role)}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black/40" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <Image src="/icon-192.png" alt="UPEC" width={36} height={36} className="rounded-lg" />
            <div className="leading-tight">
              <p className="text-sm font-black text-[#003b73]">UPEC Portal</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {name}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {links.map((link) => {
            const Icon = link.icon;
            const href = `/portal/${role}?tab=${link.tab}`;
            const currentTab = searchParams?.get("tab") || "overview";
            const active = pathname === `/portal/${role}` && currentTab === link.tab;
            return (
              <Link
                key={link.label}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-[#003b73] text-white"
                    : "text-slate-600 hover:bg-blue-50 hover:text-[#003b73]"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
