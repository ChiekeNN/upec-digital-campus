"use client";

import {
  LayoutDashboard,
  Mail,
  Calendar,
  FileText,
  Users,
  Bell,
  Clock,
  CheckCircle2,
  Inbox,
  Send,
} from "lucide-react";
import DepartmentDashboard, { Tab } from "@/components/DepartmentDashboard";
import CrudManager from "@/components/CrudManager";
import { BarChart, DonutChart } from "@/components/Charts";

const stats = [
  { label: "Pending Letters", value: 12, icon: Inbox, color: "bg-[#003b73]" },
  { label: "Appointments Today", value: 5, icon: Calendar, color: "bg-[#0070c9]" },
  { label: "Memos Issued", value: 28, icon: Send, color: "bg-[#f7b733]" },
  { label: "Tasks Done", value: 41, icon: CheckCircle2, color: "bg-emerald-500" },
];

const correspondenceInitial = [
  { id: 1, ref: "UPEC/SEC/001", from: "Vice Chancellor's Office", to: "Director's Office", subject: "Meeting invitation", date: "2026-10-12", status: "Pending" },
  { id: 2, ref: "UPEC/SEC/002", from: "Faculty of Science", to: "UPEC Secretariat", subject: "Request for hall booking", date: "2026-10-11", status: "Replied" },
  { id: 3, ref: "UPEC/SEC/003", from: "TETFund", to: "Director's Office", subject: "Familiarisation visit follow-up", date: "2026-10-09", status: "Pending" },
  { id: 4, ref: "UPEC/SEC/004", from: "Director's Office", to: "All Staff", subject: "Memo: staff meeting", date: "2026-10-08", status: "Filed" },
];

const appointmentsInitial = [
  { id: 1, time: "09:00", with: "Dr. Henry Wobo (Director)", purpose: "Daily briefing", status: "Confirmed" },
  { id: 2, time: "11:30", with: "Mrs. Gloria Chindah", purpose: "Registrar consultation", status: "Confirmed" },
  { id: 3, time: "14:00", with: "TETFund delegation", purpose: "Follow-up visit", status: "Pending" },
  { id: 4, time: "16:00", with: "Staff union rep", purpose: "Welfare discussion", status: "Confirmed" },
];

const minutesInitial = [
  { id: 1, title: "Management Meeting — 8 Oct 2026", attendees: 9, status: "Approved" },
  { id: 2, title: "Staff General Meeting — 1 Oct 2026", attendees: 24, status: "Draft" },
  { id: 3, title: "Director's Briefing — 29 Sep 2026", attendees: 6, status: "Approved" },
];

const staffInitial = [
  { id: 1, name: "Dr. Henry Wobo", role: "Acting Director", dept: "Director's Office" },
  { id: 2, name: "Mrs. Gloria Chindah", role: "Registrar", dept: "Administration" },
  { id: 3, name: "Mr. Chidi Okoro", role: "IT Officer", dept: "IT" },
  { id: 4, name: "Ms. Amaka Nwosu", role: "Finance Officer", dept: "Finance" },
];

const notificationsInitial = [
  { id: 1, text: "New correspondence received from TETFund", time: "2h ago", type: "Info" },
  { id: 2, text: "Appointment confirmed: Registrar consultation", time: "4h ago", type: "Success" },
  { id: 3, text: "Meeting minutes awaiting approval", time: "1d ago", type: "Warning" },
  { id: 4, text: "Staff leave request submitted", time: "2d ago", type: "Info" },
];

