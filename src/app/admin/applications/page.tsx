import { postgraduateApplication, prisma } from "@/lib/prisma";

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  });
  const pgApplications = await postgraduateApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mt-24 lg:mt-0">
      <h1 className="text-2xl font-black text-[#003b73] sm:text-3xl">
        Applications
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {applications.length} total application(s).
      </p>

      <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        {applications.length === 0 ? (
          <p className="text-sm text-slate-500">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-4 font-bold">Reference</th>
                  <th className="pb-3 pr-4 font-bold">Name</th>
                  <th className="pb-3 pr-4 font-bold">Email</th>
                  <th className="pb-3 pr-4 font-bold">Phone</th>
                  <th className="pb-3 pr-4 font-bold">Programme</th>
                  <th className="pb-3 pr-4 font-bold">Type</th>
                  <th className="pb-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-3 pr-4 font-bold text-[#003b73]">
                      {app.reference}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">{app.name}</td>
                    <td className="py-3 pr-4 text-slate-600">{app.email}</td>
                    <td className="py-3 pr-4 text-slate-600">
                      {app.phone || "-"}
                    </td>
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

      <h2 className="mt-12 text-xl font-black text-[#003b73]">
        Postgraduate Applications
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        {pgApplications.length} postgraduate application(s).
      </p>

      <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        {pgApplications.length === 0 ? (
          <p className="text-sm text-slate-500">
            No postgraduate applications yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-4 font-bold">Reference</th>
                  <th className="pb-3 pr-4 font-bold">Name</th>
                  <th className="pb-3 pr-4 font-bold">Email</th>
                  <th className="pb-3 pr-4 font-bold">Phone</th>
                  <th className="pb-3 pr-4 font-bold">Programme</th>
                  <th className="pb-3 pr-4 font-bold">Mode</th>
                  <th className="pb-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {pgApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-3 pr-4 font-bold text-[#003b73]">
                        {app.reference}
                      </td>
                      <td className="py-3 pr-4 text-slate-700">{app.name}</td>
                      <td className="py-3 pr-4 text-slate-600">{app.email}</td>
                      <td className="py-3 pr-4 text-slate-600">
                        {app.phone || "-"}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {app.programme}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {app.modeOfStudy || "-"}
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
