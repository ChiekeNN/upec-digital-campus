"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      type: "contact",
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setFeedback(result.message);
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
          Message Sent!
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-700">
          {feedback}
        </p>
        <button onClick={() => setStatus("idle")} className="btn-primary mt-7">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          <label className="form-label">Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="+234 ..."
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Subject</label>
          <input
            name="subject"
            type="text"
            placeholder="How can we help?"
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Message *</label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Write your message here..."
          className="form-input resize-none"
        />
      </div>

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
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
