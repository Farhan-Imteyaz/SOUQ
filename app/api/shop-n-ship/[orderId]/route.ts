import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

// Constants
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Shared utility functions
const getUserId = (request: NextRequest): string | null => {
  return request.headers.get("x-user-id");
};

const unauthorizedResponse = () => {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
};

const deleteImageFile = async (imagePath: string): Promise<void> => {
  const filePath = join(process.cwd(), "public", imagePath);
  try {
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  } catch (err) {
    console.error(`Failed to delete file: ${filePath}`, err);
  }
};

const deleteImageFiles = async (
  images: Array<{ imagePath: string | null }>,
): Promise<void> => {
  await Promise.all(
    images.map((img) =>
      img.imagePath ? deleteImageFile(img.imagePath) : Promise.resolve(),
    ),
  );
};

const validateAndUploadImage = async (
  file: File,
  index: number,
  orderId: string,
  orderIdStr: string,
): Promise<{ imagePath: string; imageUrl: string } | null> => {
  if (file.size === 0) return null;

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large: ${file.name}`);
  }
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Invalid image type: ${file.type}`);
  }

  const uploadDir = join(process.cwd(), "public", "uploads", orderIdStr);
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = MIME_TO_EXT[file.type] || "jpg";
  const fileName = `${orderId}_${Date.now()}_${index}.${ext}`;
  const filePath = join(uploadDir, fileName);
  const relativePath = `/uploads/${orderIdStr}/${fileName}`;

  await writeFile(filePath, buffer);

  return {
    imagePath: relativePath,
    imageUrl: relativePath,
  };
};
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const userId = getUserId(request);
    if (!userId) return unauthorizedResponse();

    const { orderId } = await params;

    // Verify order exists and belongs to user
    const existingOrder = await prisma.shopNShipOrder.findUnique({
      where: { orderId, userId },
      select: {
        orderId: true,
        totalItems: true,
        totalAmount: true,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found or unauthorized" },
        { status: 404 },
      );
    }

    const formData = await request.formData();

    // Extract and validate form data
    const purchaseDate = formData.get("purchaseDate") as string;
    const itemName = formData.get("itemName") as string;
    const itemQuantity = formData.get("itemQuantity") as string;
    const itemColor = formData.get("itemColor") as string;
    const storeName = formData.get("storeName") as string;
    const itemPrice = formData.get("itemPrice") as string;
    const itemSize = (formData.get("itemSize") as string) ?? "";
    const itemWeight = (formData.get("itemWeight") as string) ?? "";
    const storeOrderId = formData.get("storeOrderId") as string;
    const remarks = (formData.get("remarks") as string) || "";
    const newImageFiles = formData.getAll("images") as File[];

    // Validate required fields
    if (
      !purchaseDate ||
      !itemName ||
      !itemQuantity ||
      !itemColor ||
      !storeName ||
      !itemPrice ||
      !storeOrderId
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate images (minimum 2 required)
    if (newImageFiles.length < 2) {
      return NextResponse.json(
        { success: false, message: "At least 2 images are required" },
        { status: 400 },
      );
    }

    // Upload new images
    const uploadedImages = await Promise.all(
      newImageFiles.map((file, i) =>
        validateAndUploadImage(file, i, orderId, existingOrder.orderId),
      ),
    );

    const validUploadedImages = uploadedImages.filter(Boolean) as Array<{
      imagePath: string;
      imageUrl: string;
    }>;

    if (validUploadedImages.length < 2) {
      return NextResponse.json(
        { success: false, message: "Failed to upload required images" },
        { status: 400 },
      );
    }

    // Create new item and update order in transaction
    const newItem = await prisma.$transaction(async (tx) => {
      // Create the new item
      const item = await tx.shopNShipItem.create({
        data: {
          order: {
            connect: {
              orderId: existingOrder.orderId,
            },
          },
          itemType: "Shop n Ship",
          purchaseDate: new Date(purchaseDate),
          itemName,
          itemQuantity: parseInt(itemQuantity),
          itemColor,
          storeName,
          itemPrice: parseFloat(itemPrice),
          itemSize,
          itemWeight,
          storeOrderId,
          remarks,
          images: {
            createMany: {
              data: validUploadedImages.map((img) => ({
                imagePath: img.imagePath,
                imageUrl: img.imageUrl,
              })),
            },
          },
        },
        include: {
          images: {
            select: {
              id: true,
              imagePath: true,
              imageUrl: true,
            },
          },
        },
      });

      // Update order totals
      const newTotalAmount = existingOrder.totalAmount + parseFloat(itemPrice);
      const newTotalItems = existingOrder.totalItems + parseInt(itemQuantity);

      await tx.shopNShipOrder.update({
        where: { orderId: existingOrder.orderId },
        data: {
          totalAmount: newTotalAmount,
          totalItems: newTotalItems,
        },
      });

      return item;
    });

    revalidatePath(`/shop-n-ship/${existingOrder.orderId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Item added successfully",
        item: newItem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add item",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
// GET endpoint - Fetch order with pagination
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const userId = getUserId(request);
    if (!userId) return unauthorizedResponse();

    const { orderId } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Fetch order with items and total count in a single optimized query
    const [order, total] = await Promise.all([
      prisma.shopNShipOrder.findUnique({
        where: { orderId, userId },
        select: {
          orderId: true,
          status: true,
          totalAmount: true,
          totalItems: true,
          createdAt: true,
          updatedAt: true,
          addressId: true,
          order_type: true,
          courier_Type: true,
          items: {
            select: {
              id: true,
              itemType: true,
              itemName: true,
              storeName: true,
              storeOrderId: true,
              itemColor: true,
              itemSize: true,
              itemQuantity: true,
              itemPrice: true,
              itemWeight: true,
              remarks: true,
              purchaseDate: true,
              createdAt: true,
              images: {
                select: {
                  id: true,
                  imagePath: true,
                  imageUrl: true,
                },
              },
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      prisma.shopNShipItem.count({
        where: { order: { orderId, userId } },
      }),
    ]);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        order,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order" },
      { status: 500 },
    );
  }
}

// PUT endpoint - Update order item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const userId = getUserId(request);
    if (!userId) return unauthorizedResponse();

    const { orderId } = await params;

    // Verify item ownership
    const existingItem = await prisma.shopNShipItem.findFirst({
      where: { id: orderId, order: { userId } },
      select: {
        id: true,
        purchaseDate: true,
        itemName: true,
        itemQuantity: true,
        itemColor: true,
        storeName: true,
        itemPrice: true,
        itemSize: true,
        itemWeight: true,
        storeOrderId: true,
        images: {
          select: {
            id: true,
            imagePath: true,
          },
        },
        order: {
          select: { orderId: true },
        },
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        { success: false, message: "Item not found or unauthorized" },
        { status: 404 },
      );
    }

    const formData = await request.formData();

    // Extract and parse form data
    const purchaseDate = formData.get("purchaseDate") as string;
    const itemName = formData.get("itemName") as string;
    const itemQuantity = formData.get("itemQuantity") as string;
    const itemColor = formData.get("itemColor") as string;
    const storeName = formData.get("storeName") as string;
    const itemPrice = formData.get("itemPrice") as string;
    const itemSize = formData.get("itemSize") as string;
    const itemWeight = formData.get("itemWeight") as string;
    const storeOrderId = formData.get("storeOrderId") as string;

    const existingImagesStr = formData.get("existingImages") as string;
    const existingImages = existingImagesStr
      ? JSON.parse(existingImagesStr)
      : [];
    const newImageFiles = formData.getAll("images") as File[];

    // Determine images to delete (compare by imagePath)
    const existingImagePaths = new Set(
      existingImages.map((img: any) => img.imagePath),
    );
    const imagesToDelete = existingItem.images.filter(
      (img) => !existingImagePaths.has(img.imagePath),
    );

    // Delete removed images (filesystem + database in parallel)
    if (imagesToDelete.length > 0) {
      await Promise.all([
        deleteImageFiles(imagesToDelete),
        prisma.shopNShipItemImage.deleteMany({
          where: { id: { in: imagesToDelete.map((img) => img.id) } },
        }),
      ]);
    }

    // Upload new images
    const uploadedImages = await Promise.all(
      newImageFiles.map((file, i) =>
        validateAndUploadImage(file, i, orderId, existingItem.order.orderId),
      ),
    );

    const validUploadedImages = uploadedImages.filter(Boolean) as Array<{
      imagePath: string;
      imageUrl: string;
    }>;

    // Update item and add new images in transaction
    const updatedItem = await prisma.$transaction(async (tx) => {
      // Update the item
      const updated = await tx.shopNShipItem.update({
        where: { id: orderId },
        data: {
          purchaseDate: purchaseDate || existingItem.purchaseDate,
          itemName: itemName || existingItem.itemName,
          itemQuantity: itemQuantity
            ? parseInt(itemQuantity)
            : existingItem.itemQuantity,
          itemColor: itemColor || existingItem.itemColor,
          storeName: storeName || existingItem.storeName,
          itemPrice: itemPrice ? parseFloat(itemPrice) : existingItem.itemPrice,
          itemSize: itemSize || existingItem.itemSize,
          itemWeight: itemWeight || existingItem.itemWeight,
          storeOrderId: storeOrderId || existingItem.storeOrderId,
        },
        include: {
          images: {
            select: {
              id: true,
              imagePath: true,
              imageUrl: true,
            },
          },
        },
      });

      // Add new images if any
      if (validUploadedImages.length > 0) {
        await tx.shopNShipItemImage.createMany({
          data: validUploadedImages.map((img) => ({
            itemId: orderId,
            imagePath: img.imagePath,
            imageUrl: img.imageUrl,
          })),
        });

        // Fetch updated images
        const allImages = await tx.shopNShipItemImage.findMany({
          where: { itemId: orderId },
          select: {
            id: true,
            imagePath: true,
            imageUrl: true,
          },
        });

        return { ...updated, images: allImages };
      }

      return updated;
    });

    revalidatePath(`/shop-n-ship/${existingItem.order.orderId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Item updated successfully",
        item: updatedItem,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update item",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE endpoint - Delete order item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const userId = getUserId(request);
    if (!userId) return unauthorizedResponse();

    const { orderId } = await params;
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 },
      );
    }

    // Verify item ownership and get images
    const existingItem = await prisma.shopNShipItem.findFirst({
      where: { id: itemId, order: { userId } },
      select: {
        id: true,
        images: {
          select: { imagePath: true },
        },
        order: {
          select: { orderId: true },
        },
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        { success: false, message: "Item not found or unauthorized" },
        { status: 404 },
      );
    }

    // Delete images from filesystem and item from database in parallel
    await Promise.all([
      deleteImageFiles(existingItem.images),
      prisma.shopNShipItem.delete({ where: { id: itemId } }),
    ]);

    revalidatePath(`/shop-n-ship/${existingItem.order.orderId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Item deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete item",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
