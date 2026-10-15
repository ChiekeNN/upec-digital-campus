import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/portal-auth";

export default async function ItLayout({ children }: { children: React.ReactNode }) {
  const session = await getPortalSession();
  if (!session) redirect("/portal/login");
  if (session.role !== "it") redirect("/portal/" + session.role);
  return <>{children}</>;
}
