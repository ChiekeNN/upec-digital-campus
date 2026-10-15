import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/portal-auth";
import PortalNav from "@/components/PortalNav";

export const metadata = {
  title: "UPEC Staff Portal",
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPortalSession();

  if (!session) {
    redirect("/portal/login");
  }

  return (
    <div className="min-h-screen bg-[#f7fbff]">
      <PortalNav role={session.role} name={session.name} />
      <main className="mx-auto max-w-7xl px-5 py-8 pt-24 sm:px-8">
        {children}
      </main>
    </div>
  );
}
