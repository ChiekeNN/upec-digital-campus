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
