import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPortalSession } from "@/lib/portal-auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const { resource, id } = await params;
  try {
    const r = await (prisma as any).portalRecord.findUnique({ where: { id } });
    if (!r || r.resource !== resource) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, row: { id: r.id, ...r.data } });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Database unavailable." }, { status: 503 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const { resource, id } = await params;
  try {
    const body = await request.json();
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = body || {};
    const updated = await (prisma as any).portalRecord.update({
      where: { id },
      data: { data },
    });
    if (updated.resource !== resource) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, row: { id: updated.id, ...updated.data } });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Database unavailable." }, { status: 503 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await (prisma as any).portalRecord.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Database unavailable." }, { status: 503 });
  }
}
