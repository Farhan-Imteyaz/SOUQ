// app/api/shop-n-ship/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID missing" },
        { status: 401 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("q")?.trim() || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    // Calculate skip for pagination
    const skip = (page - 1) * pageSize;

    // Build the where clause
    const whereClause: any = {
      userId,
    };

    // Add search conditions if search term exists
    if (searchTerm) {
      whereClause.OR = [
        // Search by order ID
        {
          orderId: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        // Search by tracking number
        {
          trackingNumber: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        // Search by items
        {
          items: {
            some: {
              OR: [
                // Search by store name
                {
                  storeName: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                // Search by item name
                {
                  itemName: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                // Search by store order ID
                {
                  storeOrderId: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
                // Search by item type
                {
                  itemType: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        },
      ];
    }

    // Get total count for pagination
    const total = await prisma.order.count({
      where: whereClause,
    });

    // Get paginated orders
    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        items: {
          include: { images: true },
        },
        address: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    });

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      searchTerm: searchTerm || null,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to search orders",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
