"use client";

import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Building2,
  Activity,
  CheckCircle2,
  Clock,
} from "lucide-react";
import DepartmentDashboard, { Tab } from "@/components/DepartmentDashboard";

const stats = [
  { label: "Total Staff", value: 64, icon: Users, color: "bg-[#003b73]" },
  { label: "On Leave", value: 7, icon: Calendar, color: "bg-[#0070c9]" },
  { label: "Pending Requests", value: 14, icon: FileText, color: "bg-[#f7b733]" },
  { label: "Facilities Issues", value: 3, icon: Building2, color: "bg-emerald-500" },
];

const staff = [
  { name: "Dr. Henry Wobo", role: "Acting Director", status: "Active" },
  { name: "Mrs. Gloria Chindah", role: "Registrar", status: "Active" },
  { name: "Mr. Chidi Okoro", role: "IT Officer", status: "On Leave" },
  { name: "Ms. Amaka Nwosu", role: "Finance Officer", status: "Active" },
  { name: "Mr. Tunde Bakare", role: "Admin Officer", status: "Active" },
];

const leave = [
  { name: "Mr. Chidi Okoro", type: "Annual Leave", from: "2026-10-10", to: "2026-10-20", status: "Approved" },
  { name: "Ms. Ngozi Eze", type: "Sick Leave", from: "2026-10-14", to: "2026-10-16", status: "Pending" },
  { name: "Mr. Tunde Bakare", type: "Casual Leave", from: "2026-10-22", to: "2026-10-23", status: "Pending" },
];

const docs = [
  { title: "Staff Handbook 2026", category: "Policy", updated: "2026-09-01" },
  { title: "Procurement Guidelines", category: "Procurement", updated: "2026-08-15" },
  { title: "Leave Policy", category: "HR", updated: "2026-07-20" },
  { title: "Facilities Maintenance Log", category: "Facilities", updated: "2026-10-05" },
];

const facilities = [
  { item: "Lecture Hall A", issue: "Projector not working", priority: "High", status: "Open" },
  { item: "Admin Block Generator", issue: "Servicing due", priority: "Medium", status: "Scheduled" },
  { item: "Fashion Hub", issue: "AC repair", priority: "Low", status: "Resolved" },
];

const reports = [
  { title: "Monthly Staff Report — Sep 2026", status: "Submitted" },
  { title: "Quarterly HR Summary — Q3 2026", status: "Draft" },
  { title: "Facilities Audit — Sep 2026", status: "Submitted" },
];

function StatCards() {
  const statsLocal = [
    { label: "Total Staff", value: 64, icon: Users, color: "bg-[#003b73]" },
    { label: "On Leave", value: 7, icon: Calendar, color: "bg-[#0070c9]" },
    { label: "Pending Requests", value: 14, icon: FileText, color: "bg-[#f7b733]" },
    { label: "Facilities Issues", value: 3, icon: Building2, color: "bg-emerald-500" },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {statsLocal.map((s) => {
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

export default function AdministrationDashboard() {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      content: (
        <div className="space-y-6">
          <StatCards />
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#003b73]">Recent Activity</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Leave request submitted by Ms. Ngozi Eze",
                "Facilities issue reported: Lecture Hall A projector",
                "Staff record updated: Mr. Tunde Bakare",
                "Monthly HR report submitted",
              ].map((t, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl bg-[#f7fbff] px-4 py-3">
                  <Clock size={16} className="text-[#0070c9]" />
                  <span className="text-sm font-semibold text-[#003b73]">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "staff",
      label: "Staff Records",
      icon: Users,
      content: (
        <Table
          headers={["Name", "Role", "Status"]}
          rows={staff.map((s) => [s.name, s.role, s.status])}
        />
      ),
    },
    {
      id: "leave",
      label: "Leave & Attendance",
      icon: Calendar,
      content: (
        <Table
          headers={["Name", "Type", "From", "To", "Status"]}
          rows={leave.map((l) => [l.name, l.type, l.from, l.to, l.status])}
        />
      ),
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      content: (
        <Table
          headers={["Title", "Category", "Updated"]}
          rows={docs.map((d) => [d.title, d.category, d.updated])}
        />
      ),
    },
    {
      id: "facilities",
      label: "Facilities",
      icon: Building2,
      content: (
        <Table
          headers={["Item", "Issue", "Priority", "Status"]}
          rows={facilities.map((f) => [f.item, f.issue, f.priority, f.status])}
        />
      ),
    },
    {
      id: "reports",
      label: "Reports",
      icon: Activity,
      content: (
        <Table
          headers={["Title", "Status"]}
          rows={reports.map((r) => [r.title, r.status])}
        />
      ),
    },
  ];

  return (
    <DepartmentDashboard
      title="Administration Console"
      subtitle="Manage staff records, leave, documents, facilities and administrative reports."
      tabs={tabs}
    />
  );
}
