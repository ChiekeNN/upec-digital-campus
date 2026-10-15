import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPortalSession } from "@/lib/portal-auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const { resource } = await params;
  try {
    const records = await (prisma as any).portalRecord.findMany({
      where: { resource },
      orderBy: { createdAt: "desc" },
    });
    const rows = records.map((r: any) => ({ id: r.id, ...r.data, createdAt: r.createdAt, updatedAt: r.updatedAt }));
    return NextResponse.json({ success: true, rows });
  } catch (e) {
    console.warn("PortalRecord findMany failed, returning empty:", e);
    return NextResponse.json({ success: true, rows: [], dbUnavailable: true });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const { resource } = await params;
  try {
    const body = await request.json();
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = body || {};
    const created = await (prisma as any).portalRecord.create({
      data: { resource, data, createdBy: session.role },
    });
    return NextResponse.json({ success: true, row: { id: created.id, ...created.data } });
  } catch (e) {
    console.warn("PortalRecord create failed:", e);
    return NextResponse.json({ success: false, error: "Database unavailable." }, { status: 503 });
  }
}
