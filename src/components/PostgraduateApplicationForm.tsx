"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Loader2, Upload, UserPlus, X } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2MB

const institutionRows = [
  { label: "Primary School", placeholder: "e.g. Government Primary School" },
  { label: "Secondary School", placeholder: "e.g. Comprehensive Secondary School" },
  { label: "Tertiary Institution", placeholder: "e.g. University of Port Harcourt" },
  { label: "Other / Postgraduate Institution", placeholder: "e.g. Professional institute" },
];

const referees = [1, 2, 3];

export default function PostgraduateApplicationForm({
  programme,
}: {
  programme: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [reference, setReference] = useState("");
  const [photo, setPhoto] = useState<string>("");
  const [photoName, setPhotoName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPhotoError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select an image file (JPG or PNG).");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Photo must be smaller than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    setPhoto("");
    setPhotoName("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fields: Record<string, string> = {};
    formData.forEach((value, key) => {
      fields[key] = String(value);
    });

    const education = institutionRows.map((row, i) => ({
      level: row.label,
      institution: fields[`institution_${i}`] || "",
      qualification: fields[`qualification_${i}`] || "",
      startDate: fields[`startDate_${i}`] || "",
      completionDate: fields[`completionDate_${i}`] || "",
      cgpa: fields[`cgpa_${i}`] || "",
    }));

    const refereeList = referees.map((n) => ({
      sn: n,
      name: fields[`refereeName_${n}`] || "",
      address: fields[`refereeAddress_${n}`] || "",
      email: fields[`refereeEmail_${n}`] || "",
      phone: fields[`refereePhone_${n}`] || "",
    }));

    const payload = {
      programme,
      photo,
      photoName,
      ...fields,
      education,
      referees: refereeList,
    };

    try {
      const res = await fetch("/api/application/postgraduate", {
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
        clearPhoto();
        window.scrollTo({ top: 0, behavior: "smooth" });
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
          Application Submitted!
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
          Please save this reference number and keep your payment teller safe
          for screening.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-primary mt-7">
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* PHOTO */}
      <section>
        <SectionTitle step="1" title="Upload Your Photo" />
        <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative grid h-32 w-28 shrink-0 place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
            {photo ? (
              <Image
                src={photo}
                alt="Passport photograph preview"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="px-2 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Passport Photo
              </span>
            )}
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
              id="photo-upload"
            />
            <div className="flex flex-wrap gap-3">
              <label
                htmlFor="photo-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#003b73] px-4 py-2.5 text-sm font-black text-white hover:bg-[#0070c9]"
              >
                <Upload size={16} />
                {photo ? "Change Photo" : "Choose Photo"}
              </label>
              {photo && (
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  <X size={16} />
                  Remove
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Recent passport photograph. JPG or PNG, maximum 2MB.
            </p>
            {photoName && (
              <p className="mt-1 text-xs font-semibold text-emerald-600">
                {photoName}
              </p>
            )}
            {photoError && (
              <p className="mt-1 text-xs font-semibold text-red-600">
                {photoError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* PERSONAL DETAILS */}
      <section>
        <SectionTitle step="2" title="Personal Details" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label="Name of Candidate (Surname First)"
            name="name"
            required
            placeholder="e.g. Okoro Chinedu James"
            full
          />
          <Field label="Former Name" name="formerName" placeholder="If any" />
          <Field label="Date of Birth" name="dateOfBirth" type="date" required />
          <Field label="Place of Birth" name="placeOfBirth" required />
          <Select
            label="Marital Status"
            name="maritalStatus"
            required
            options={["Single", "Married", "Divorced", "Widowed"]}
          />
          <Field label="Nationality" name="nationality" required defaultValue="Nigerian" />
          <Field label="State of Origin" name="stateOfOrigin" required />
          <Field label="Home Town" name="homeTown" required />
          <Field
            label="Present Employment"
            name="presentEmployment"
            placeholder="Employer and position"
          />
          <Field label="No. of Children" name="numberOfChildren" type="number" placeholder="0" />
          <Field label="Phone Number" name="phone" type="tel" required placeholder="+234 ..." />
          <Field label="Email Address" name="email" type="email" required placeholder="you@example.com" />
          <Textarea label="Present Address" name="presentAddress" required full />
        </div>
      </section>

      {/* NEXT OF KIN */}
      <section>
        <SectionTitle step="3" title="Next of Kin" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Name of Next of Kin" name="nokName" required />
          <Field label="Relationship with Next of Kin" name="nokRelationship" required />
          <Field label="Phone No. of Next of Kin" name="nokPhone" type="tel" required />
          <Field label="Address of Next of Kin" name="nokAddress" required />
        </div>
      </section>

      {/* EDUCATION */}
      <section>
        <SectionTitle
          step="4"
          title="Educational Institutions Attended"
          subtitle="List your last four institutions with dates and academic qualifications obtained."
        />
        <div className="mt-5 space-y-5">
          {institutionRows.map((row, i) => (
            <div
              key={row.label}
              className="rounded-2xl border border-slate-100 bg-[#f7fbff] p-5"
            >
              <p className="text-xs font-black uppercase tracking-wide text-[#0070c9]">
                {row.label}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Institution"
                  name={`institution_${i}`}
                  placeholder={row.placeholder}
                  required={i < 3}
                />
                <Field
                  label="Qualification"
                  name={`qualification_${i}`}
                  placeholder="e.g. B.Sc, WAEC, FSLC"
                  required={i < 3}
                />
                <Field label="Start Date" name={`startDate_${i}`} type="month" required={i < 3} />
                <Field
                  label="Completion Date"
                  name={`completionDate_${i}`}
                  type="month"
                  required={i < 3}
                />
                <Field label="CGPA / Grade" name={`cgpa_${i}`} placeholder="e.g. 3.85 or Upper Credit" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            label="Cumulative Grade Point Average"
            name="cgpa"
            required
            placeholder="e.g. 3.85"
          />
          <Select
            label="Scale"
            name="cgpaScale"
            required
            options={["4 Point Scale", "5 Point Scale", "7 Point Scale", "Other"]}
          />
          <Field label="Language Spoken" name="languageSpoken" required placeholder="e.g. English, Igbo" />
          <Field label="Language Written" name="languageWritten" required placeholder="e.g. English" />
          <Field
            label="Certificate Received"
            name="certificateReceived"
            full
            placeholder="List certificates already received"
          />
        </div>
      </section>

      {/* PROGRAMME */}
      <section>
        <SectionTitle step="5" title="Programme Applied For" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="form-label">Degree / Diploma Aimed At *</label>
            <input
              name="degreeAimedAt"
              readOnly
              value={programme}
              className="form-input bg-slate-50 font-semibold text-[#003b73]"
            />
          </div>
          <Field
            label="Area of Specialisation"
            name="areaOfSpecialisation"
            required
            placeholder="e.g. Small Business Management"
          />
          <Select
            label="Mode of Study"
            name="modeOfStudy"
            required
            options={["Full Time", "Part Time"]}
          />
          <Textarea
            label="Major Research Interest"
            name="researchInterest"
            required
            full
            placeholder="Briefly describe your research interest"
          />
          <Select
            label="Hostel Accommodation Required?"
            name="hostelRequired"
            required
            options={["Yes", "No"]}
          />
          <Field label="Candidate's Sponsor" name="sponsorName" required placeholder="e.g. Self, Employer, Parent" />
          <Textarea label="Candidate's Sponsor's Address" name="sponsorAddress" required full />
        </div>
      </section>

      {/* REFEREES */}
      <section>
        <SectionTitle
          step="6"
          title="Referees"
          subtitle="Provide the names, addresses and emails of three (3) referees."
        />
        <div className="mt-5 space-y-5">
          {referees.map((n) => (
            <div
              key={n}
              className="rounded-2xl border border-slate-100 bg-[#f7fbff] p-5"
            >
              <p className="text-xs font-black uppercase tracking-wide text-[#0070c9]">
                Referee {n}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Name of Referee" name={`refereeName_${n}`} required />
                <Field label="Address" name={`refereeAddress_${n}`} required />
                <Field label="Email" name={`refereeEmail_${n}`} type="email" required />
                <Field label="Phone No." name={`refereePhone_${n}`} type="tel" required />
              </div>
            </div>
          ))}
        </div>
      </section>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          name="declaration"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
        />
        <span>
          I confirm that the information provided in this application is true
          and accurate, and I consent to UPEC processing my details for the
          purpose of this application. *
        </span>
      </label>

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
            <UserPlus size={18} />
            Submit Application
          </>
        )}
      </button>
    </form>
  );
}

/* ---------- small field helpers ---------- */

function SectionTitle({
  step,
  title,
  subtitle,
}: {
  step: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e3f2ff] text-sm font-black text-[#003b73]">
          {step}
        </span>
        <h3 className="text-lg font-black text-[#003b73]">{title}</h3>
      </div>
      {subtitle && (
        <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label className="form-label">
        {label} {required && "*"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="form-input"
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  required,
  placeholder,
  full,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label className="form-label">
        {label} {required && "*"}
      </label>
      <textarea
        name={name}
        rows={3}
        required={required}
        placeholder={placeholder}
        className="form-input resize-none"
      />
    </div>
  );
}

function Select({
  label,
  name,
  required,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <div>
      <label className="form-label">
        {label} {required && "*"}
      </label>
      <select name={name} required={required} defaultValue="" className="form-input">
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
