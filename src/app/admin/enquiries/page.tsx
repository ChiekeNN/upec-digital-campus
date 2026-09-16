import { prisma } from "@/lib/prisma";

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mt-24 lg:mt-0">
      <h1 className="text-2xl font-black text-[#003b73] sm:text-3xl">
        Enquiries
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {enquiries.length} total message(s).
      </p>

      <div className="mt-8 grid gap-5">
        {enquiries.length === 0 ? (
          <div className="rounded-3xl border border-slate-100 bg-white p-6 text-sm text-slate-500 shadow-sm">
            No enquiries yet.
          </div>
        ) : (
          enquiries.map((e: any) => (
            <div
              key={e.id}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-black text-[#003b73]">{e.name}</h3>
                <span className="text-xs text-slate-400">
                  {new Date(e.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                <span>📧 {e.email}</span>
                {e.phone && <span>📞 {e.phone}</span>}
              </div>
              {e.subject && (
                <p className="mt-3 text-sm font-bold text-slate-700">
                  Subject: {e.subject}
                </p>
              )}
              <p className="mt-2 rounded-xl bg-[#f7fbff] p-4 text-sm leading-6 text-slate-700">
                {e.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
