import { NextResponse } from "next/server";
import { entrepreneurTrainingRegistration } from "@/lib/prisma";
import {
  NOTIFICATION_RECIPIENT,
  sendTrainingRegistrationEmail,
} from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      photo,
      photoName,
      programmeOrganisation,
      trainingTitle,
      trainingDate,
      venue,
      fullName,
      gender,
      dateOfBirth,
      phone,
      email,
      stateOfOrigin,
      residentialAddress,
      lga,
      highestQualification,
      occupation,
      employmentStatus,
      employmentOther,
      ownsBusiness,
      businessName,
      businessType,
      yearsInBusiness,
      businessLocation,
      intendedBusinessType,
      trainingInterests,
      otherTrainingInterest,
      trainingExpectations,
      businessChallenge,
      furtherSupport,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
      declarationName,
      declarationDate,
    } = data;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Please fill in your full name, email address, and phone number.",
        },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const reference = "UPEC-ET-" + Date.now().toString().slice(-6);

    let saved = true;
    try {
      await entrepreneurTrainingRegistration.create({
        data: {
          reference,
          photo: photo || null,
          photoName: photoName || null,
          programmeOrganisation: programmeOrganisation || null,
          trainingTitle: trainingTitle || null,
          trainingDate: trainingDate || null,
          venue: venue || null,
          fullName,
          gender: gender || null,
          dateOfBirth: dateOfBirth || null,
          phone: phone || null,
          email,
          stateOfOrigin: stateOfOrigin || null,
          residentialAddress: residentialAddress || null,
          lga: lga || null,
          highestQualification: highestQualification || null,
          occupation: occupation || null,
          employmentStatus: employmentStatus || null,
          employmentOther: employmentOther || null,
          ownsBusiness: ownsBusiness || null,
          businessName: businessName || null,
          businessType: businessType || null,
          yearsInBusiness: yearsInBusiness || null,
          businessLocation: businessLocation || null,
          intendedBusinessType: intendedBusinessType || null,
          trainingInterests: Array.isArray(trainingInterests)
            ? trainingInterests
            : [],
          otherTrainingInterest: otherTrainingInterest || null,
          trainingExpectations: trainingExpectations || null,
          businessChallenge: businessChallenge || null,
          furtherSupport: furtherSupport || null,
          emergencyName: emergencyName || null,
          emergencyRelationship: emergencyRelationship || null,
          emergencyPhone: emergencyPhone || null,
          declarationName: declarationName || fullName,
          declarationDate: declarationDate || null,
        },
      });
    } catch (dbError) {
      saved = false;
      console.warn(
        "Database write skipped or unavailable for Entrepreneur Training Registration:",
        dbError,
      );
    }

    // Email the submitted registration details to the recipient
    // (chiekenn@gmail.com by default — see src/lib/mailer.ts).
    const emailResult = await sendTrainingRegistrationEmail({
      ...data,
      reference,
    });

    if (!emailResult.sent) {
      console.warn(
        "Entrepreneur Training Registration saved, but email notification to " +
          NOTIFICATION_RECIPIENT +
          " was not sent:",
        emailResult.error,
      );
    }

    if (!saved && !emailResult.sent) {
      return NextResponse.json(
        {
          success: false,
          error: "We could not submit your registration right now. Please try again shortly.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      reference,
      emailSent: emailResult.sent,
      message:
        "Your Entrepreneur Training Registration has been submitted successfully" +
        (emailResult.sent
          ? ` and the details have been sent to ${NOTIFICATION_RECIPIENT}. `
          : ". ") +
        "Please keep or print your registration slip for verification at the training venue.",
    });
  } catch (error) {
    console.error("Entrepreneur training registration error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
