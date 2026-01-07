'use client';

import Link from 'next/link';
import { Package, Plus, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

interface OrderStats {
  currentOrders: number;
  orderInProgress: number;
  ordersInShipment: number;
  completedRejected: number;
}

export default function ShopNShipDashboard() {
  // This data would come from your backend/API
  const orderStats: OrderStats = {
    currentOrders: 0,
    orderInProgress: 0,
    ordersInShipment: 0,
    completedRejected: 0
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop n Ship</h1>
            <p className="text-gray-600">Manage your package forwarding orders</p>
          </div>
          <Link
            href="/dashboard/shop-n-ship/create-order"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Order
          </Link>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Current Orders */}
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
          <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Orders</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">{orderStats.currentOrders}</div>
          <p className="text-sm text-gray-500">No. of Orders</p>
        </div>

        {/* Order in Progress */}
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
          <div className="h-12 w-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order in Progress</h3>
          <div className="text-3xl font-bold text-yellow-600 mb-2">{orderStats.orderInProgress}</div>
          <p className="text-sm text-gray-500">No. of Orders</p>
        </div>

        {/* Orders in Shipment */}
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
          <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Truck className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Orders in Shipment</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">{orderStats.ordersInShipment}</div>
          <p className="text-sm text-gray-500">No. of Orders</p>
        </div>

        {/* Completed/Rejected */}
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
          <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed/Rejected</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">{orderStats.completedRejected}</div>
          <p className="text-sm text-gray-500">No. of Orders</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
        
        {/* Empty State */}
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first Shop n Ship order</p>
          <Link
            href="/dashboard/shop-n-ship/create-order"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Your First Order
          </Link>
        </div>
      </div>
    </div>
  );
}