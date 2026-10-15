"use client";

import {
  LayoutDashboard,
  Mail,
  Calendar,
  FileText,
  Users,
  Bell,
  Inbox,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react";
import DepartmentDashboard, { Tab } from "@/components/DepartmentDashboard";

const stats = [
  { label: "Pending Letters", value: 12, icon: Inbox, color: "bg-[#003b73]" },
  { label: "Appointments Today", value: 5, icon: Calendar, color: "bg-[#0070c9]" },
  { label: "Memos Issued", value: 28, icon: Send, color: "bg-[#f7b733]" },
  { label: "Tasks Done", value: 41, icon: CheckCircle2, color: "bg-emerald-500" },
];

const correspondence = [
  { ref: "UPEC/SEC/001", from: "Vice Chancellor's Office", subject: "Meeting invitation", date: "2026-10-12", status: "Pending" },
  { ref: "UPEC/SEC/002", from: "Faculty of Science", subject: "Request for hall booking", date: "2026-10-11", status: "Replied" },
  { ref: "UPEC/SEC/003", from: "TETFund", subject: "Familiarisation visit follow-up", date: "2026-10-09", status: "Pending" },
  { ref: "UPEC/SEC/004", from: "Director's Office", subject: "Memo: staff meeting", date: "2026-10-08", status: "Filed" },
];

const appointments = [
  { time: "09:00", with: "Dr. Henry Wobo (Director)", purpose: "Daily briefing", status: "Confirmed" },
  { time: "11:30", with: "Mrs. Gloria Chindah", purpose: "Registrar consultation", status: "Confirmed" },
  { time: "14:00", with: "TETFund delegation", purpose: "Follow-up visit", status: "Pending" },
  { time: "16:00", with: "Staff union rep", purpose: "Welfare discussion", status: "Confirmed" },
];

const minutes = [
  { title: "Management Meeting — 8 Oct 2026", attendees: 9, status: "Approved" },
  { title: "Staff General Meeting — 1 Oct 2026", attendees: 24, status: "Draft" },
  { title: "Director's Briefing — 29 Sep 2026", attendees: 6, status: "Approved" },
];

const staff = [
  { name: "Dr. Henry Wobo", role: "Acting Director", dept: "Director's Office" },
  { name: "Mrs. Gloria Chindah", role: "Registrar", dept: "Administration" },
  { name: "Mr. Chidi Okoro", role: "IT Officer", dept: "IT" },
  { name: "Ms. Amaka Nwosu", role: "Finance Officer", dept: "Finance" },
];

const notifications = [
  { text: "New correspondence received from TETFund", time: "2h ago" },
  { text: "Appointment confirmed: Registrar consultation", time: "4h ago" },
  { text: "Meeting minutes awaiting approval", time: "1d ago" },
  { text: "Staff leave request submitted", time: "2d ago" },
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

export default function SecretaryDashboard() {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      content: (
        <div className="space-y-6">
          <StatCards />
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#003b73]">Today's Schedule</h2>
            <ul className="mt-4 space-y-3">
              {appointments.map((a) => (
                <li key={a.time} className="flex items-center justify-between rounded-xl bg-[#f7fbff] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-[#0070c9]" />
                    <div>
                      <p className="text-sm font-bold text-[#003b73]">{a.purpose}</p>
                      <p className="text-xs text-slate-500">{a.with} · {a.time}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{a.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "correspondence",
      label: "Correspondence",
      icon: Mail,
      content: (
        <Table
          headers={["Reference", "From", "Subject", "Date", "Status"]}
          rows={correspondence.map((c) => [c.ref, c.from, c.subject, c.date, c.status])}
        />
      ),
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      content: (
        <Table
          headers={["Time", "With", "Purpose", "Status"]}
          rows={appointments.map((a) => [a.time, a.with, a.purpose, a.status])}
        />
      ),
    },
    {
      id: "minutes",
      label: "Meeting Minutes",
      icon: FileText,
      content: (
        <Table
          headers={["Title", "Attendees", "Status"]}
          rows={minutes.map((m) => [m.title, m.attendees, m.status])}
        />
      ),
    },
    {
      id: "directory",
      label: "Staff Directory",
      icon: Users,
      content: (
        <Table
          headers={["Name", "Role", "Department"]}
          rows={staff.map((s) => [s.name, s.role, s.dept])}
        />
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      content: (
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-[#003b73]">{n.text}</p>
              <span className="text-xs text-slate-400">{n.time}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <DepartmentDashboard
      title="Director's Secretary Console"
      subtitle="Manage correspondence, appointments, meeting minutes and the director's schedule."
      tabs={tabs}
    />
  );
}
