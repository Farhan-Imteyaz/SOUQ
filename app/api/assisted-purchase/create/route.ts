import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";

const orderItemApiSchema = z.object({
  id: z.string().uuid(),
  itemType: z.string().min(1),
  itemName: z.string().min(1),
  storeName: z.string().min(1),
  itemColor: z.string(),
  itemSize: z.string(),
  itemQuantity: z.number().int().min(1),
  itemPrice: z.number().min(0),
  remarks: z.string(),
  itemWeight: z.string(),
  referenceNumber: z.string().optional(),
});

const orderDataSchema = z.object({
  items: z.array(orderItemApiSchema).min(1),
});

function generateOrderId(): string {
  const random = crypto
    .getRandomValues(new Uint32Array(1))[0]
    .toString(36)
    .toUpperCase()
    .slice(0, 6);

  return `ORD-${random}`;
}

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { message: "Failed to Authenticate" },
        { status: 500 },
      );
    }

    const formData = await request.formData();

    // ============================================
    // 1. Extract addressId if present
    // ============================================
    const addressId = formData.get("addressId");
    const selectedAddressId =
      addressId && typeof addressId === "string" ? addressId : null;

    // ============================================
    // 2. Parse and validate items data
    // ============================================
    const itemsField = formData.get("items");
    if (!itemsField || typeof itemsField !== "string") {
      return NextResponse.json(
        { success: false, message: "Items data is required" },
        { status: 400 },
      );
    }

    let parsedData;
    try {
      const raw = JSON.parse(itemsField);
      parsedData = Array.isArray(raw) ? { items: raw } : raw;
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON in 'items'" },
        { status: 400 },
      );
    }

    if (!parsedData.items || !Array.isArray(parsedData.items)) {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 },
      );
    }

    // Validate with Zod
    const validationResult = orderDataSchema.safeParse(parsedData);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    const { items } = validationResult.data;

    // ============================================
    // 3. Verify addressId exists if provided
    // ============================================
    if (selectedAddressId) {
      const addressExists = await prisma.address.findUnique({
        where: { id: selectedAddressId },
      });

      if (!addressExists) {
        return NextResponse.json(
          { success: false, message: "Selected address not found" },
          { status: 404 },
        );
      }

      if (addressExists.userId !== userId) {
        return NextResponse.json(
          { success: false, message: "Unauthorized access to address" },
          { status: 403 },
        );
      }
    }

    // ============================================
    // 4. Calculate totals
    // ============================================
    const totalAmount = items.reduce(
      (sum, item) => sum + item.itemPrice * item.itemQuantity,
      0,
    );

    // ============================================
    // 5. Create order in database
    // ============================================
    const order = await prisma.assistedPurchaseOrder.create({
      data: {
        orderId: generateOrderId(),
        totalAmount,
        totalItems: items.length,
        status: "pending",
        userId,
        trackingNumber: "",
        addressId: selectedAddressId,
        items: {
          create: items.map((item) => ({
            itemType: item.itemType,
            itemName: item.itemName,
            storeName: item.storeName,
            itemColor: item.itemColor,
            itemSize: item.itemSize,
            itemQuantity: item.itemQuantity,
            itemPrice: item.itemPrice,
            remarks: item.remarks,
            itemWeight: item.itemWeight,
            referenceNumber: item.referenceNumber,
          })),
        },
      },
      include: {
        address: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        firstName: true,
      },
    });

    const emailItems = items.map((item) => ({
      name: item.itemName,
      quantity: item.itemQuantity,
      price: item.itemPrice,
    }));

    await sendEmail({
      to: user?.email || "",
      type: "createOrder",
      props: {
        name: user?.firstName || "Customer Name",
        orderId: order.orderId,
        items: emailItems,
        currency: "₹",
      },
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.orderId,
        message: "Order created successfully",
        data: order,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
