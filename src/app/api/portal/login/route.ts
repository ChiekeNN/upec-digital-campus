import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { PORTAL_ROLES, roleLabel } from "@/lib/portal-roles";
import { cookies } from "next/headers";

const DEFAULT_PASSWORDS: Record<string, string> = {
  secretary: "secretary123",
  administration: "admin123",
  it: "itadmin123",
  finance: "finance123",
};

const ENV_KEYS: Record<string, string> = {
  secretary: "SECRETARY_PASSWORD",
  administration: "ADMINISTRATION_PASSWORD",
  it: "IT_PASSWORD",
  finance: "FINANCE_PASSWORD",
};

export async function POST(request: Request) {
  try {
    const { department, password } = await request.json();

    if (!department || !PORTAL_ROLES.some((r) => r.value === department)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid department." },
        { status: 400 },
      );
    }
    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required." },
        { status: 400 },
      );
    }

    const envKey = ENV_KEYS[department];
    let expected = process.env[envKey] || DEFAULT_PASSWORDS[department];
    // Check for a stored password override in the cookie (set by change-password)
    try {
      const cookieStore = await cookies();
      const override = cookieStore.get(`upec_pw_${department}`)?.value;
      if (override) expected = override;
    } catch {}
    if (password !== expected) {
      return NextResponse.json(
        { success: false, error: "Incorrect password for this department." },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(
      process.env.PORTAL_SECRET || process.env.ADMIN_SECRET || "upec-portal-dev-secret",
    );

    const token = await new SignJWT({ role: department, name: roleLabel(department as any) })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("8h")
      .sign(secret);

    const response = NextResponse.json({ success: true, redirect: `/portal/${department}` });
    response.cookies.set("upec_portal", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Login failed. Please try again." },
      { status: 500 },
    );
  }
}
