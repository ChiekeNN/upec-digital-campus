"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        // Full page redirect (more reliable than router.push here)
        window.location.href = "/admin";
      } else {
        setStatus("error");
        setError(result.error || "Incorrect password.");
      }
    } catch {
      setStatus("error");
      setError("Could not reach the server. Please try again.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#003b73] px-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#003b73] text-white">
          <ShieldCheck size={32} />
        </div>

        <h1 className="mt-6 text-center text-2xl font-black text-[#003b73]">
          UPEC Admin Login
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Enter your administrator password to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="form-label">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-[#dbe4ef] bg-[#f8fafc] px-3 focus-within:border-[#003b73] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003b73]/20">
              <Lock size={18} className="shrink-0 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-transparent py-3 text-sm text-[#122033] outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 text-slate-400 transition hover:text-[#003b73]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {status === "error" && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full justify-center disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Login
                <ShieldCheck size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
