import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Run queries in parallel for better performance
    const [orders, total, statusCounts] = await Promise.all([
      // Get paginated orders
      prisma.shopNShipOrder.findMany({
        where: { userId },
        select: {
          orderId: true,
          status: true,
          totalAmount: true,
          totalItems: true,
          createdAt: true,
          items: {
            select: {
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
              images: {
                select: {
                  imagePath: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),

      // Get total count for pagination
      prisma.shopNShipOrder.count({
        where: { userId },
      }),

      // Get status counts (grouped by status)
      prisma.shopNShipOrder.groupBy({
        by: ["status"],
        where: { userId },
        _count: {
          status: true,
        },
      }),
    ]);

    // Format status counts into a clean object
    const counts = {
      pending: 0,
      completed: 0,
      rejected: 0,
    };

    statusCounts.forEach((item) => {
      const status = item.status.toLowerCase();
      if (status in counts) {
        counts[status as keyof typeof counts] = item._count.status;
      }
    });

    return NextResponse.json(
      {
        success: true,
        orders,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        statusCounts: counts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
