import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/portal-auth";

export default async function FinanceLayout({ children }: { children: React.ReactNode }) {
  const session = await getPortalSession();
  if (!session) redirect("/portal/login");
  if (session.role !== "finance") redirect("/portal/" + session.role);
  return <>{children}</>;
}
