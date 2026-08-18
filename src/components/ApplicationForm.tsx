"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  FileText,
  Loader2,
  Send,
  UserPlus,
} from "lucide-react";
import { programmes } from "@/data/site";

type Mode = "eoi" | "full";
type Status = "idle" | "loading" | "success" | "error";

export default function ApplicationForm() {
  const [mode, setMode] = useState<Mode>("eoi");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [reference, setReference] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: Record<string, unknown> = {
      applicationType: mode,
    };
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setFeedback(result.message);
        setReference(result.reference);
        form.reset();
      } else {
        setStatus("error");
        setFeedback(result.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-100 bg-emerald-50 p-10 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="mt-6 text-xl font-black text-emerald-800">
          {mode === "full" ? "Application Submitted!" : "Interest Received!"}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-emerald-700">
          {feedback}
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-200 bg-white px-6 py-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Your Reference Number
          </p>
          <p className="mt-1 text-lg font-black text-[#003b73]">{reference}</p>
        </div>

        <p className="mt-4 max-w-sm text-xs text-emerald-700">
          Please save this reference number. A confirmation email feature will
          be activated in an upcoming release.
        </p>

        <button onClick={() => setStatus("idle")} className="btn-primary mt-7">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* MODE TOGGLE */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-2">
        <button
          type="button"
          onClick={() => setMode("eoi")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
            mode === "eoi"
              ? "bg-[#003b73] text-white shadow"
              : "text-slate-600 hover:text-[#003b73]"
          }`}
        >
          <ClipboardList size={17} />
          Express Interest
        </button>
        <button
          type="button"
          onClick={() => setMode("full")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
            mode === "full"
              ? "bg-[#003b73] text-white shadow"
              : "text-slate-600 hover:text-[#003b73]"
          }`}
        >
          <FileText size={17} />
          Full Application
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {mode === "eoi"
          ? "Quick and simple. Tell us a little about yourself and the UPEC team will follow up with information."
          : "Complete the full application for your chosen programme. Fields marked * are required."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="form-label">Full Name *</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Email Address *</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="form-input"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="form-label">Phone Number *</label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="+234 ..."
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Programme of Interest *</label>
            <select
              name="programme"
              required
              className="form-input"
              defaultValue=""
            >
              <option value="" disabled>
                Select a programme
              </option>
              {programmes.map((p) => (
                <option key={p.slug} value={p.title}>
                  {p.title}
                </option>
              ))}
              <option value="Startup Incubation Cohort">
                Startup Incubation Cohort
              </option>
              <option value="Other / Not Sure Yet">Other / Not Sure Yet</option>
            </select>
          </div>
        </div>

        {/* FULL APPLICATION EXTRA FIELDS */}
        {mode === "full" && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="form-label">Location / City *</label>
                <input
                  name="location"
                  type="text"
                  required
                  placeholder="e.g. Port Harcourt"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Highest Qualification</label>
                <select
                  name="qualification"
                  className="form-input"
                  defaultValue=""
                >
                  <option value="">Select (optional)</option>
                  <option>Secondary School</option>
                  <option>OND / NCE</option>
                  <option>HND / Bachelor&apos;s Degree</option>
                  <option>Postgraduate</option>
                  <option>Professional / Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Applicant Type *</label>
              <select
                name="applicantType"
                required
                className="form-input"
                defaultValue=""
              >
                <option value="" disabled>
                  Select applicant type
                </option>
                <option>UNIPORT Student</option>
                <option>UNIPORT Staff</option>
                <option>External / Public Learner</option>
                <option>Entrepreneur / Business Owner</option>
                <option>Community Member</option>
              </select>
            </div>

            <div>
              <label className="form-label">
                Supporting Document Name (optional)
              </label>
              <input
                name="documentName"
                type="text"
                placeholder="e.g. CV.pdf, Certificate.pdf"
                className="form-input"
              />
              <p className="mt-1.5 text-xs text-slate-400">
                Secure file upload will be enabled in an upcoming release. For
                now, please note the document you intend to submit.
              </p>
            </div>
          </>
        )}

        <div>
          <label className="form-label">
            {mode === "full"
              ? "Why do you want to join this programme?"
              : "Your Message / Area of Interest"}
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder={
              mode === "full"
                ? "Tell us about your goals and what you hope to achieve..."
                : "Tell us what you are interested in..."
            }
            className="form-input resize-none"
          />
        </div>

        {mode === "full" && (
          <label className="flex items-start gap-3 text-sm text-slate-600">
            <input
              name="declaration"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
            />
            <span>
              I confirm that the information provided is accurate and I consent
              to UPEC processing my details for this application. *
            </span>
          </label>
        )}

        {status === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {feedback}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              {mode === "full" ? (
                <>
                  <UserPlus size={18} />
                  Submit Application
                </>
              ) : (
                <>
                  Submit Interest
                  <Send size={18} />
                </>
              )}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
