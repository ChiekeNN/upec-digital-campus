import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NOTIFICATION_RECIPIENT, sendApplicationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      applicationType,
      name,
      email,
      phone,
      programme,
      location,
      qualification,
      applicantType,
      documentName,
      message,
    } = data;

    if (!name || !email || !programme) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const reference =
      "UPEC-" +
      (applicationType === "full" ? "APP" : "EOI") +
      "-" +
      Date.now().toString().slice(-6);

    // Save to database (non-fatal: the email below still goes out if the DB is unavailable)
    let saved = true;
    try {
      await prisma.application.create({
        data: {
          reference,
          applicationType: applicationType || "eoi",
          name,
          email,
          phone: phone || null,
          programme,
          location: location || null,
          qualification: qualification || null,
          applicantType: applicantType || null,
          documentName: documentName || null,
          message: message || null,
        },
      });
    } catch (dbError) {
      saved = false;
      console.warn("Database write failed for application:", dbError);
    }

    // Email the application to chiekenn@gmail.com (see src/lib/mailer.ts)
    const emailResult = await sendApplicationEmail({ ...data, reference });
    if (!emailResult.sent) {
      console.warn(
        `Application email to ${NOTIFICATION_RECIPIENT} was not sent:`,
        emailResult.error,
      );
    }

    if (!saved && !emailResult.sent) {
      return NextResponse.json(
        { success: false, error: "We could not submit your application right now. Please try again shortly." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      reference,
      message:
        applicationType === "full"
          ? "Your application has been submitted successfully."
          : "Your expression of interest has been received.",
    });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
