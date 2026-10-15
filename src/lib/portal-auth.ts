import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export type PortalRole = "secretary" | "administration" | "it" | "finance";

export const PORTAL_ROLES: { value: PortalRole; label: string }[] = [
  { value: "secretary", label: "Director's Secretary Department" },
  { value: "administration", label: "Administration Department" },
  { value: "it", label: "IT Department (Site Administrator)" },
  { value: "finance", label: "Finance Officer Department" },
];

export function roleLabel(role: PortalRole): string {
  return PORTAL_ROLES.find((r) => r.value === role)?.label ?? role;
}

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
