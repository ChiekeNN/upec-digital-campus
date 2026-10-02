import dns from "node:dns";
import nodemailer from "nodemailer";

// Prefer IPv4 when resolving SMTP hosts — some hosting environments
// have no IPv6 route to Gmail (ENETUNREACH on AAAA records).
dns.setDefaultResultOrder("ipv4first");

/**
 * Recipient for ALL website form notifications (Contact, Applications,
 * Postgraduate Applications, Entrepreneur Training Registration).
 * Defaults to chiekenn@gmail.com; override with the NOTIFICATION_EMAIL env var.
 */
export const NOTIFICATION_RECIPIENT =
  process.env.NOTIFICATION_EMAIL || "chiekenn@gmail.com";

export type TrainingRegistrationPayload = {
  reference?: string;
  photo?: string;
  photoName?: string;
  programmeOrganisation?: string;
  trainingTitle?: string;
  trainingDate?: string;
  venue?: string;
  fullName?: string;
  gender?: string;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
  stateOfOrigin?: string;
  residentialAddress?: string;
  lga?: string;
  highestQualification?: string;
  occupation?: string;
  employmentStatus?: string;
  employmentOther?: string;
  ownsBusiness?: string;
  businessName?: string;
  businessType?: string;
  yearsInBusiness?: string;
  businessLocation?: string;
  intendedBusinessType?: string;
  trainingInterests?: string[];
  otherTrainingInterest?: string;
  trainingExpectations?: string;
  businessChallenge?: string;
  furtherSupport?: string;
  emergencyName?: string;
  emergencyRelationship?: string;
  emergencyPhone?: string;
  declarationName?: string;
  declarationDate?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function row(label: string, value: string | undefined | null): string {
  const v = (value || "").trim();
  if (!v) return "";
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eef2f7;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;width:220px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eef2f7;font-size:14px;color:#0f172a;vertical-align:top;">${escapeHtml(v).replace(/\n/g, "<br/>")}</td>
    </tr>`;
}

function sectionTitle(title: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:16px 12px 6px;font-size:13px;font-weight:800;color:#003b73;text-transform:uppercase;letter-spacing:.08em;background:#f0f7ff;">${escapeHtml(title)}</td>
    </tr>`;
}

/** Split a base64 data URL (e.g. "data:image/png;base64,...") for attachment. */
function parseDataUrl(dataUrl: string): { content: Buffer; contentType: string } | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return { contentType: match[1], content: Buffer.from(match[2], "base64") };
}

