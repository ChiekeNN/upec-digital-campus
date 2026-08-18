"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

// Minimal type for the install prompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWALoader() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Register the service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.log("SW registration failed:", err));
    }

    // Listen for the install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
    setShowBanner(false);
  }

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:left-auto sm:right-4 sm:max-w-sm">
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#003b73] p-4 text-white shadow-2xl">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-base font-black text-[#003b73]">
          U
        </div>

        <div className="flex-1">
          <p className="text-sm font-black">Install the UPEC App</p>
          <p className="text-xs text-blue-100">
            Quick access to courses, news and applications.
          </p>
        </div>

        <button
          onClick={handleInstall}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#f7b733] px-3 py-2 text-xs font-black text-[#003b73] transition hover:bg-white"
        >
          <Download size={15} />
          Install
        </button>

        <button
          onClick={() => setShowBanner(false)}
          aria-label="Dismiss"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-blue-100 hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
