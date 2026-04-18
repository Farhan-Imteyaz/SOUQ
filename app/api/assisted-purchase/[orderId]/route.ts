import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const getUserId = (request: NextRequest): string | null => {
  return request.headers.get("x-user-id");
};

const unauthorizedResponse = () => {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
    const existingOrder = await prisma.assistedPurchaseOrder.findUnique({
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
    const itemName = formData.get("itemName") as string;
    const itemQuantity = formData.get("itemQuantity") as string;
    const itemColor = formData.get("itemColor") as string;
    const storeName = formData.get("storeName") as string;
    const itemPrice = formData.get("itemPrice") as string;
    const itemSize = formData.get("itemSize") as string;
    const itemWeight = formData.get("itemWeight") as string;
    const referenceNumber = formData.get("referenceNumber") as string;

    const remarks = (formData.get("remarks") as string) || "";

    // Validate required fields
    if (!itemName || !itemQuantity || !itemColor || !storeName || !itemPrice) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate images (minimum 2 required)

    // Create new item and update order in transaction
    const newItem = await prisma.$transaction(async (tx) => {
      // Create the new item
      const item = await tx.assistedPurchaseItem.create({
        data: {
          order: {
            connect: {
              orderId: existingOrder.orderId,
            },
          },
          itemType: "Assisted Purchase",
          itemName,
          itemQuantity: parseInt(itemQuantity),
          itemColor,
          storeName,
          itemPrice: parseFloat(itemPrice),
          itemSize: itemSize,
          itemWeight: itemWeight,
          remarks,
          referenceNumber,
        },
      });

      // Update order totals
      const newTotalAmount = existingOrder.totalAmount + parseFloat(itemPrice);
      const newTotalItems = existingOrder.totalItems + parseInt(itemQuantity);

      await tx.assistedPurchaseOrder.update({
        where: { orderId: existingOrder.orderId },
        data: {
          totalAmount: newTotalAmount,
          totalItems: newTotalItems,
        },
      });

      return item;
    });

    revalidatePath(`/assisted-purchase/${existingOrder.orderId}`);

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
      prisma.assistedPurchaseOrder.findUnique({
        where: { orderId, userId },
        select: {
          orderId: true,
          status: true,
          totalAmount: true,
          totalItems: true,
          createdAt: true,
          updatedAt: true,
          addressId: true,
          items: {
            select: {
              id: true,
              itemType: true,
              itemName: true,
              storeName: true,
              itemColor: true,
              itemSize: true,
              itemQuantity: true,
              referenceNumber: true,
              itemPrice: true,
              itemWeight: true,
              remarks: true,
              createdAt: true,
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      prisma.assistedPurchaseItem.count({
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
    const existingItem = await prisma.assistedPurchaseItem.findFirst({
      where: { id: orderId, order: { userId } },
      select: {
        id: true,
        itemName: true,
        itemQuantity: true,
        itemColor: true,
        storeName: true,
        itemPrice: true,
        itemSize: true,
        itemWeight: true,
        referenceNumber: true,
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

    const itemName = formData.get("itemName") as string;
    const itemQuantity = formData.get("itemQuantity") as string;
    const itemColor = formData.get("itemColor") as string;
    const storeName = formData.get("storeName") as string;
    const itemPrice = formData.get("itemPrice") as string;
    const itemSize = formData.get("itemSize") as string;
    const itemWeight = formData.get("itemWeight") as string;
    const referenceNumber = formData.get("referenceNumber") as string;

    // Upload new images

    // Update item and add new images in transaction
    const updatedItem = await prisma.$transaction(async (tx) => {
      // Update the item
      const updated = await tx.assistedPurchaseItem.update({
        where: { id: orderId },
        data: {
          itemName: itemName || existingItem.itemName,
          itemQuantity: itemQuantity
            ? parseInt(itemQuantity)
            : existingItem.itemQuantity,
          itemColor: itemColor || existingItem.itemColor,
          storeName: storeName || existingItem.storeName,
          itemPrice: itemPrice ? parseFloat(itemPrice) : existingItem.itemPrice,
          itemSize: itemSize || existingItem.itemSize,
          itemWeight: itemWeight || existingItem.itemWeight,
          referenceNumber: referenceNumber || existingItem.referenceNumber,
        },
      });

      return updated;
    });

    revalidatePath(`/assisted-purchase/${existingItem.order.orderId}`);

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
    const existingItem = await prisma.assistedPurchaseItem.findFirst({
      where: { id: itemId, order: { userId } },
      select: {
        id: true,
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
      prisma.assistedPurchaseItem.delete({ where: { id: itemId } }),
    ]);

    revalidatePath(`/assisted-purchase/${existingItem.order.orderId}`);

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
