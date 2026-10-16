import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPortalSession } from "@/lib/portal-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: "Both fields are required." }, { status: 400 });
    }
    if (String(newPassword).length < 6) {
      return NextResponse.json({ success: false, error: "New password must be at least 6 characters." }, { status: 400 });
    }

    const ENV_KEYS: Record<string, string> = {
      secretary: "SECRETARY_PASSWORD",
      administration: "ADMINISTRATION_PASSWORD",
      it: "IT_PASSWORD",
      finance: "FINANCE_PASSWORD",
    };
    const DEFAULT_PASSWORDS: Record<string, string> = {
      secretary: "secretary123",
      administration: "admin123",
      it: "itadmin123",
      finance: "finance123",
    };

    let currentExpected = process.env[ENV_KEYS[session.role]] || DEFAULT_PASSWORDS[session.role];
    try {
      const recs = await (prisma as any).portalRecord.findMany({ where: { resource: "portal-passwords" } });
      const override = recs.find((r: any) => r.data?.role === session.role);
      if (override?.data?.password) currentExpected = override.data.password;
    } catch {}

    if (currentPassword !== currentExpected) {
      return NextResponse.json({ success: false, error: "Current password is incorrect." }, { status: 401 });
    }

    try {
      const recs = await (prisma as any).portalRecord.findMany({ where: { resource: "portal-passwords" } });
      const existing = recs.find((r: any) => r.data?.role === session.role);
      if (existing) {
        await (prisma as any).portalRecord.update({
          where: { id: existing.id },
          data: { data: { role: session.role, password: newPassword } },
        });
      } else {
        await (prisma as any).portalRecord.create({
          data: { resource: "portal-passwords", data: { role: session.role, password: newPassword }, createdBy: session.role },
        });
      }
    } catch {
      return NextResponse.json({ success: false, error: "Database unavailable. Cannot change password." }, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to change password." }, { status: 500 });
  }
}
