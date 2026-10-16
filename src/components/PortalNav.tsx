"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Eye,
  EyeOff,
  LogOut,
  KeyRound,
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
  const [pwOpen, setPwOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwStatus, setPwStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [pwError, setPwError] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const links = linksByRole[role];

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwStatus("loading");
    setPwError("");
    try {
      const res = await fetch("/api/portal/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setPwStatus("success");
        setCurrentPw("");
        setNewPw("");
        setTimeout(() => {
          setPwOpen(false);
          setPwStatus("idle");
        }, 1500);
      } else {
        setPwStatus("error");
        setPwError(result.error || "Failed to change password.");
      }
    } catch {
      setPwStatus("error");
      setPwError("Could not reach the server.");
    }
  }

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
            aria-label="Open menu" data-tooltip="Menu"
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPwOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-[#003b73] hover:bg-blue-100"
            data-tooltip="Change password"
          >
            <KeyRound size={16} />
            <span className="hidden sm:inline">Password</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
            data-tooltip="Logout"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
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
            aria-label="Close menu" data-tooltip="Close"
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
      {pwOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#003b73]">Change Password</h3>
              <button
                onClick={() => { setPwOpen(false); setPwStatus("idle"); setPwError(""); }}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
              <div>
                <label className="form-label">Current Password</label>
                <div className="flex items-center gap-2 rounded-xl border border-[#dbe4ef] bg-[#f8fafc] px-3 focus-within:border-[#003b73] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003b73]/20">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    required
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    className="w-full bg-transparent py-3 text-sm text-[#122033] outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    aria-label={showCurrentPw ? "Hide password" : "Show password"}
                    className="shrink-0 text-slate-400 transition hover:text-[#003b73]"
                  >
                    {showCurrentPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="form-label">New Password</label>
                <div className="flex items-center gap-2 rounded-xl border border-[#dbe4ef] bg-[#f8fafc] px-3 focus-within:border-[#003b73] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003b73]/20">
                  <input
                    type={showNewPw ? "text" : "password"}
                    required
                    minLength={6}
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="w-full bg-transparent py-3 text-sm text-[#122033] outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    aria-label={showNewPw ? "Hide password" : "Show password"}
                    className="shrink-0 text-slate-400 transition hover:text-[#003b73]"
                  >
                    {showNewPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {pwStatus === "error" && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{pwError}</p>
              )}
              {pwStatus === "success" && (
                <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Password changed successfully.</p>
              )}
              <button
                type="submit"
                disabled={pwStatus === "loading"}
                className="btn-primary w-full justify-center disabled:opacity-70"
              >
                {pwStatus === "loading" ? "Saving..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
