import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPEC | University of Port Harcourt Entrepreneurial Centre",
  description:
    "UPEC equips students, entrepreneurs and communities with practical entrepreneurship, innovation and future-work skills.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UPEC",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#003b73",
};

/**
 * Captures the browser's `beforeinstallprompt` event as early as possible
 * (before React hydrates) so the Install App banner in PWALoader never
 * misses it. Chrome/Edge only fire this event when the app is NOT installed.
 */
const captureInstallPrompt = `
window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  window.__upecInstallPrompt = e;
  window.dispatchEvent(new Event("upec:installprompt"));
});
window.addEventListener("appinstalled", function () {
  window.__upecInstallPrompt = null;
  try { localStorage.setItem("upec-pwa-installed", "1"); } catch (_) {}
});
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: captureInstallPrompt }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
