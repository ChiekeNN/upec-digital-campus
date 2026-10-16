"use client";

import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Building2,
  Activity,
  Clock,
} from "lucide-react";
import DepartmentDashboard, { Tab } from "@/components/DepartmentDashboard";
import CrudManager from "@/components/CrudManager";
import { BarChart, DonutChart } from "@/components/Charts";

const staffInitial = [
  { id: 1, name: "Dr. Henry Wobo", role: "Acting Director", status: "Active", photo: "https://i.pravatar.cc/80?img=12" },
  { id: 2, name: "Mrs. Gloria Chindah", role: "Registrar", status: "Active", photo: "https://i.pravatar.cc/80?img=47" },
  { id: 3, name: "Mr. Chidi Okoro", role: "IT Officer", status: "On Leave", photo: "https://i.pravatar.cc/80?img=33" },
  { id: 4, name: "Ms. Amaka Nwosu", role: "Finance Officer", status: "Active", photo: "https://i.pravatar.cc/80?img=45" },
  { id: 5, name: "Mr. Tunde Bakare", role: "Admin Officer", status: "Active", photo: "https://i.pravatar.cc/80?img=59" },
];

const leaveInitial = [
  { id: 1, name: "Mr. Chidi Okoro", type: "Annual Leave", from: "2026-10-10", to: "2026-10-20", status: "Approved" },
  { id: 2, name: "Ms. Ngozi Eze", type: "Sick Leave", from: "2026-10-14", to: "2026-10-16", status: "Pending" },
  { id: 3, name: "Mr. Tunde Bakare", type: "Casual Leave", from: "2026-10-22", to: "2026-10-23", status: "Pending" },
];

const docsInitial = [
  { id: 1, title: "Staff Handbook 2026", category: "Policy", updated: "2026-09-01" },
  { id: 2, title: "Procurement Guidelines", category: "Procurement", updated: "2026-08-15" },
  { id: 3, title: "Leave Policy", category: "HR", updated: "2026-07-20" },
  { id: 4, title: "Facilities Maintenance Log", category: "Facilities", updated: "2026-10-05" },
];

const facilitiesInitial = [
  { id: 1, item: "Lecture Hall A", issue: "Projector not working", priority: "High", status: "Open" },
  { id: 2, item: "Admin Block Generator", issue: "Servicing due", priority: "Medium", status: "Scheduled" },
  { id: 3, item: "Fashion Hub", issue: "AC repair", priority: "Low", status: "Resolved" },
];

const reportsInitial = [
  { id: 1, title: "Monthly Staff Report — Sep 2026", status: "Submitted" },
  { id: 2, title: "Quarterly HR Summary — Q3 2026", status: "Draft" },
  { id: 3, title: "Facilities Audit — Sep 2026", status: "Submitted" },
];

const stats = [
  { label: "Total Staff", value: 64, icon: Users, color: "bg-[#003b73]" },
  { label: "On Leave", value: 7, icon: Calendar, color: "bg-[#0070c9]" },
  { label: "Pending Requests", value: 14, icon: FileText, color: "bg-[#f7b733]" },
  { label: "Facilities Issues", value: 3, icon: Building2, color: "bg-emerald-500" },
];

export default function AdministrationDashboard() {
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
            <h2 className="text-lg font-black text-[#003b73]">Recent Activity</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Leave request submitted by Ms. Ngozi Eze",
                "Facilities issue reported: Lecture Hall A projector",
                "Staff record updated: Mr. Tunde Bakare",
                "Monthly HR report submitted",
              ].map((t, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                  <Clock size={16} className="text-[#0070c9]" />
                  <span className="text-sm font-semibold text-[#003b73]">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <DonutChart
              title="Staff Status"
              data={[
                { label: "Active", value: 4, color: "#10b981" },
                { label: "On Leave", value: 1, color: "#f7b733" },
              ]}
              centerLabel="5"
            />
            <BarChart
              title="Leave Requests"
              data={[
                { label: "Approved", value: 1, color: "#10b981" },
                { label: "Pending", value: 2, color: "#f7b733" },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      id: "staff",
      label: "Staff Records",
      icon: Users,
      content: (
        <CrudManager
          title="Staff Records"
          subtitle="Manage UPEC staff profiles and roles."
          columns={[
            { key: "name", label: "Name" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status", type: "select", options: ["Active", "On Leave", "Suspended", "Exited"] },
          ]}
          initialRows={staffInitial}
          storageKey="upec_admin_staff"
          avatarKey="photo"
          allowAttachments={false}
          resource="admin-staff"
          accent="from-[#003b73] to-[#0070c9]"
          addLabel="Add Staff"
        />
      ),
    },
    {
      id: "leave",
      label: "Leave & Attendance",
      icon: Calendar,
      content: (
        <CrudManager
          title="Leave & Attendance"
          subtitle="Track leave requests and approvals."
          columns={[
            { key: "name", label: "Staff" },
            { key: "type", label: "Leave Type", type: "select", options: ["Annual Leave", "Sick Leave", "Casual Leave", "Maternity Leave", "Study Leave"] },
            { key: "from", label: "From", type: "date" },
            { key: "to", label: "To", type: "date" },
            { key: "status", label: "Status", type: "select", options: ["Pending", "Approved", "Rejected"] },
          ]}
          initialRows={leaveInitial}
          storageKey="upec_admin_leave"
          resource="admin-leave"
          accent="from-[#0070c9] to-[#84c7ff]"
          addLabel="New Leave"
        />
      ),
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      content: (
        <CrudManager
          title="Document Register"
          subtitle="Central repository of policies and records."
          columns={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category", type: "select", options: ["Policy", "HR", "Procurement", "Facilities", "Finance"] },
            { key: "updated", label: "Last Updated", type: "date" },
          ]}
          initialRows={docsInitial}
          storageKey="upec_admin_docs"
          resource="admin-docs"
          accent="from-[#f7b733] to-[#f59e0b]"
          addLabel="Add Document"
        />
      ),
    },
    {
      id: "facilities",
      label: "Facilities",
      icon: Building2,
      content: (
        <CrudManager
          title="Facilities Issues"
          subtitle="Track facility maintenance and issues."
          columns={[
            { key: "item", label: "Item / Location" },
            { key: "issue", label: "Issue" },
            { key: "priority", label: "Priority", type: "select", options: ["Low", "Medium", "High", "Critical"] },
            { key: "status", label: "Status", type: "select", options: ["Open", "Scheduled", "In Progress", "Resolved"] },
          ]}
          initialRows={facilitiesInitial}
          storageKey="upec_admin_facilities"
          resource="admin-facilities"
          accent="from-emerald-500 to-teal-500"
          addLabel="Report Issue"
        />
      ),
    },
    {
      id: "reports",
      label: "Reports",
      icon: Activity,
      content: (
        <CrudManager
          title="Administrative Reports"
          subtitle="Submitted and draft reports."
          columns={[
            { key: "title", label: "Report Title" },
            { key: "status", label: "Status", type: "select", options: ["Draft", "Submitted", "Approved", "Rejected"] },
          ]}
          initialRows={reportsInitial}
          storageKey="upec_admin_reports"
          resource="admin-reports"
          accent="from-purple-500 to-indigo-500"
          addLabel="New Report"
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
