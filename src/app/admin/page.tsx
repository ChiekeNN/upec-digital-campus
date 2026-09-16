import Link from "next/link";
import {
  ClipboardList,
  FileText,
  MessageSquare,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [totalApplications, fullApplications, eoiApplications, totalEnquiries] =
    await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { applicationType: "full" } }),
      prisma.application.count({ where: { applicationType: "eoi" } }),
      prisma.enquiry.count(),
    ]);

  const recentApplications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      icon: ClipboardList,
      color: "bg-[#003b73]",
    },
    {
      label: "Full Applications",
      value: fullApplications,
      icon: FileText,
      color: "bg-[#0070c9]",
    },
    {
      label: "Expressions of Interest",
      value: eoiApplications,
      icon: UserCheck,
      color: "bg-[#f7b733]",
    },
    {
      label: "Contact Enquiries",
      value: totalEnquiries,
      icon: MessageSquare,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="mt-20 lg:mt-0">
      <div>
        <h1 className="text-2xl font-black text-[#003b73] sm:text-3xl">
          Welcome back, Admin
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Here is an overview of UPEC activity.
        </p>
      </div>

      {/* STATS */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div
                className={`grid h-12 w-12 place-items-center rounded-xl ${stat.color} text-white`}
              >
                <Icon size={24} />
              </div>
              <p className="mt-5 text-3xl font-black text-[#003b73]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="mt-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#003b73]">
            Recent Applications
          </h2>
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0070c9] hover:text-[#003b73]"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">
            No applications yet. They will appear here as they arrive.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-4 font-bold">Reference</th>
                  <th className="pb-3 pr-4 font-bold">Name</th>
                  <th className="pb-3 pr-4 font-bold">Programme</th>
                  <th className="pb-3 pr-4 font-bold">Type</th>
                  <th className="pb-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app: any) => (
                  <tr
                    key={app.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-3 pr-4 font-bold text-[#003b73]">
                      {app.reference}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">{app.name}</td>
                    <td className="py-3 pr-4 text-slate-600">
                      {app.programme}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#0070c9]">
                        {app.applicationType === "full" ? "Full" : "EOI"}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
