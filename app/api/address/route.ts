import { NextResponse } from "next/server";
import { addressSchema } from "@/types/order-types";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // ============================================
    // 1. Authentication Check
    // ============================================
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID missing" },
        { status: 401 }, // Use 401 for unauthorized
      );
    }

    // ============================================
    // 2. Parse Request Body (no nesting)
    // ============================================
    const body = await request.json();

    // Extract orderId separately (it's not part of address schema)
    const { orderId, ...addressData } = body;

    // ============================================
    // 3. Validate Address Data
    // ============================================
    const parsedAddress = addressSchema.safeParse(addressData);

    if (!parsedAddress.success) {
      const errors = parsedAddress.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    // ============================================
    // 4. Create Address in Database
    // ============================================
    const validatedData = parsedAddress.data;
    const createdAddress = await prisma.address.create({
      data: {
        userId,
        firstName: validatedData.firstName ?? null,
        lastName: validatedData.lastName ?? null,
        streetAddress: validatedData.streetAddress,
        aptSuitBldgGateCode: validatedData.aptSuitBldgGateCode,
        city: validatedData.city,
        phone: validatedData.phone ?? null,
        state: validatedData.state,
        country: validatedData.country,
        zipcode: validatedData.zipcode,
      },
    });

    // ============================================
    // 5. Return Success Response
    // ============================================
    return NextResponse.json(
      {
        success: true,
        address: createdAddress,
        message: "Address created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Address creation error:", error);

    // Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "Address already exists" },
          { status: 409 },
        );
      }

      if (error.message.includes("Foreign key constraint")) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
      }
    }

    return NextResponse.json(
      { error: "Failed to create address. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    // ============================================
    // 1. Authentication Check
    // ============================================
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 401 });
    }

    // ============================================
    // 2. Fetch User Addresses
    // ============================================
    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      addresses,
      count: addresses.length,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 },
    );
  }
}
