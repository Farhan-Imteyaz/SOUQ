"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "../components/header";
import OrderDetails from "../components/order-details";
import { EditPageProvider } from "../context/edit-page-context";

const PAGE_SIZE = 10;

type Order = {
  id: string;
  items: any[];
  [key: string]: any;
};

type FetchOrderResponse = {
  order: Order;
  total: number;
  totalPages: number;
};

const Page = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(
    async (pageNumber: number) => {
      if (!orderId) return;

      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get<FetchOrderResponse>(
          `/api/shop-n-ship/${orderId}`,
          {
            params: {
              page: pageNumber,
              limit: PAGE_SIZE,
            },
          },
        );

        setOrder(data.order);
        setPage(pageNumber);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Failed to load order. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [orderId],
  );

  useEffect(() => {
    fetchOrder(1);
  }, [fetchOrder]);

  if (loading && !order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading order details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Order not found</div>
      </div>
    );
  }

  return (
    <EditPageProvider order={order}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <OrderDetails
            items={order.items}
            page={page}
            total={total}
            pageSize={PAGE_SIZE}
            totalPages={totalPages}
            onPageChange={fetchOrder}
            loading={loading}
          />
        </main>
      </div>
    </EditPageProvider>
  );
};

export default Page;
