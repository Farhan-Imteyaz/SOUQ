"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTotal, setSearchTotal] = useState(0);
  const [searchPage, setSearchPage] = useState(1);

  const isSearching = searchTerm.length > 0;
  const displayOrders = isSearching ? searchResults : orders;
  const displayTotal = isSearching ? searchTotal : total;
  const displayPage = isSearching ? searchPage : page;
  const displayTotalPages = Math.ceil(displayTotal / pageSize);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setSearchTotal(0);
      setSearchPage(1);
      setLoadingSearch(false); // Important: stop loading when search is cleared
      return;
    }

    setLoadingSearch(true);

    const timer = setTimeout(async () => {
      await fetchOrders();
      setLoadingSearch(false);
    }, 700);

    return () => {
      clearTimeout(timer);
      // Don't set loadingSearch to false here - let it finish naturally
    };
  }, [searchTerm, searchPage]);

  const fetchOrders = async () => {
    const response = await fetch(
      `/api/shop-n-ship/search/orders/?q=${encodeURIComponent(searchTerm)}&page=${searchPage}&pageSize=${pageSize}`,
    );
    const result = await response.json();
    if (result.success) {
      setSearchResults(result.data);
      setSearchTotal(result.pagination.total);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (isSearching) {
      setSearchPage(newPage);
    } else {
      onPageChange(newPage);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchTotal(0);
    setSearchPage(1);
    setLoadingSearch(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>

        <div className="min-w-88 relative">
          <Input
            className="w-full"
            placeholder="Search orders by ID, store name, item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm.length > 0 && (
            <Button
              onClick={handleClearSearch}
              className="p-1 shadow-none bg-transparent group absolute hover:bg-transparent top-1/2 -translate-y-1/2 right-1 h-auto!"
            >
              <CircleX className="stroke-red-500 size-4! group-hover:fill-red-500 group-hover:stroke-red-50" />
            </Button>
          )}
        </div>
      </div>

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
          {loadingSearch ? (
            <TableRow>
              <TableCell colSpan={8} className="h-64">
                <div className="flex items-center justify-center">
                  <LineSpinner />
                </div>
              </TableCell>
            </TableRow>
          ) : displayOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-64">
                <div className="flex items-center justify-center">
                  <p className="flex items-center gap-2 text-gray-500">
                    <Frown className="stroke-yellow-500" />
                    {isSearching ? "No results found" : "No orders yet"}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            displayOrders.map((order) => (
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
                <TableCell>{order.items[0]?.itemType}</TableCell>
                <TableCell>{order.items[0]?.trackingNumber}</TableCell>
                <TableCell>{order.totalItems}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/shop-n-ship/view/${order.orderId}`}>
                    <Button
                      className="cursor-pointer bg-transparent! border text-slate-950 text-xs h-auto! p-2! pb-1.5!"
                      type="button"
                    >
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {displayOrders.length > 0 && (
        <div className="mt-6 w-full flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(displayPage - 1, 1))}
                  className={
                    displayPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: displayTotalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={displayPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(
                      Math.min(displayPage + 1, displayTotalPages),
                    )
                  }
                  className={
                    displayPage === displayTotalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