export function buildRegistrationEmail(data: TrainingRegistrationPayload) {
  const reference = data.reference || "N/A";
  const name = (data.fullName || "New Applicant").trim();

  const interests =
    Array.isArray(data.trainingInterests) && data.trainingInterests.length > 0
      ? data.trainingInterests.join(", ") +
        (data.otherTrainingInterest ? ` (Other: ${data.otherTrainingInterest})` : "")
      : data.otherTrainingInterest || "";

  const html = `
  <div style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:720px;margin:0 auto;">
      <div style="background:#003b73;border-radius:12px 12px 0 0;padding:20px 24px;">
        <p style="margin:0;font-size:11px;font-weight:700;color:#9dc3e8;text-transform:uppercase;letter-spacing:.12em;">University of Port Harcourt Entrepreneurial Centre</p>
        <h1 style="margin:4px 0 0;font-size:20px;color:#ffffff;">New Entrepreneur Training Registration</h1>
        <p style="margin:8px 0 0;font-size:13px;color:#cfe3f5;">Reference: <strong>${escapeHtml(reference)}</strong> &middot; Submitted ${escapeHtml(new Date().toUTCString())}</p>
      </div>

      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:8px 16px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${sectionTitle("Programme Details")}
          ${row("Programme / Organisation", data.programmeOrganisation)}
          ${row("Training Title", data.trainingTitle)}
          ${row("Training Date", data.trainingDate)}
          ${row("Venue", data.venue)}

          ${sectionTitle("A. Personal Information")}
          ${row("Full Name", data.fullName)}
          ${row("Gender", data.gender)}
          ${row("Date of Birth", data.dateOfBirth)}
          ${row("Phone Number", data.phone)}
          ${row("Email Address", data.email)}
          ${row("State of Origin", data.stateOfOrigin)}
          ${row("LGA", data.lga)}
          ${row("Residential Address", data.residentialAddress)}

          ${sectionTitle("B. Educational / Professional Background")}
          ${row("Highest Qualification", data.highestQualification)}
          ${row("Occupation", data.occupation)}
          ${row("Employment Status", data.employmentStatus)}
          ${row("Employment (Other)", data.employmentOther)}

          ${sectionTitle("C. Entrepreneurship Information")}
          ${row("Owns/Operates a Business", data.ownsBusiness)}
          ${row("Business Name", data.businessName)}
          ${row("Type / Nature of Business", data.businessType)}
          ${row("Years in Business", data.yearsInBusiness)}
          ${row("Business Location", data.businessLocation)}
          ${row("Intended Business Type", data.intendedBusinessType)}

          ${sectionTitle("D. Areas of Training Interest")}
          ${row("Training Interests", interests)}

          ${sectionTitle("E. Training Expectations")}
          ${row("Expectations from Training", data.trainingExpectations)}
          ${row("Major Business Challenge", data.businessChallenge)}
          ${row("Wants Further Support", data.furtherSupport)}

          ${sectionTitle("F. Emergency Contact")}
          ${row("Name", data.emergencyName)}
          ${row("Relationship", data.emergencyRelationship)}
          ${row("Phone Number", data.emergencyPhone)}

          ${sectionTitle("G. Declaration")}
          ${row("Declarant Name", data.declarationName)}
          ${row("Declaration Date", data.declarationDate)}
        </table>

        <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">
          This registration was submitted via the UPEC Digital Campus Entrepreneur Training Registration form.
          ${data.photo ? "The participant's passport photograph is attached to this email." : ""}
        </p>
      </div>
    </div>
  </div>`;

  const textLines: Array<[string, string | undefined]> = [
    ["Reference", reference],
    ["Programme / Organisation", data.programmeOrganisation],
    ["Training Title", data.trainingTitle],
    ["Training Date", data.trainingDate],
    ["Venue", data.venue],
    ["Full Name", data.fullName],
    ["Gender", data.gender],
    ["Date of Birth", data.dateOfBirth],
    ["Phone", data.phone],
    ["Email", data.email],
    ["State of Origin", data.stateOfOrigin],
    ["LGA", data.lga],
    ["Residential Address", data.residentialAddress],
    ["Highest Qualification", data.highestQualification],
    ["Occupation", data.occupation],
    ["Employment Status", data.employmentStatus],
    ["Employment (Other)", data.employmentOther],
    ["Owns Business", data.ownsBusiness],
    ["Business Name", data.businessName],
    ["Business Type", data.businessType],
    ["Years in Business", data.yearsInBusiness],
    ["Business Location", data.businessLocation],
    ["Intended Business Type", data.intendedBusinessType],
    ["Training Interests", interests],
    ["Training Expectations", data.trainingExpectations],
    ["Business Challenge", data.businessChallenge],
    ["Further Support", data.furtherSupport],
    ["Emergency Contact", data.emergencyName],
    ["Emergency Relationship", data.emergencyRelationship],
    ["Emergency Phone", data.emergencyPhone],
    ["Declarant", data.declarationName],
    ["Declaration Date", data.declarationDate],
  ];
  const text = textLines
    .filter(([, v]) => (v || "").trim())
    .map(([label, v]) => `${label}: ${(v || "").trim()}`)
    .join("\n");

  const attachments: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }> = [];
  if (data.photo) {
    const parsed = parseDataUrl(data.photo);
    if (parsed) {
      const ext = parsed.contentType.includes("png") ? "png" : "jpg";
      attachments.push({
        filename: data.photoName || `passport-photo-${reference}.${ext}`,
        content: parsed.content,
        contentType: parsed.contentType,
      });
    }
  }

  return {
    subject: `New Entrepreneur Training Registration - ${name} (${reference})`,
    html,
    text,
    attachments,
  };
}

