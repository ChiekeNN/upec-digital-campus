"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Share, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    /** Set by the early capture script in src/app/layout.tsx */
    __upecInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

/** How long after the visitor arrives before the Install App banner appears. */
const SHOW_DELAY_MS = 4000;
/** How long the banner stays up with no action before it disappears on its own. */
const AUTO_HIDE_MS = 10000;

/** Per-visit flag (sessionStorage): banner already shown during this visit. */
const SEEN_THIS_VISIT_KEY = "upec-pwa-prompt-seen";
/** Persistent flag (localStorage): app has been installed on this device. */
const INSTALLED_KEY = "upec-pwa-installed";

function safeGet(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage: () => Storage, key: string, value: string | null) {
  try {
    if (value === null) storage().removeItem(key);
    else storage().setItem(key, value);
  } catch {
    /* storage unavailable (private mode etc.) — ignore */
  }
}

const session = () => window.sessionStorage;
const local = () => window.localStorage;

/** True when the site is running as the installed app (phone, tablet or PC). */
function isRunningAsInstalledApp(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    window.matchMedia("(display-mode: window-controls-overlay)").matches ||
    // iOS Safari home-screen app
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

export default function PWALoader() {
  const installEventRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  /** Browser has confirmed the app can be installed (i.e. it isn't installed yet). */
  const [canInstall, setCanInstall] = useState(false);
  /** The 4-second delay since the visitor arrived has passed. */
  const [delayElapsed, setDelayElapsed] = useState(false);
  /** Banner was closed (auto-hidden, dismissed, installed, or already seen this visit). */
  const [closed, setClosed] = useState(false);

  const visible = canInstall && delayElapsed && !closed;

  const close = useCallback(() => setClosed(true), []);

  useEffect(() => {
    // Register service worker (needed for the app to be installable)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.log("SW registration failed:", err));
    }

    // Already running as the installed app → never show the banner.
    if (isRunningAsInstalledApp()) {
      safeSet(local, INSTALLED_KEY, "1");
      return;
    }

    // Already shown once during this visit → wait for the next visit.
    if (safeGet(session, SEEN_THIS_VISIT_KEY)) return;

    const ua = window.navigator.userAgent.toLowerCase();
    const iOS =
      /iphone|ipad|ipod/.test(ua) ||
      // iPadOS 13+ reports itself as a Mac with touch support
      (ua.includes("macintosh") && navigator.maxTouchPoints > 1);

    // Android / Windows / macOS / ChromeOS (Chrome, Edge, Samsung Internet…):
    // the browser only fires `beforeinstallprompt` when the app is NOT
    // installed on this device, so receiving it is the signal to offer install.
    const onInstallAvailable = () => {
      const evt = window.__upecInstallPrompt;
      if (!evt) return;
      installEventRef.current = evt;
      // The browser says it's not installed (e.g. the user uninstalled it).
      safeSet(local, INSTALLED_KEY, null);
      setCanInstall(true);
    };

    const onInstalled = () => {
      safeSet(local, INSTALLED_KEY, "1");
      installEventRef.current = null;
      setClosed(true);
    };

    // After the 4-second delay, decide whether the banner can be shown.
    const delayTimer = window.setTimeout(() => {
      setDelayElapsed(true);
      if (iOS) {
        // iOS has no install event; show the "Add to Home Screen" hint
        // unless we know the app was installed from this browser.
        if (!safeGet(local, INSTALLED_KEY)) {
          setIsIOS(true);
          setCanInstall(true);
        }
      } else {
        // The install event may already have fired (even before hydration).
        onInstallAvailable();
      }
    }, SHOW_DELAY_MS);

    // If the install event arrives later than 4s, show the banner then.
    if (!iOS) {
      window.addEventListener("upec:installprompt", onInstallAvailable);
    }
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.clearTimeout(delayTimer);
      window.removeEventListener("upec:installprompt", onInstallAvailable);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Once visible: remember it was shown this visit, and auto-hide after
  // AUTO_HIDE_MS if the visitor takes no action.
  useEffect(() => {
    if (!visible) return;
    safeSet(session, SEEN_THIS_VISIT_KEY, "1");
    const hideTimer = window.setTimeout(close, AUTO_HIDE_MS);
    return () => window.clearTimeout(hideTimer);
  }, [visible, close]);

  async function handleInstall() {
    const evt = installEventRef.current;
    setClosed(true);
    if (!evt) return;
    installEventRef.current = null;
    window.__upecInstallPrompt = null;
    try {
      await evt.prompt();
      const { outcome } = await evt.userChoice;
      if (outcome === "accepted") safeSet(local, INSTALLED_KEY, "1");
    } catch (err) {
      console.log("Install prompt failed:", err);
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Install the UPEC App"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:left-auto sm:right-4 sm:max-w-sm"
    >
      <div className="pwa-banner-enter relative overflow-hidden rounded-2xl border border-white/10 bg-[#003b73] text-white shadow-2xl">
        <div className="flex items-center gap-4 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon-192.png"
            alt="UPEC"
            className="h-11 w-11 shrink-0 rounded-xl"
          />

          <div className="flex-1">
            <p className="text-sm font-black">Install the UPEC App</p>
            {isIOS ? (
              <p className="flex flex-wrap items-center gap-1 text-xs text-blue-100">
                Tap <Share size={13} className="inline" /> then &ldquo;Add to
                Home Screen&rdquo;
              </p>
            ) : (
              <p className="text-xs text-blue-100">
                Quick access to courses, news and applications.
              </p>
            )}
          </div>

          {!isIOS && (
            <button
              onClick={handleInstall}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#f7b733] px-3 py-2 text-xs font-black text-[#003b73] transition hover:bg-white"
            >
              <Download size={15} />
              Install
            </button>
          )}

          <button
            onClick={close}
            aria-label="Dismiss"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-blue-100 hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Countdown bar: shows how long until the banner closes on its own */}
        <div
          aria-hidden="true"
          className="pwa-banner-countdown absolute bottom-0 left-0 h-1 w-full origin-left bg-[#f7b733]"
          style={{ animationDuration: `${AUTO_HIDE_MS}ms` }}
        />
      </div>
    </div>
  );
}
