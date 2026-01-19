"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  orders: any[];
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  loading: boolean;
};

const RecentOrders = ({
  orders,
  page,
  total,
  pageSize,
  onPageChange,
  loading,
}: Props) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Souqza Order-ID</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead>Tracking Number</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })
                  : ""}
              </TableCell>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.items[0].itemType}</TableCell>
              <TableCell>{order.items[0].trackingNumber}</TableCell>
              <TableCell>{order.totalItems}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell><Link href={`/dashboard/shop-n-ship/view/${order.orderId}` }>
              View</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


     
        <div className="mt-6 w-full flex justify-end">
          <Pagination >
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(Math.max(page - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => onPageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    onPageChange(Math.min(page + 1, totalPages))
                  }
                  className={
                    page === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
    
    </div>
  );
};

export default RecentOrders;
