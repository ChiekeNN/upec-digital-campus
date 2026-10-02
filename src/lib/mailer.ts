import nodemailer from "nodemailer";

/**
 * Recipient for Entrepreneur Training Registration notifications.
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
    // Force IPv4 — some hosting environments have no IPv6 route to Gmail
    family: 4,
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

/**
 * Sends the Entrepreneur Training Registration details to the notification
 * recipient (chiekenn@gmail.com by default).
 *
 * Returns { sent: true } on success, or { sent: false, error } when SMTP is
 * not configured or delivery fails. Never throws.
 */
export async function sendTrainingRegistrationEmail(
  data: TrainingRegistrationPayload,
): Promise<{ sent: boolean; error?: string }> {
  if (!isConfigured()) {
    const message =
      "Email notification skipped: SMTP_HOST, SMTP_USER and SMTP_PASS environment variables are not configured.";
    console.warn(message);
    return { sent: false, error: message };
  }

  try {
    const { subject, html, text, attachments } = buildRegistrationEmail(data);
    const senderName =
      process.env.SMTP_FROM_NAME || "UPEC Digital Campus";
    const senderAddress =
      process.env.SMTP_FROM || process.env.SMTP_USER || NOTIFICATION_RECIPIENT;

    const transporter = createTransport();
    await transporter.sendMail({
      from: `"${senderName}" <${senderAddress}>`,
      to: NOTIFICATION_RECIPIENT,
      replyTo: data.email || undefined,
      subject,
      text,
      html,
      attachments,
    });
    return { sent: true };
  } catch (error) {
    console.error("Failed to send training registration email:", error);
    return {
      sent: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
