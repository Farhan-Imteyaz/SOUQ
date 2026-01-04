import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1 as result;`;

    return NextResponse.json({
      status: "up",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    return NextResponse.json(
      {
        status: "down",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
