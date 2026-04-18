"use client";
import CreateNewOrder from "./components/create-new-order";
import { OrderProvider } from "./context/order-context";
export default function CreateOrderPage() {
  return (
    <OrderProvider>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Order</h1>
        <p className="text-gray-600">
          Add items from your favorite Indian stores
        </p>
      </div>
      <CreateNewOrder />
    </OrderProvider>
  );
}
