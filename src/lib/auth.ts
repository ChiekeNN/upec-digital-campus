import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function isAdminLoggedIn(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("upec_admin")?.value;
    if (!token) return false;

    const secret = new TextEncoder().encode(process.env.ADMIN_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
