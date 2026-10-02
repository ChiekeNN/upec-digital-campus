import { NextResponse } from "next/server";
import { postgraduateApplication } from "@/lib/prisma";
import {
  NOTIFICATION_RECIPIENT,
  sendPostgraduateApplicationEmail,
} from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      programme,
      photo,
      photoName,
      name,
      formerName,
      dateOfBirth,
      placeOfBirth,
      maritalStatus,
      nationality,
      stateOfOrigin,
      homeTown,
      presentEmployment,
      presentAddress,
      phone,
      email,
      numberOfChildren,
      nokName,
      nokAddress,
      nokRelationship,
      nokPhone,
      education,
      cgpa,
      cgpaScale,
      languageSpoken,
      languageWritten,
      certificateReceived,
      degreeAimedAt,
      areaOfSpecialisation,
      researchInterest,
      modeOfStudy,
      hostelRequired,
      sponsorName,
      sponsorAddress,
      referees,
    } = data;

    if (!name || !email || !programme) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const reference = "UPEC-PG-" + Date.now().toString().slice(-6);

    // Save to database (non-fatal: the email below still goes out if the DB is unavailable)
    let saved = true;
    try {
      await postgraduateApplication.create({
        data: {
          reference,
          programme,
          photo: photo || null,
          photoName: photoName || null,
          name,
          formerName: formerName || null,
          dateOfBirth: dateOfBirth || null,
          placeOfBirth: placeOfBirth || null,
          maritalStatus: maritalStatus || null,
          nationality: nationality || null,
          stateOfOrigin: stateOfOrigin || null,
          homeTown: homeTown || null,
          presentEmployment: presentEmployment || null,
          presentAddress: presentAddress || null,
          phone: phone || null,
          email,
          numberOfChildren: numberOfChildren || null,
          nokName: nokName || null,
          nokAddress: nokAddress || null,
          nokRelationship: nokRelationship || null,
          nokPhone: nokPhone || null,
          education: education ?? null,
          cgpa: cgpa || null,
          cgpaScale: cgpaScale || null,
          languageSpoken: languageSpoken || null,
          languageWritten: languageWritten || null,
          certificateReceived: certificateReceived || null,
          degreeAimedAt: degreeAimedAt || programme,
          areaOfSpecialisation: areaOfSpecialisation || null,
          researchInterest: researchInterest || null,
          modeOfStudy: modeOfStudy || null,
          hostelRequired: hostelRequired || null,
          sponsorName: sponsorName || null,
          sponsorAddress: sponsorAddress || null,
          referees: referees ?? null,
        },
      });
    } catch (dbError) {
      saved = false;
      console.warn("Database write failed for postgraduate application:", dbError);
    }

    // Email the application (with passport photo) to chiekenn@gmail.com
    const emailResult = await sendPostgraduateApplicationEmail({ ...data, reference });
    if (!emailResult.sent) {
      console.warn(
        `Postgraduate application email to ${NOTIFICATION_RECIPIENT} was not sent:`,
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
        "Your postgraduate application has been submitted successfully. The UPEC admissions team will contact you.",
    });
  } catch (error) {
    console.error("Postgraduate application error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