export default function SecretaryDashboard() {
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
            <h2 className="text-lg font-black text-[#003b73]">Today's Schedule</h2>
            <ul className="mt-4 space-y-3">
              {appointmentsInitial.map((a) => (
                <li key={a.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
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
          <div className="grid gap-5 lg:grid-cols-2">
            <BarChart
              title="Appointments by Status"
              data={[
                { label: "Confirmed", value: 3, color: "#10b981" },
                { label: "Pending", value: 1, color: "#f7b733" },
              ]}
            />
            <DonutChart
              title="Correspondence Status"
              data={[
                { label: "Pending", value: 2, color: "#f7b733" },
                { label: "Replied", value: 1, color: "#10b981" },
                { label: "Filed", value: 1, color: "#0070c9" },
              ]}
              centerLabel="4"
            />
          </div>
        </div>
      ),
    },
    {
      id: "correspondence",
      label: "Correspondence",
      icon: Mail,
      content: (
        <CrudManager
          title="Correspondence Register"
          subtitle="Track incoming and outgoing letters, memos and directives."
          columns={[
            { key: "ref", label: "Reference" },
            { key: "from", label: "From" },
            { key: "to", label: "To" },
            { key: "subject", label: "Subject" },
            { key: "date", label: "Date", type: "date" },
            { key: "status", label: "Status", type: "select", options: ["Pending", "Replied", "Filed", "Closed"] },
          ]}
          initialRows={correspondenceInitial}
          storageKey="upec_secretary_correspondence"
          resource="secretary-correspondence"
          accent="from-[#003b73] to-[#0070c9]"
          addLabel="New Letter"
        />
      ),
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      content: (
        <CrudManager
          title="Appointment Book"
          subtitle="Director's daily appointments and visits."
          columns={[
            { key: "time", label: "Time" },
            { key: "with", label: "With" },
            { key: "purpose", label: "Purpose" },
            { key: "status", label: "Status", type: "select", options: ["Confirmed", "Pending", "Cancelled", "Completed"] },
          ]}
          initialRows={appointmentsInitial}
          storageKey="upec_secretary_appointments"
          resource="secretary-appointments"
          accent="from-[#0070c9] to-[#84c7ff]"
          addLabel="New Appointment"
        />
      ),
    },
    {
      id: "minutes",
      label: "Meeting Minutes",
      icon: FileText,
      content: (
        <CrudManager
          title="Meeting Minutes"
          subtitle="Record and track meeting minutes and resolutions."
          columns={[
            { key: "title", label: "Meeting Title" },
            { key: "attendees", label: "Attendees", type: "number" },
            { key: "status", label: "Status", type: "select", options: ["Draft", "Approved", "Archived"] },
          ]}
          initialRows={minutesInitial}
          storageKey="upec_secretary_minutes"
          resource="secretary-minutes"
          accent="from-[#f7b733] to-[#f59e0b]"
          addLabel="New Minutes"
        />
      ),
    },
    {
      id: "directory",
      label: "Staff Directory",
      icon: Users,
      content: (
        <CrudManager
          title="Staff Directory"
          subtitle="UPEC staff contacts and roles."
          columns={[
            { key: "name", label: "Name" },
            { key: "role", label: "Role" },
            { key: "dept", label: "Department", type: "select", options: ["Director's Office", "Administration", "IT", "Finance", "Programmes"] },
          ]}
          initialRows={staffInitial}
          storageKey="upec_secretary_staff"
          resource="secretary-staff"
          accent="from-emerald-500 to-teal-500"
          addLabel="Add Staff"
        />
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      content: (
        <CrudManager
          title="Notifications"
          subtitle="System and office notifications."
          columns={[
            { key: "text", label: "Message" },
            { key: "time", label: "Time" },
            { key: "type", label: "Type", type: "select", options: ["Info", "Success", "Warning", "Error"] },
          ]}
          initialRows={notificationsInitial}
          storageKey="upec_secretary_notifications"
          resource="secretary-notifications"
          accent="from-purple-500 to-indigo-500"
          addLabel="New Notification"
        />
      ),
    },
  ];

  return (
    <DepartmentDashboard
      title="Director's Secretary Console"
      subtitle="Manage correspondence, appointments, meeting minutes, staff directory and notifications."
      tabs={tabs}
    />
  );
}
