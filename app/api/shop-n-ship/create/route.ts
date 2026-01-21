// app/api/shop-n-ship/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { z } from "zod";
import prisma from "@/lib/prisma";

const orderItemApiSchema = z.object({
  id: z.string().uuid(),
  itemType: z.string().min(1),
  itemName: z.string().min(1),
  storeName: z.string().min(1),
  storeOrderId: z.string().min(1),
  itemColor: z.string(),
  itemSize: z.string(),
  itemQuantity: z.number().int().min(1),
  itemPrice: z.number().min(0),
  remarks: z.string(),
  purchaseDate: z.string().datetime(), // ISO 8601 format
  itemWeight: z.string(),
  images: z.array(z.string()).optional(), // Will be overwritten
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
      return NextResponse.json({ message: "User ID missing" }, { status: 500 });
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

      // Verify the address belongs to the user
      if (addressExists.userId !== userId) {
        return NextResponse.json(
          { success: false, message: "Unauthorized access to address" },
          { status: 403 },
        );
      }
    }

    // ============================================
    // 4. Create upload directory and process images
    // ============================================
    const orderId = generateOrderId();
    const uploadDir = join(process.cwd(), "public", "uploads", orderId);
    await mkdir(uploadDir, { recursive: true });

    const imageFiles: Record<number, File[]> = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("item_") && value instanceof File) {
        const match = key.match(/^item_(\d+)_image_\d+$/);
        if (match) {
          const itemIndex = parseInt(match[1], 10);
          if (!isNaN(itemIndex)) {
            if (!imageFiles[itemIndex]) imageFiles[itemIndex] = [];
            imageFiles[itemIndex].push(value);
          }
        }
      }
    }

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    const mimeToExt: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };

    // ============================================
    // 5. Process items and save images
    // ============================================
    const processedItems = await Promise.all(
      items.map(async (item, itemIndex) => {
        const images: string[] = [];
        const files = imageFiles[itemIndex] || [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          // Validate file
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`File too large: ${file.name}`);
          }
          if (!allowedMimeTypes.includes(file.type)) {
            throw new Error(`Invalid image type: ${file.type}`);
          }

          const buffer = Buffer.from(await file.arrayBuffer());
          const ext = mimeToExt[file.type] || "jpg";
          const fileName = `item_${itemIndex}_${i}.${ext}`;
          const filePath = join(uploadDir, fileName);

          await writeFile(filePath, buffer);
          images.push(`/uploads/${orderId}/${fileName}`);
        }

        return {
          ...item,
          images,
        };
      }),
    );

    // ============================================
    // 6. Calculate totals
    // ============================================
    const totalAmount = processedItems.reduce(
      (sum, item) => sum + item.itemPrice * item.itemQuantity,
      0,
    );

    // ============================================
    // 7. Create order in database with addressId if provided
    // ============================================
    const order = await prisma.shopNShipOrder.create({
      data: {
        orderId,
        totalAmount,
        totalItems: processedItems.length,
        status: "pending",
        userId,
        trackingNumber: "",
        addressId: selectedAddressId, // Link to existing address if selected
        items: {
          create: processedItems.map((item) => ({
            itemType: item.itemType,
            itemName: item.itemName,
            storeName: item.storeName,
            storeOrderId: item.storeOrderId,
            itemColor: item.itemColor,
            itemSize: item.itemSize,
            itemQuantity: item.itemQuantity,
            itemPrice: item.itemPrice,
            remarks: item.remarks,
            purchaseDate: new Date(item.purchaseDate),
            itemWeight: item.itemWeight,

            images: {
              create: item.images.map((imagePath) => ({
                imagePath,
                imageUrl: imagePath,
              })),
            },
          })),
        },
      },
      include: {
        items: {
          include: { images: true },
        },
        address: true, // Include address details in response
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
