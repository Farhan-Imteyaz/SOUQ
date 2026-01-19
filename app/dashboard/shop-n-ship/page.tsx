"use client";
import Header from "./create/components/Header";
import StatCards from "./components/stat-cards";
import RecentOrders from "./components/recent-orders";
import { useState, useEffect,useMemo } from "react";
import axios from "axios";

const PAGE_SIZE = 15;
export default function Page() {
 const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    completed: 0,
    rejected: 0,
  });
  const fetchOrders = async (pageNumber = page) => {
    setLoading(true);
    const res = await axios.get("/api/shop-n-ship/get", {
      params: {
        page: pageNumber,
        limit: PAGE_SIZE,
      },
    });
    

    setOrders(res.data.orders);
    setTotal(res.data.total);
    setPage(pageNumber);
    setLoading(false);
      setStatusCounts(res.data.statusCounts);
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);
  
  return (
    <div className=" mb-12 ">
  
      <Header />
      <StatCards total={total} status={statusCounts}  />

      <RecentOrders 
        orders={orders}
        page={page}
        total={total}
        pageSize={PAGE_SIZE}
        onPageChange={fetchOrders}
        loading={loading} 
        />
    </div>
  );
}
