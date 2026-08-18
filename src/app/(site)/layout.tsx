import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PWALoader from "@/components/PWALoader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <PWALoader />
    </>
  );
}
