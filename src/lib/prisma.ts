import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Postgraduate application record shape (mirrors the Prisma model).
 */
export type PostgraduateApplicationRecord = {
  id: string;
  reference: string;
  programme: string;
  photo: string | null;
  photoName: string | null;
  name: string;
  formerName: string | null;
  dateOfBirth: string | null;
  placeOfBirth: string | null;
  maritalStatus: string | null;
  nationality: string | null;
  stateOfOrigin: string | null;
  homeTown: string | null;
  presentEmployment: string | null;
  presentAddress: string | null;
  phone: string | null;
  email: string;
  numberOfChildren: string | null;
  nokName: string | null;
  nokAddress: string | null;
  nokRelationship: string | null;
  nokPhone: string | null;
  education: unknown;
  cgpa: string | null;
  cgpaScale: string | null;
  languageSpoken: string | null;
  languageWritten: string | null;
  certificateReceived: string | null;
  degreeAimedAt: string | null;
  areaOfSpecialisation: string | null;
  researchInterest: string | null;
  modeOfStudy: string | null;
  hostelRequired: string | null;
  sponsorName: string | null;
  sponsorAddress: string | null;
  referees: unknown;
  status: string;
  createdAt: Date;
};

type PostgraduateApplicationDelegate = {
  create(args: {
    data: Record<string, unknown>;
  }): Promise<PostgraduateApplicationRecord>;
  findMany(args?: {
    orderBy?: Record<string, "asc" | "desc">;
  }): Promise<PostgraduateApplicationRecord[]>;
};

/**
 * Typed accessor for the PostgraduateApplication model.
 *
 * The generated Prisma client types are not always available at type-check
 * time (e.g. when `prisma generate` has not run yet in a CI/build step), so we
 * narrow the delegate here instead of relying on the generated typings.
 */
export const postgraduateApplication = (
  prisma as unknown as {
    postgraduateApplication: PostgraduateApplicationDelegate;
  }
).postgraduateApplication;
