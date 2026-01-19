import { Prisma } from "@/generated/prisma/client";

export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return "A record with this information already exists.";
      case "P2025":
        return "Record not found.";
      case "P2003":
        return "Foreign key constraint failed.";
      default:
        return `Database error: ${error.message}`;
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return "Invalid data provided to database.";
  }

  return error instanceof Error ? error.message : "Unknown database error";
}
