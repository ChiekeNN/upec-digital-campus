"use client";

import {
  LayoutDashboard,
  Users,
  FileText,
  Database,
  ShieldCheck,
  Settings,
  Server,
  AlertTriangle,
  CheckCircle2,
  Activity,
} from "lucide-react";
import DepartmentDashboard, { Tab } from "@/components/DepartmentDashboard";

const stats = [
  { label: "Registered Users", value: 312, icon: Users, color: "bg-[#003b73]" },
  { label: "System Uptime", value: "99.9%", icon: Server, color: "bg-[#0070c9]" },
  { label: "Open Tickets", value: 6, icon: AlertTriangle, color: "bg-[#f7b733]" },
  { label: "Backups (30d)", value: 30, icon: Database, color: "bg-emerald-500" },
];

const users = [
  { name: "Dr. Henry Wobo", email: "director@upecuniport.com.ng", role: "Director", status: "Active" },
  { name: "Mrs. Gloria Chindah", email: "registrar@upecuniport.com.ng", role: "Registrar", status: "Active" },
  { name: "Mr. Chidi Okoro", email: "it@upecuniport.com.ng", role: "IT Admin", status: "Active" },
  { name: "Ms. Amaka Nwosu", email: "finance@upecuniport.com.ng", role: "Finance", status: "Active" },
  { name: "Student Account", email: "student01@upecuniport.com.ng", role: "Student", status: "Suspended" },
];

const content = [
  { page: "Home", lastEdited: "2026-10-14", by: "IT Admin", status: "Published" },
  { page: "About UPEC", lastEdited: "2026-10-10", by: "IT Admin", status: "Published" },
  { page: "Programmes", lastEdited: "2026-10-08", by: "Admin Officer", status: "Published" },
  { page: "News & Events", lastEdited: "2026-10-15", by: "IT Admin", status: "Draft" },
];

const backups = [
  { name: "db_backup_2026-10-15.sql", size: "42 MB", status: "Success" },
  { name: "db_backup_2026-10-14.sql", size: "41 MB", status: "Success" },
  { name: "db_backup_2026-10-13.sql", size: "41 MB", status: "Success" },
  { name: "media_backup_2026-10-12.zip", size: "128 MB", status: "Success" },
];

const logs = [
  { time: "2026-10-15 09:12", event: "Failed login attempt", user: "unknown", severity: "Warning" },
  { time: "2026-10-15 08:45", event: "User created: student02", user: "IT Admin", severity: "Info" },
  { time: "2026-10-14 17:30", event: "Database backup completed", user: "System", severity: "Info" },
  { time: "2026-10-14 12:00", event: "Content published: Home", user: "IT Admin", severity: "Info" },
];

const settings = [
  { key: "Site Name", value: "UPEC Digital Campus" },
  { key: "Domain", value: "upecuniport.com.ng" },
  { key: "Maintenance Mode", value: "Off" },
  { key: "Email Notifications", value: "Enabled" },
  { key: "Database", value: "PostgreSQL (Neon)" },
];

function StatCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.color} text-white`}>
              <Icon size={24} />
            </div>
            <p className="mt-5 text-3xl font-black text-[#003b73]">{s.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            {headers.map((h) => (
              <th key={h} className="pb-3 pr-4 font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-50 last:border-0">
              {r.map((c, j) => (
                <td key={j} className="py-3 pr-4 text-slate-700">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ItDashboard() {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      content: (
        <div className="space-y-6">
          <StatCards />
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#003b73]">System Health</h2>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Web Server", status: "Healthy" },
                { label: "Database (PostgreSQL)", status: "Healthy" },
                { label: "Email (SMTP)", status: "Healthy" },
                { label: "CDN / Assets", status: "Healthy" },
              ].map((s) => (
                <li key={s.label} className="flex items-center justify-between rounded-xl bg-[#f7fbff] px-4 py-3">
                  <span className="text-sm font-bold text-[#003b73]">{s.label}</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 size={14} /> {s.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      content: (
        <Table
          headers={["Name", "Email", "Role", "Status"]}
          rows={users.map((u) => [u.name, u.email, u.role, u.status])}
        />
      ),
    },
    {
      id: "content",
      label: "Content (CMS)",
      icon: FileText,
      content: (
        <Table
          headers={["Page", "Last Edited", "By", "Status"]}
          rows={content.map((c) => [c.page, c.lastEdited, c.by, c.status])}
        />
      ),
    },
    {
      id: "database",
      label: "Database & Backups",
      icon: Database,
      content: (
        <Table
          headers={["Backup", "Size", "Status"]}
          rows={backups.map((b) => [b.name, b.size, b.status])}
        />
      ),
    },
    {
      id: "security",
      label: "Security Logs",
      icon: ShieldCheck,
      content: (
        <Table
          headers={["Time", "Event", "User", "Severity"]}
          rows={logs.map((l) => [l.time, l.event, l.user, l.severity])}
        />
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      content: (
        <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <table className="w-full text-left text-sm">
            <tbody>
              {settings.map((s) => (
                <tr key={s.key} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4 font-bold text-[#003b73]">{s.key}</td>
                  <td className="py-3 text-slate-700">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  return (
    <DepartmentDashboard
      title="IT / Site Administrator Console"
      subtitle="Manage users, content, database, security and system settings."
      tabs={tabs}
    />
  );
}
