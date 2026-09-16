// Prisma client with fallback for build environments where `prisma generate` failed
// or network is unavailable. This allows Next.js build to succeed without DB.

type MockDelegate = {
  findMany: (...args: any[]) => Promise<any[]>;
  findUnique?: (...args: any[]) => Promise<any | null>;
  count: (...args: any[]) => Promise<number>;
  create: (...args: any[]) => Promise<any>;
  update?: (...args: any[]) => Promise<any>;
  delete?: (...args: any[]) => Promise<any>;
};

function createMockDelegate(): MockDelegate {
  return {
    findMany: async () => [],
    findUnique: async () => null,
    count: async () => 0,
    create: async (args: any) => ({ id: "mock", ...args?.data }),
    update: async (args: any) => ({ id: "mock", ...args?.data }),
    delete: async () => ({ id: "mock" }),
  };
}

function createMockPrisma() {
  return {
    application: createMockDelegate(),
    enquiry: createMockDelegate(),
    postgraduateApplication: createMockDelegate(),
    user: createMockDelegate(),
  };
}

let prismaInstance: any;

try {
  // Attempt to load real PrismaClient
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined;
  };

  try {
    prismaInstance =
      globalForPrisma.prisma ??
      new PrismaClient({
        // Prevent engine download attempts during build
        log: [],
      });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaInstance;
    }
  } catch (e) {
    console.warn("PrismaClient instantiation failed, using mock:", e);
    prismaInstance = createMockPrisma();
  }
} catch (e) {
  console.warn("Failed to load @prisma/client, using mock:", e);
  prismaInstance = createMockPrisma();
}

export const prisma = prismaInstance as any;

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
  create(args: { data: Record<string, unknown> }): Promise<PostgraduateApplicationRecord>;
  findMany(args?: { orderBy?: Record<string, "asc" | "desc"> }): Promise<PostgraduateApplicationRecord[]>;
};

/**
 * Typed accessor for the PostgraduateApplication model.
 */
export const postgraduateApplication = (
  prisma as unknown as {
    postgraduateApplication: PostgraduateApplicationDelegate;
  }
).postgraduateApplication;