type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

type OutgoingMail = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

/**
 * Low-level sender shared by every form notification. Delivers to
 * NOTIFICATION_RECIPIENT (chiekenn@gmail.com by default).
 *
 * Returns { sent: true } on success, or { sent: false, error } when SMTP is
 * not configured or delivery fails. Never throws.
 */
async function deliver(
  mail: OutgoingMail,
  label: string,
): Promise<{ sent: boolean; error?: string }> {
  if (!isConfigured()) {
    const message =
      "Email notification skipped: SMTP_HOST, SMTP_USER and SMTP_PASS environment variables are not configured.";
    console.warn(message);
    return { sent: false, error: message };
  }

  try {
    const senderName = process.env.SMTP_FROM_NAME || "UPEC Digital Campus";
    const senderAddress =
      process.env.SMTP_FROM || process.env.SMTP_USER || NOTIFICATION_RECIPIENT;

    const transporter = createTransport();
    await transporter.sendMail({
      from: `"${senderName}" <${senderAddress}>`,
      to: NOTIFICATION_RECIPIENT,
      replyTo: mail.replyTo || undefined,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      attachments: mail.attachments,
    });
    return { sent: true };
  } catch (error) {
    console.error(`Failed to send ${label} email:`, error);
    return {
      sent: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Sends the Entrepreneur Training Registration details to the notification
 * recipient (chiekenn@gmail.com by default).
 */
export async function sendTrainingRegistrationEmail(
  data: TrainingRegistrationPayload,
): Promise<{ sent: boolean; error?: string }> {
  const { subject, html, text, attachments } = buildRegistrationEmail(data);
  return deliver(
    { subject, html, text, attachments, replyTo: data.email },
    "training registration",
  );
}

/* ------------------------------------------------------------------ */
/* Generic form notification (Contact, Applications, Postgraduate)     */
/* ------------------------------------------------------------------ */

type FieldValue = string | number | boolean | null | undefined;

type EmailSection = {
  title: string;
  rows: Array<[string, FieldValue]>;
};

type FormEmailOptions = {
  /** Heading shown in the email banner, e.g. "New Contact Enquiry". */
  heading: string;
  subject: string;
  reference?: string;
  sections: EmailSection[];
  replyTo?: string;
  footer: string;
  attachments?: MailAttachment[];
};

function str(value: FieldValue): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function buildFormEmail(opts: FormEmailOptions): OutgoingMail {
  const meta =
    (opts.reference
      ? `Reference: <strong>${escapeHtml(opts.reference)}</strong> &middot; `
      : "") + `Submitted ${escapeHtml(new Date().toUTCString())}`;

  const body = opts.sections
    .map((section) => {
      const rows = section.rows.map(([label, v]) => row(label, str(v))).join("");
      return rows ? sectionTitle(section.title) + rows : "";
    })
    .join("");

  const html = `
  <div style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:720px;margin:0 auto;">
      <div style="background:#003b73;border-radius:12px 12px 0 0;padding:20px 24px;">
        <p style="margin:0;font-size:11px;font-weight:700;color:#9dc3e8;text-transform:uppercase;letter-spacing:.12em;">University of Port Harcourt Entrepreneurial Centre</p>
        <h1 style="margin:4px 0 0;font-size:20px;color:#ffffff;">${escapeHtml(opts.heading)}</h1>
        <p style="margin:8px 0 0;font-size:13px;color:#cfe3f5;">${meta}</p>
      </div>
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:8px 16px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${body}
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">${escapeHtml(opts.footer)}</p>
      </div>
    </div>
  </div>`;

  const textParts: string[] = [opts.heading];
  if (opts.reference) textParts.push(`Reference: ${opts.reference}`);
  for (const section of opts.sections) {
    const lines = section.rows
      .filter(([, v]) => str(v))
      .map(([label, v]) => `${label}: ${str(v)}`);
    if (lines.length) textParts.push(`\n== ${section.title} ==\n${lines.join("\n")}`);
  }

  return {
    subject: opts.subject,
    html,
    text: textParts.join("\n"),
    replyTo: opts.replyTo,
    attachments: opts.attachments,
  };
}

/* ---------------------------- Contact ----------------------------- */

export type ContactEnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

/** Sends a Contact page enquiry to chiekenn@gmail.com (or NOTIFICATION_EMAIL). */
export async function sendContactEnquiryEmail(data: ContactEnquiryPayload) {
  const name = str(data.name) || "Website visitor";
  const topic = str(data.subject);
  return deliver(
    buildFormEmail({
      heading: "New Contact Enquiry",
      subject: `New Contact Enquiry - ${name}${topic ? `: ${topic}` : ""}`,
      replyTo: data.email,
      sections: [
        {
          title: "Contact Details",
          rows: [
            ["Full Name", data.name],
            ["Email Address", data.email],
            ["Phone Number", data.phone],
          ],
        },
        {
          title: "Message",
          rows: [
            ["Subject", data.subject],
            ["Message", data.message],
          ],
        },
      ],
      footer:
        "This message was submitted via the UPEC Digital Campus Contact page. Reply directly to this email to respond to the sender.",
    }),
    "contact enquiry",
  );
}

/* ------------------- Application / Expression of Interest ------------------- */

export type ApplicationPayload = {
  reference?: string;
  applicationType?: string;
  name?: string;
  email?: string;
  phone?: string;
  programme?: string;
  location?: string;
  qualification?: string;
  applicantType?: string;
  documentName?: string;
  message?: string;
  declaration?: string;
};

/** Sends an Application / Expression of Interest submission. */
export async function sendApplicationEmail(data: ApplicationPayload) {
  const isFull = data.applicationType === "full";
  const kind = isFull ? "Programme Application" : "Expression of Interest";
  const name = str(data.name) || "New Applicant";
  return deliver(
    buildFormEmail({
      heading: `New ${kind}`,
      subject: `New ${kind} - ${name} (${data.reference || "N/A"})`,
      reference: data.reference,
      replyTo: data.email,
      sections: [
        {
          title: "Applicant Details",
          rows: [
            ["Submission Type", kind],
            ["Full Name", data.name],
            ["Email Address", data.email],
            ["Phone Number", data.phone],
            ["Location", data.location],
            ["Applicant Type", data.applicantType],
          ],
        },
        {
          title: "Programme",
          rows: [
            ["Programme of Interest", data.programme],
            ["Highest Qualification", data.qualification],
            ["Supporting Document", data.documentName],
          ],
        },
        {
          title: "Additional Information",
          rows: [
            ["Message", data.message],
            ["Declaration Accepted", data.declaration ? "Yes" : ""],
          ],
        },
      ],
      footer: `This ${kind.toLowerCase()} was submitted via the UPEC Digital Campus Apply page.`,
    }),
    "application",
  );
}

/* --------------------------- Postgraduate --------------------------- */

type EducationEntry = {
  level?: string;
  institution?: string;
  qualification?: string;
  startDate?: string;
  completionDate?: string;
  cgpa?: string;
};

type RefereeEntry = {
  sn?: number | string;
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
};

export type PostgraduatePayload = {
  reference?: string;
  programme?: string;
  photo?: string;
  photoName?: string;
  education?: EducationEntry[];
  referees?: RefereeEntry[];
  [key: string]: unknown;
};

/** Sends a Postgraduate Application (with passport photo attached, if any). */
export async function sendPostgraduateApplicationEmail(data: PostgraduatePayload) {
  const f = (key: string) => str(data[key] as FieldValue);
  const name = f("name") || "New Applicant";
  const reference = data.reference || "N/A";

  const education = Array.isArray(data.education) ? data.education : [];
  const educationRows: Array<[string, FieldValue]> = education
    .filter((e) => e && (e.institution || e.qualification))
    .map((e) => [
      e.level || "Institution",
      [
        e.institution,
        e.qualification && `Qualification: ${e.qualification}`,
        (e.startDate || e.completionDate) &&
          `Period: ${e.startDate || "?"} - ${e.completionDate || "?"}`,
        e.cgpa && `CGPA/Class: ${e.cgpa}`,
      ]
        .filter(Boolean)
        .join("\n"),
    ]);

  const referees = Array.isArray(data.referees) ? data.referees : [];
  const refereeRows: Array<[string, FieldValue]> = referees
    .filter((r) => r && (r.name || r.email || r.phone))
    .map((r, i) => [
      `Referee ${r.sn ?? i + 1}`,
      [r.name, r.address, r.email, r.phone].filter(Boolean).join("\n"),
    ]);

  const attachments: MailAttachment[] = [];
  if (typeof data.photo === "string" && data.photo) {
    const parsed = parseDataUrl(data.photo);
    if (parsed) {
      const ext = parsed.contentType.includes("png") ? "png" : "jpg";
      attachments.push({
        filename: data.photoName || `passport-photo-${reference}.${ext}`,
        content: parsed.content,
        contentType: parsed.contentType,
      });
    }
  }

  return deliver(
    buildFormEmail({
      heading: "New Postgraduate Application",
      subject: `New Postgraduate Application - ${name} (${reference})`,
      reference: data.reference,
      replyTo: f("email"),
      attachments,
      sections: [
        {
          title: "Programme",
          rows: [
            ["Programme", data.programme],
            ["Degree Aimed At", f("degreeAimedAt")],
            ["Area of Specialisation", f("areaOfSpecialisation")],
            ["Research Interest", f("researchInterest")],
            ["Mode of Study", f("modeOfStudy")],
            ["Hostel Required", f("hostelRequired")],
          ],
        },
        {
          title: "Personal Information",
          rows: [
            ["Full Name", f("name")],
            ["Former Name", f("formerName")],
            ["Date of Birth", f("dateOfBirth")],
            ["Place of Birth", f("placeOfBirth")],
            ["Marital Status", f("maritalStatus")],
            ["Number of Children", f("numberOfChildren")],
            ["Nationality", f("nationality")],
            ["State of Origin", f("stateOfOrigin")],
            ["Home Town", f("homeTown")],
            ["Present Employment", f("presentEmployment")],
            ["Present Address", f("presentAddress")],
            ["Phone Number", f("phone")],
            ["Email Address", f("email")],
          ],
        },
        {
          title: "Next of Kin",
          rows: [
            ["Name", f("nokName")],
            ["Relationship", f("nokRelationship")],
            ["Address", f("nokAddress")],
            ["Phone Number", f("nokPhone")],
          ],
        },
        { title: "Education", rows: educationRows },
        {
          title: "Academic Details",
          rows: [
            ["CGPA", f("cgpa")],
            ["CGPA Scale", f("cgpaScale")],
            ["Certificate Received", f("certificateReceived")],
            ["Languages Spoken", f("languageSpoken")],
            ["Languages Written", f("languageWritten")],
          ],
        },
        {
          title: "Sponsor",
          rows: [
            ["Sponsor Name", f("sponsorName")],
            ["Sponsor Address", f("sponsorAddress")],
          ],
        },
        { title: "Referees", rows: refereeRows },
        {
          title: "Declaration",
          rows: [["Declaration Accepted", f("declaration") ? "Yes" : ""]],
        },
      ],
      footer:
        "This application was submitted via the UPEC Digital Campus Postgraduate Application form." +
        (attachments.length ? " The applicant's passport photograph is attached." : ""),
    }),
    "postgraduate application",
  );
}
