import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/portal-auth";

export default async function PortalIndex() {
  const session = await getPortalSession();
  if (!session) redirect("/portal/login");
  redirect(`/portal/${session.role}`);
}
