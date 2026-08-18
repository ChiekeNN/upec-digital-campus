import Link from "next/link";
import { WifiOff, RefreshCw, Home } from "lucide-react";

export const metadata = {
  title: "Offline | UPEC",
  description: "You are currently offline.",
};

export default function OfflinePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#003b73] px-5 text-center text-white">
      <div className="max-w-md">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white/10 backdrop-blur">
          <WifiOff size={40} className="text-[#f7b733]" />
        </div>

        <h1 className="mt-8 text-3xl font-black tracking-tight sm:text-4xl">
          You are offline
        </h1>

        <p className="mt-4 text-base leading-8 text-blue-100">
          It looks like you have lost your internet connection. Some UPEC
          content may be unavailable until you reconnect.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn-primary justify-center bg-[#f7b733] text-[#003b73] hover:bg-white"
          >
            <Home size={18} />
            Go to Home
          </Link>
          <a href="/" className="btn-outline justify-center">
            <RefreshCw size={18} />
            Try Again
          </a>
        </div>
      </div>
    </main>
  );
}
