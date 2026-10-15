import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/portal-auth";

export default async function AdministrationLayout({ children }: { children: React.ReactNode }) {
  const session = await getPortalSession();
  if (!session) redirect("/portal/login");
  if (session.role !== "administration") redirect("/portal/" + session.role);
  return <>{children}</>;
}
