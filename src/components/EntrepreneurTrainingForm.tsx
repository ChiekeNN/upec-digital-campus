"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  Loader2,
  Printer,
  ShieldAlert,
  Sparkles,
  Upload,
  User,
  Wrench,
  X,
} from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

/* ---------------------------------------------------------------
   Nigerian date format helpers — DD/MM/YY
---------------------------------------------------------------- */

/** Formats a JS Date as DD/MM/YYYY (Nigerian / UK style). */
function toNgDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}

/** Masks free typing into DD/MM/YY (or DD/MM/YYYY) as the user types. */
function maskNgDate(input: string, longYear = false): string {
  const digits = input.replace(/\D/g, "").slice(0, longYear ? 8 : 6);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)];
  return parts.filter(Boolean).join("/");
}

/** Validates a DD/MM/YY or DD/MM/YYYY string and checks the day exists. */
function isValidNgDate(value: string, longYear = false): boolean {
  const pattern = longYear
    ? /^(\d{2})\/(\d{2})\/(\d{4})$/
    : /^(\d{2})\/(\d{2})\/(\d{2})$/;
  const match = pattern.exec(value);
  if (!match) return false;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = longYear ? Number(match[3]) : 2000 + Number(match[3]);
  if (month < 1 || month > 12 || day < 1) return false;
  if (longYear && (year < 1900 || year > new Date().getFullYear() + 10))
    return false;
  return day <= new Date(year, month, 0).getDate();
}

const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2MB

const qualifications = [
  "Primary",
  "Secondary",
  "NCE/OND",
  "HND/B.Sc.",
  "M.Sc.",
  "Ph.D.",
];

const employmentStatuses = [
  "Employed",
  "Self-employed",
  "Unemployed",
  "Student",
  "Other",
];

export const trainingInterestOptions = [
  "Fashion & Designing",
  "Shoe Making",
  "Catering & Baking",
  "Driving",
  "Paint Production",
  "Soap Making",
  "AI & Coding",
  "Hair Dressing & Styling",
  "Welding & Fabrication",
  "Perfume Production",
  "Photography",
  "Videography",
  "Others",
];

const programmePresets = [
  "UPEC Entrepreneurial Skills Acquisition",
  "GES 400.2 Practical Projects",
  "UPEC / Partner Empowerment Programme",
  "UPEC Fashion & Innovation Hub Cohort",
];

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

type SubmittedSummary = {
  reference: string;
  photo: string;
  programmeOrganisation: string;
  trainingTitle: string;
  trainingDate: string;
  venue: string;
  fullName: string;
  gender: string;
  phone: string;
  email: string;
  stateOfOrigin: string;
  lga: string;
  highestQualification: string;
  employmentStatus: string;
  ownsBusiness: string;
  trainingInterests: string[];
  otherTrainingInterest: string;
  declarationName: string;
  declarationDate: string;
};

