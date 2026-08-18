import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Save to database
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
