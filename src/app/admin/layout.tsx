import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/auth";
import AdminNav from "@/components/AdminNav";

export const metadata = {
  title: "UPEC Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn = await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f7fbff]">
      <AdminNav />
      <main className="px-5 py-8 pt-24 sm:px-8">{children}</main>
    </div>
  );
}
