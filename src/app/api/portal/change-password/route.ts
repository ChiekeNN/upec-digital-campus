import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortalSession } from "@/lib/portal-auth";

export const dynamic = "force-dynamic";

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

    const cookieStore = await cookies();
    const cookieName = `upec_pw_${session.role}`;
    const override = cookieStore.get(cookieName)?.value;
    const currentExpected = override || process.env[ENV_KEYS[session.role]] || DEFAULT_PASSWORDS[session.role];

    if (currentPassword !== currentExpected) {
      return NextResponse.json({ success: false, error: "Current password is incorrect." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(cookieName, String(newPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ success: false, error: "Failed to change password." }, { status: 500 });
  }
}
