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
import CrudManager from "@/components/CrudManager";
import { BarChart, DonutChart } from "@/components/Charts";

const stats = [
  { label: "Registered Users", value: 312, icon: Users, color: "bg-[#003b73]" },
  { label: "System Uptime", value: "99.9%", icon: Server, color: "bg-[#0070c9]" },
  { label: "Open Tickets", value: 6, icon: AlertTriangle, color: "bg-[#f7b733]" },
  { label: "Backups (30d)", value: 30, icon: Database, color: "bg-emerald-500" },
];

const usersInitial = [
  { id: 1, name: "Dr. Henry Wobo", email: "director@upecuniport.com.ng", role: "Director", status: "Active" },
  { id: 2, name: "Mrs. Gloria Chindah", email: "registrar@upecuniport.com.ng", role: "Registrar", status: "Active" },
  { id: 3, name: "Mr. Chidi Okoro", email: "it@upecuniport.com.ng", role: "IT Admin", status: "Active" },
  { id: 4, name: "Ms. Amaka Nwosu", email: "finance@upecuniport.com.ng", role: "Finance", status: "Active" },
  { id: 5, name: "Student Account", email: "student01@upecuniport.com.ng", role: "Student", status: "Suspended" },
];

const contentInitial = [
  { id: 1, page: "Home", lastEdited: "2026-10-14", by: "IT Admin", status: "Published" },
  { id: 2, page: "About UPEC", lastEdited: "2026-10-10", by: "IT Admin", status: "Published" },
  { id: 3, page: "Programmes", lastEdited: "2026-10-08", by: "Admin Officer", status: "Published" },
  { id: 4, page: "News & Events", lastEdited: "2026-10-15", by: "IT Admin", status: "Draft" },
];

const backupsInitial = [
  { id: 1, name: "db_backup_2026-10-15.sql", size: "42 MB", status: "Success" },
  { id: 2, name: "db_backup_2026-10-14.sql", size: "41 MB", status: "Success" },
  { id: 3, name: "db_backup_2026-10-13.sql", size: "41 MB", status: "Success" },
  { id: 4, name: "media_backup_2026-10-12.zip", size: "128 MB", status: "Success" },
];

const logsInitial = [
  { id: 1, time: "2026-10-15 09:12", event: "Failed login attempt", user: "unknown", severity: "Warning" },
  { id: 2, time: "2026-10-15 08:45", event: "User created: student02", user: "IT Admin", severity: "Info" },
  { id: 3, time: "2026-10-14 17:30", event: "Database backup completed", user: "System", severity: "Info" },
  { id: 4, time: "2026-10-14 12:00", event: "Content published: Home", user: "IT Admin", severity: "Info" },
];

const settingsInitial = [
  { id: 1, key: "Site Name", value: "UPEC Digital Campus" },
  { id: 2, key: "Domain", value: "upecuniport.com.ng" },
  { id: 3, key: "Maintenance Mode", value: "Off" },
  { id: 4, key: "Email Notifications", value: "Enabled" },
  { id: 5, key: "Database", value: "PostgreSQL (Neon)" },
];

export default function ItDashboard() {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      content: (
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${s.color} opacity-10 transition group-hover:scale-125`} />
                  <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.color} text-white shadow-md`}>
                    <Icon size={24} />
                  </div>
                  <p className="mt-5 text-3xl font-black text-[#003b73]">{s.value}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{s.label}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#003b73]">System Health</h2>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Web Server", status: "Healthy" },
                { label: "Database (PostgreSQL)", status: "Healthy" },
                { label: "Email (SMTP)", status: "Healthy" },
                { label: "CDN / Assets", status: "Healthy" },
              ].map((s) => (
                <li key={s.label} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
                  <span className="text-sm font-bold text-[#003b73]">{s.label}</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 size={14} /> {s.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <DonutChart
              title="Users by Status"
              data={[
                { label: "Active", value: 4, color: "#10b981" },
                { label: "Suspended", value: 1, color: "#ef4444" },
              ]}
              centerLabel="5"
            />
            <BarChart
              title="Content Status"
              data={[
                { label: "Published", value: 3, color: "#10b981" },
                { label: "Draft", value: 1, color: "#f7b733" },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      content: (
        <CrudManager
          title="User Management"
          subtitle="Manage portal and system users."
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email", type: "email" },
            { key: "role", label: "Role", type: "select", options: ["Director", "Registrar", "IT Admin", "Finance", "Admin Officer", "Student"] },
            { key: "status", label: "Status", type: "select", options: ["Active", "Suspended", "Disabled"] },
          ]}
          initialRows={usersInitial}
          storageKey="upec_it_users"
          accent="from-[#003b73] to-[#0070c9]"
          addLabel="Add User"
        />
      ),
    },
    {
      id: "content",
      label: "Content (CMS)",
      icon: FileText,
      content: (
        <CrudManager
          title="Content Management"
          subtitle="Track and edit website pages."
          columns={[
            { key: "page", label: "Page" },
            { key: "lastEdited", label: "Last Edited", type: "date" },
            { key: "by", label: "Edited By" },
            { key: "status", label: "Status", type: "select", options: ["Published", "Draft", "Archived"] },
          ]}
          initialRows={contentInitial}
          storageKey="upec_it_content"
          accent="from-[#0070c9] to-[#84c7ff]"
          addLabel="New Page"
        />
      ),
    },
    {
      id: "database",
      label: "Database & Backups",
      icon: Database,
      content: (
        <CrudManager
          title="Backups"
          subtitle="Database and media backups."
          columns={[
            { key: "name", label: "Backup File" },
            { key: "size", label: "Size" },
            { key: "status", label: "Status", type: "select", options: ["Success", "Failed", "In Progress"] },
          ]}
          initialRows={backupsInitial}
          storageKey="upec_it_backups"
          accent="from-[#f7b733] to-[#f59e0b]"
          addLabel="Run Backup"
        />
      ),
    },
    {
      id: "security",
      label: "Security Logs",
      icon: ShieldCheck,
      content: (
        <CrudManager
          title="Security Logs"
          subtitle="Authentication and security events."
          columns={[
            { key: "time", label: "Time" },
            { key: "event", label: "Event" },
            { key: "user", label: "User" },
            { key: "severity", label: "Severity", type: "select", options: ["Info", "Warning", "Error", "Critical"] },
          ]}
          initialRows={logsInitial}
          storageKey="upec_it_logs"
          accent="from-red-500 to-rose-500"
          addLabel="Log Entry"
        />
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      content: (
        <CrudManager
          title="System Settings"
          subtitle="Configure site-wide settings."
          columns={[
            { key: "key", label: "Setting" },
            { key: "value", label: "Value" },
          ]}
          initialRows={settingsInitial}
          storageKey="upec_it_settings"
          accent="from-purple-500 to-indigo-500"
          addLabel="Add Setting"
        />
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