export default function EntrepreneurTrainingForm({
  preselectedTrack,
}: {
  preselectedTrack?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState<SubmittedSummary | null>(null);

  // Photo state
  const [photo, setPhoto] = useState<string>("");
  const [photoName, setPhotoName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Interactive selections
  const [programmeOrg, setProgrammeOrg] = useState("");
  const [trainingTitle, setTrainingTitle] = useState("");
  const [venue, setVenue] = useState("UPEC Centre, Abuja Park, UNIPORT");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [ownsBusiness, setOwnsBusiness] = useState<string>("No");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [furtherSupport, setFurtherSupport] = useState("Yes");
  const [declarationName, setDeclarationName] = useState("");
  const [declarationDate, setDeclarationDate] = useState(() =>
    toNgDate(new Date()),
  );
  const [declarationChecked, setDeclarationChecked] = useState(false);

  useEffect(() => {
    if (
      preselectedTrack &&
      trainingInterestOptions.includes(preselectedTrack)
    ) {
      setSelectedInterests((prev) =>
        prev.includes(preselectedTrack) ? prev : [...prev, preselectedTrack],
      );
      if (!trainingTitle) {
        setTrainingTitle(`${preselectedTrack} Practical Training`);
      }
    }
  }, [preselectedTrack, trainingTitle]);

  function toggleInterest(item: string) {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPhotoError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select an image file (JPG or PNG).");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Passport photo must be smaller than 2MB.");
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

  // Compute completion progress across the 7 sections
  const completedSections = [
    Boolean(fullName && gender),
    Boolean(highestQualification && employmentStatus),
    Boolean(ownsBusiness),
    selectedInterests.length > 0,
    Boolean(furtherSupport),
    Boolean(programmeOrg || trainingTitle),
    Boolean(declarationChecked && (declarationName || fullName)),
  ].filter(Boolean).length;
  const progressPercent = Math.round((completedSections / 7) * 100);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      setStatus("error");
      setFeedback(
        "Please select at least one Area of Training Interest in Section D.",
      );
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fields: Record<string, string> = {};
    formData.forEach((value, key) => {
      fields[key] = String(value);
    });

    // All dates must be valid Nigerian format: DD/MM/YY
    const dateFields: [string, string, boolean][] = [
      ["Training Date", fields.trainingDate || "", true],
      ["Date of Birth", fields.dateOfBirth || "", true],
      ["Declaration Date", declarationDate || fields.declarationDate || "", true],
    ];
    const badDate = dateFields.find(
      ([, value, longYear]) => !isValidNgDate(value, longYear),
    );
    if (!badDate) {
      // Date of birth must not be in the future
      const [d, m, y] = (fields.dateOfBirth || "").split("/").map(Number);
      if (new Date(y, m - 1, d).getTime() > Date.now()) {
        setStatus("error");
        setFeedback("Date of Birth cannot be in the future.");
        return;
      }
    }
    if (badDate) {
      setStatus("error");
      setFeedback(
        `Please enter a valid ${badDate[0]} in ${
          badDate[2] ? "DD/MM/YYYY" : "DD/MM/YY"
        } format.`,
      );
      return;
    }

    setStatus("loading");
    setFeedback("");

    const payload = {
      photo,
      photoName,
      programmeOrganisation: programmeOrg || fields.programmeOrganisation || "",
      trainingTitle: trainingTitle || fields.trainingTitle || "",
      trainingDate: fields.trainingDate || "",
      venue: venue || fields.venue || "",
      fullName: fullName || fields.fullName || "",
      gender,
      dateOfBirth: fields.dateOfBirth || "",
      phone: fields.phone || "",
      email: fields.email || "",
      stateOfOrigin: fields.stateOfOrigin || "",
      residentialAddress: fields.residentialAddress || "",
      lga: fields.lga || "",
      highestQualification,
      occupation: fields.occupation || "",
      employmentStatus,
      employmentOther: fields.employmentOther || "",
      ownsBusiness,
      businessName: fields.businessName || "",
      businessType: fields.businessType || "",
      yearsInBusiness: fields.yearsInBusiness || "",
      businessLocation: fields.businessLocation || "",
      intendedBusinessType: fields.intendedBusinessType || "",
      trainingInterests: selectedInterests,
      otherTrainingInterest: fields.otherTrainingInterest || "",
      trainingExpectations: fields.trainingExpectations || "",
      businessChallenge: fields.businessChallenge || "",
      furtherSupport,
      emergencyName: fields.emergencyName || "",
      emergencyRelationship: fields.emergencyRelationship || "",
      emergencyPhone: fields.emergencyPhone || "",
      declarationName: declarationName || fullName || fields.fullName || "",
      declarationDate: declarationDate || fields.declarationDate || "",
    };

    try {
      const res = await fetch("/api/application/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setFeedback(result.message);
        setSubmitted({
          reference: result.reference,
          photo,
          programmeOrganisation: payload.programmeOrganisation,
          trainingTitle: payload.trainingTitle,
          trainingDate: payload.trainingDate,
          venue: payload.venue,
          fullName: payload.fullName,
          gender: payload.gender,
          phone: payload.phone,
          email: payload.email,
          stateOfOrigin: payload.stateOfOrigin,
          lga: payload.lga,
          highestQualification: payload.highestQualification,
          employmentStatus: payload.employmentStatus,
          ownsBusiness: payload.ownsBusiness,
          trainingInterests: payload.trainingInterests,
          otherTrainingInterest: payload.otherTrainingInterest,
          declarationName: payload.declarationName,
          declarationDate: payload.declarationDate,
        });
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

  if (status === "success" && submitted) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 text-center sm:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white shadow-lg">
            <CheckCircle2 size={32} />
          </div>
          <span className="mt-4 inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-emerald-800">
            Registration Confirmed
          </span>
          <h3 className="mt-3 text-2xl font-black text-[#003b73]">
            Entrepreneur Training Registration Complete!
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
            {feedback}
          </p>

          {/* OFFICIAL PRINTABLE SLIP */}
          <div className="mt-8 rounded-3xl border-2 border-[#003b73]/15 bg-white p-6 text-left shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <img
                  src="/uniport-logo.png"
                  alt="UNIPORT Logo"
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#0070c9]">
                    University of Port Harcourt Entrepreneurial Centre
                  </p>
                  <h4 className="text-base font-black text-[#003b73]">
                    Entrepreneur Training Registration Slip
                  </h4>
                </div>
              </div>
              <div className="rounded-2xl bg-[#f7fbff] px-4 py-2.5 text-right">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Reference ID
                </p>
                <p className="text-base font-black text-[#003b73]">
                  {submitted.reference}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-[120px_1fr]">
              <div className="mx-auto flex flex-col items-center sm:mx-0">
                <div className="relative grid h-32 w-28 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  {submitted.photo ? (
                    <Image
                      src={submitted.photo}
                      alt="Participant Passport"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <span className="px-2 text-center text-[10px] font-bold uppercase text-slate-400">
                      Passport Photo
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Full Name
                  </span>
                  <p className="font-black text-[#003b73]">
                    {submitted.fullName}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Gender / Phone
                  </span>
                  <p className="font-semibold text-slate-700">
                    {submitted.gender || "—"} · {submitted.phone}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Email Address
                  </span>
                  <p className="font-semibold text-slate-700">
                    {submitted.email}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">
                    State / LGA
                  </span>
                  <p className="font-semibold text-slate-700">
                    {submitted.stateOfOrigin || "—"} / {submitted.lga || "—"}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Programme / Organisation
                  </span>
                  <p className="font-semibold text-slate-700">
                    {submitted.programmeOrganisation || "UPEC Entrepreneur Training"}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Training Title & Venue
                  </span>
                  <p className="font-semibold text-slate-700">
                    {submitted.trainingTitle || "Skills Acquisition"}{" "}
                    {submitted.venue ? `(${submitted.venue})` : ""}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Selected Areas of Training Interest
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {submitted.trainingInterests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-[#e3f2ff] px-3 py-1 text-xs font-extrabold text-[#003b73]"
                      >
                        {interest}
                      </span>
                    ))}
                    {submitted.otherTrainingInterest && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
                        Other: {submitted.otherTrainingInterest}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span>
                Declarant:{" "}
                <strong className="text-slate-700">
                  {submitted.declarationName}
                </strong>
              </span>
              <span>
                Date:{" "}
                <strong className="text-slate-700">
                  {submitted.declarationDate}
                </strong>
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-primary bg-[#003b73]"
            >
              <Printer size={17} />
              Print / Save Registration Slip
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setSubmitted(null);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-[#003b73] hover:bg-slate-50"
            >
              Register Another Participant
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* PROGRESS & FORM HEADER BANNER */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-[#f0f7ff] via-white to-[#fef9ec] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#0070c9]">
              Official UPEC Portal Form
            </span>
            <h3 className="mt-0.5 text-lg font-black text-[#003b73]">
              ENTREPRENEUR TRAINING REGISTRATION FORM
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500">
                Form Completion
              </span>
              <p className="text-sm font-black text-[#003b73]">
                {progressPercent}%
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              title="Print Form"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#003b73] hover:text-[#003b73]"
            >
              <Printer size={15} />
              Print Form
            </button>
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#003b73] to-[#0070c9] transition-all duration-300"
            style={{ width: `${Math.max(10, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* TOP SECTION: UPLOAD PASSPORT & PROGRAMME / ORGANISATION DETAILS */}
      <section className="rounded-3xl border border-slate-100 bg-[#f7fbff]/70 p-6 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* UPLOAD PASSPORT */}
          <div className="flex flex-col items-center rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-xs">
            <p className="text-xs font-black uppercase tracking-wider text-[#003b73]">
              Upload Passport
            </p>
            <div className="relative mt-3 grid h-36 w-32 place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-blue-200 bg-slate-50">
              {photo ? (
                <Image
                  src={photo}
                  alt="Passport preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="px-3 text-center">
                  <Upload size={22} className="mx-auto text-[#0070c9]" />
                  <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Passport Photograph
                  </span>
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
              id="training-passport-upload"
            />
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <label
                htmlFor="training-passport-upload"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#003b73] px-3.5 py-2 text-xs font-black text-white transition hover:bg-[#0070c9]"
              >
                <Upload size={14} />
                {photo ? "Change" : "Upload Photo"}
              </label>
              {photo && (
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              JPG or PNG (Max 2MB)
            </p>
            {photoName && (
              <p className="mt-1 max-w-[180px] truncate text-[11px] font-semibold text-emerald-600">
                {photoName}
              </p>
            )}
            {photoError && (
              <p className="mt-1 text-[11px] font-semibold text-red-600">
                {photoError}
              </p>
            )}
          </div>

          {/* PROGRAMME / ORGANISATION, TRAINING TITLE, DATE, VENUE */}
          <div className="space-y-4">
            <div>
              <label className="form-label">
                Programme / Organisation *
              </label>
              <input
                name="programmeOrganisation"
                type="text"
                required
                value={programmeOrg}
                onChange={(e) => setProgrammeOrg(e.target.value)}
                placeholder="e.g. UPEC Skills Acquisition / GES 400.2 / Partner Organisation"
                className="form-input bg-white"
              />
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400">
                  Quick fill:
                </span>
                {programmePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setProgrammeOrg(preset)}
                    className="rounded-full border border-blue-100 bg-white px-2.5 py-1 text-[11px] font-bold text-[#003b73] transition hover:border-[#0070c9] hover:bg-blue-50"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label className="form-label">Training Title *</label>
                <input
                  name="trainingTitle"
                  type="text"
                  required
                  value={trainingTitle}
                  onChange={(e) => setTrainingTitle(e.target.value)}
                  placeholder="e.g. Vocational & Enterprise Training"
                  className="form-input bg-white"
                />
              </div>
              <NgDateField
                label="Date"
                name="trainingDate"
                required
                longYear
                defaultValue={toNgDate(new Date())}
                className="form-input bg-white"
              />
              <div>
                <label className="form-label">Venue *</label>
                <input
                  name="venue"
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. UPEC Hall, UNIPORT"
                  className="form-input bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION A: PERSONAL INFORMATION */}
      <section>
        <SectionTitle
          step="A"
          icon={User}
          title="PERSONAL INFORMATION"
          subtitle="Provide your accurate personal and contact details."
        />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="form-label">Full Name *</label>
            <input
              name="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (!declarationName) setDeclarationName(e.target.value);
              }}
              placeholder="Enter your surname, first name, and middle name"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Gender *</label>
            <div className="grid grid-cols-2 gap-3">
              {["Male", "Female"].map((g) => {
                const active = gender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-extrabold transition ${
                      active
                        ? "border-[#003b73] bg-[#003b73] text-white shadow-xs"
                        : "border-slate-200 bg-[#f8fafc] text-slate-700 hover:border-[#0070c9]"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 place-items-center rounded border text-[10px] ${
                        active
                          ? "border-white bg-white text-[#003b73]"
                          : "border-slate-400"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                    {g}
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="gender" value={gender} required />
          </div>

          <NgDateField label="Date of Birth" name="dateOfBirth" required longYear />
          <Field
            label="Phone Number"
            name="phone"
            type="tel"
            required
            placeholder="e.g. 08012345678"
          />
          <Field
            label="Email Address"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />

          <div>
            <label className="form-label">State of Origin *</label>
            <input
              name="stateOfOrigin"
              list="nigerian-states-list"
              required
              placeholder="Select or type State of Origin"
              className="form-input"
            />
            <datalist id="nigerian-states-list">
              {nigerianStates.map((st) => (
                <option key={st} value={st} />
              ))}
            </datalist>
          </div>

          <Field
            label="LGA (Local Government Area)"
            name="lga"
            required
            placeholder="e.g. Obio/Akpor"
          />

          <Textarea
            label="Residential Address"
            name="residentialAddress"
            required
            full
            placeholder="Enter your current residential address"
          />
        </div>
      </section>

      {/* SECTION B: EDUCATIONAL / PROFESSIONAL BACKGROUND */}
      <section>
        <SectionTitle
          step="B"
          icon={GraduationCap}
          title="EDUCATIONAL / PROFESSIONAL BACKGROUND"
          subtitle="Select your highest academic qualification and current employment status."
        />
        <div className="mt-5 space-y-5">
          <div>
            <label className="form-label">Highest Qualification *</label>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {qualifications.map((q) => {
                const active = highestQualification === q;
                return (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setHighestQualification(q)}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-extrabold transition ${
                      active
                        ? "border-[#003b73] bg-[#003b73] text-white shadow-xs"
                        : "border-slate-200 bg-[#f8fafc] text-slate-700 hover:border-[#0070c9]"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px] ${
                        active
                          ? "border-white bg-white text-[#003b73]"
                          : "border-slate-400"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                    <span>{q}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Field
            label="Occupation / Profession"
            name="occupation"
            required
            placeholder="e.g. Student, Civil Servant, Trader, Engineer, Artisan"
            full
          />

          <div>
            <label className="form-label">Employment Status *</label>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {employmentStatuses.map((statusOption) => {
                const active = employmentStatus === statusOption;
                return (
                  <button
                    key={statusOption}
                    type="button"
                    onClick={() => setEmploymentStatus(statusOption)}
                    className={`flex items-center gap-2 rounded-xl border px-3.5 py-3 text-left text-xs font-extrabold transition sm:text-sm ${
                      active
                        ? "border-[#003b73] bg-[#003b73] text-white shadow-xs"
                        : "border-slate-200 bg-[#f8fafc] text-slate-700 hover:border-[#0070c9]"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px] ${
                        active
                          ? "border-white bg-white text-[#003b73]"
                          : "border-slate-400"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                    <span>{statusOption}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Field
            label="Other (If Employment Status is 'Other', please specify)"
            name="employmentOther"
            required={employmentStatus === "Other"}
            placeholder="Specify other employment status if applicable"
            full
          />
        </div>
      </section>

      {/* SECTION C: ENTREPRENEURSHIP INFORMATION */}
      <section>
        <SectionTitle
          step="C"
          icon={Briefcase}
          title="ENTREPRENEURSHIP INFORMATION"
          subtitle="Tell us about your current business or the venture you aspire to start."
        />
        <div className="mt-5 space-y-5">
          <div>
            <label className="form-label">
              Do you currently own/operate a business? *
            </label>
            <div className="mt-2 grid max-w-md grid-cols-2 gap-3">
              {["Yes", "No"].map((choice) => {
                const active = ownsBusiness === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setOwnsBusiness(choice)}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-extrabold transition ${
                      active
                        ? "border-[#003b73] bg-[#003b73] text-white shadow-xs"
                        : "border-slate-200 bg-[#f8fafc] text-slate-700 hover:border-[#0070c9]"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 place-items-center rounded border text-[10px] ${
                        active
                          ? "border-white bg-white text-[#003b73]"
                          : "border-slate-400"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`grid gap-5 rounded-2xl border p-5 transition sm:grid-cols-2 ${
              ownsBusiness === "Yes"
                ? "border-blue-200 bg-[#f7fbff]"
                : "border-slate-100 bg-slate-50/60"
            }`}
          >
            <Field
              label="Business Name"
              name="businessName"
              required={ownsBusiness === "Yes"}
              placeholder="Enter registered or trading business name"
            />
            <Field
              label="Type / Nature of Business"
              name="businessType"
              required={ownsBusiness === "Yes"}
              placeholder="e.g. Retail, Fashion, Agro-processing, Tech"
            />
            <Field
              label="Years in Business"
              name="yearsInBusiness"
              placeholder="e.g. 2 years"
            />
            <Field
              label="Business Location"
              name="businessLocation"
              placeholder="e.g. Choba, Port Harcourt"
            />
          </div>

          <div
            className={`rounded-2xl border p-5 transition ${
              ownsBusiness === "No"
                ? "border-amber-200 bg-amber-50/40"
                : "border-slate-100 bg-white"
            }`}
          >
            <Field
              label="If no business, what type would you like to start?"
              name="intendedBusinessType"
              required={ownsBusiness === "No"}
              placeholder="Describe the type of business or enterprise you would like to start"
              full
            />
          </div>
        </div>
      </section>

      {/* SECTION D: AREAS OF TRAINING INTEREST */}
      <section>
        <SectionTitle
          step="D"
          icon={Wrench}
          title="AREAS OF TRAINING INTEREST"
          subtitle="Tick one or more practical skill areas you wish to register for."
        />
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trainingInterestOptions.map((item) => {
            const checked = selectedInterests.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleInterest(item)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-extrabold transition ${
                  checked
                    ? "border-[#003b73] bg-[#003b73] text-white shadow-sm"
                    : "border-slate-200 bg-[#f8fafc] text-slate-700 hover:border-[#0070c9] hover:bg-[#f0f7ff]"
                }`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs ${
                    checked
                      ? "border-[#f7b733] bg-[#f7b733] font-black text-[#003b73]"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {checked ? "✓" : ""}
                </span>
                <span>{item}</span>
              </button>
            );
          })}
        </div>

        {selectedInterests.includes("Others") && (
          <div className="mt-4">
            <Field
              label="Please specify other area(s) of training interest"
              name="otherTrainingInterest"
              required
              placeholder="Enter any other skill or training area"
              full
            />
          </div>
        )}
      </section>

      {/* SECTION E: TRAINING EXPECTATIONS */}
      <section>
        <SectionTitle
          step="E"
          icon={Sparkles}
          title="TRAINING EXPECTATIONS"
          subtitle="Share your learning goals and post-training mentorship preferences."
        />
        <div className="mt-5 space-y-5">
          <Textarea
            label="What do you expect to gain from this training?"
            name="trainingExpectations"
            required
            placeholder="Describe the practical skills, certification, or business outcomes you hope to achieve..."
            full
          />

          <Textarea
            label="What major challenge do you face in starting/managing a business?"
            name="businessChallenge"
            required
            placeholder="e.g. Access to startup capital, equipment, mentorship, market access, bookkeeping..."
            full
          />

          <div>
            <label className="form-label">
              Interested in further support after training? (Mentorship,
              Incubation, Microfinance Linkages) *
            </label>
            <div className="mt-2 grid max-w-md grid-cols-2 gap-3">
              {["Yes", "No"].map((choice) => {
                const active = furtherSupport === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setFurtherSupport(choice)}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-extrabold transition ${
                      active
                        ? "border-[#003b73] bg-[#003b73] text-white shadow-xs"
                        : "border-slate-200 bg-[#f8fafc] text-slate-700 hover:border-[#0070c9]"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 place-items-center rounded border text-[10px] ${
                        active
                          ? "border-white bg-white text-[#003b73]"
                          : "border-slate-400"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: EMERGENCY CONTACT */}
      <section>
        <SectionTitle
          step="F"
          icon={ShieldAlert}
          title="EMERGENCY CONTACT"
          subtitle="Provide details of someone we can reach in case of an emergency."
        />
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <Field
            label="Name"
            name="emergencyName"
            required
            placeholder="Full name of emergency contact"
          />
          <Field
            label="Relationship"
            name="emergencyRelationship"
            required
            placeholder="e.g. Parent, Spouse, Sibling, Guardian"
          />
          <Field
            label="Phone Number"
            name="emergencyPhone"
            type="tel"
            required
            placeholder="+234 ..."
          />
        </div>
      </section>

      {/* SECTION G: DECLARATION */}
      <section className="rounded-3xl border border-blue-100 bg-[#f7fbff] p-6 sm:p-7">
        <SectionTitle
          step="G"
          icon={FileCheck2}
          title="DECLARATION"
          subtitle="Please read and affirm the declaration below to complete your registration."
        />

        <label className="mt-5 flex cursor-pointer items-start gap-3.5 rounded-2xl border border-blue-200/80 bg-white p-4 text-sm leading-6 text-slate-700 shadow-2xs">
          <input
            name="declaration"
            type="checkbox"
            required
            checked={declarationChecked}
            onChange={(e) => setDeclarationChecked(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-[#003b73]"
          />
          <span className="italic font-semibold text-[#003b73]">
            &ldquo;I confirm that the information provided is accurate to the
            best of my knowledge and agree to participate actively in the
            training programme.&rdquo; *
          </span>
        </label>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="form-label">Name (Declarant Full Name) *</label>
            <input
              name="declarationName"
              type="text"
              required
              value={declarationName}
              onChange={(e) => setDeclarationName(e.target.value)}
              placeholder="Type your full name as digital signature"
              className="form-input bg-white font-semibold text-[#003b73]"
            />
          </div>
          <NgDateField
            label="Date"
            name="declarationDate"
            required
            longYear
            value={declarationDate}
            onChange={setDeclarationDate}
            className="form-input bg-white"
          />
        </div>
      </section>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={19} className="animate-spin" />
            Submitting Registration...
          </>
        ) : (
          <>
            <ClipboardCheck size={19} />
            Submit Entrepreneur Training Registration
          </>
        )}
      </button>
    </form>
  );
}

/* ---------- Helper UI subcomponents ---------- */

function SectionTitle({
  step,
  icon: Icon,
  title,
  subtitle,
}: {
  step: string;
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#003b73] text-sm font-black text-white shadow-xs">
          {step}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[#0070c9]">
            <Icon size={18} />
          </span>
          <h3 className="text-base font-black tracking-tight text-[#003b73] sm:text-lg">
            {title}
          </h3>
        </div>
      </div>
      {subtitle && (
        <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function NgDateField({
  label,
  name,
  required,
  value,
  onChange,
  defaultValue,
  full,
  longYear = false,
  className = "form-input",
}: {
  label: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  full?: boolean;
  /** Use a four-digit year (DD/MM/YYYY) instead of DD/MM/YY. */
  longYear?: boolean;
  className?: string;
}) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const controlled = value !== undefined;
  const current = controlled ? value : internal;
  const maxLength = longYear ? 10 : 8;
  const format = longYear ? "DD/MM/YYYY" : "DD/MM/YY";
  const invalid =
    current.length === maxLength && !isValidNgDate(current, longYear);

  function handleChange(raw: string) {
    const masked = maskNgDate(raw, longYear);
    if (!controlled) setInternal(masked);
    onChange?.(masked);
  }

  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label className="form-label">
        {label} {required && "*"}{" "}
        <span className="text-xs font-semibold text-slate-400">({format})</span>
      </label>
      <input
        name={name}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        required={required}
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={format}
        maxLength={maxLength}
        pattern={longYear ? "\d{2}/\d{2}/\d{4}" : "\d{2}/\d{2}/\d{2}"}
        title={
          longYear
            ? "Enter the date as DD/MM/YYYY, e.g. 05/03/1990"
            : "Enter the date as DD/MM/YY, e.g. 02/10/26"
        }
        className={className}
      />
      {invalid && (
        <p className="mt-1 text-xs font-semibold text-red-600">
          Please enter a valid date in {format} format.
        </p>
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
