import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { PORTAL_ROLES, roleLabel, type PortalRole } from "@/lib/portal-roles";

export type { PortalRole };
export { PORTAL_ROLES, roleLabel };

export type PortalSession = { role: PortalRole; name: string };

export async function getPortalSession(): Promise<PortalSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("upec_portal")?.value;
    if (!token) return null;
    const secret = new TextEncoder().encode(
      process.env.PORTAL_SECRET || process.env.ADMIN_SECRET || "upec-portal-dev-secret",
    );
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as PortalRole;
    if (!PORTAL_ROLES.some((r) => r.value === role)) return null;
    return { role, name: (payload.name as string) || roleLabel(role) };
  } catch {
    return null;
  }
}
