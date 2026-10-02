import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NOTIFICATION_RECIPIENT, sendContactEnquiryEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, subject, message } = data;

    if (!name || !email || !message) {
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

    // Save to database (non-fatal: the email below still goes out if the DB is unavailable)
    let saved = true;
    try {
      await prisma.enquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          subject: subject || null,
          message,
        },
      });
    } catch (dbError) {
      saved = false;
      console.warn("Database write failed for contact enquiry:", dbError);
    }

    // Email the enquiry to chiekenn@gmail.com (see src/lib/mailer.ts)
    const emailResult = await sendContactEnquiryEmail({ name, email, phone, subject, message });
    if (!emailResult.sent) {
      console.warn(
        `Contact enquiry email to ${NOTIFICATION_RECIPIENT} was not sent:`,
        emailResult.error,
      );
    }

    if (!saved && !emailResult.sent) {
      return NextResponse.json(
        { success: false, error: "We could not send your message right now. Please try again shortly." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your message has been received. The UPEC team will respond soon.",
    });
  } catch (error) {
    console.error("Enquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
