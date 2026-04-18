"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  FormEvent,
} from "react";
import { toast } from "sonner";
import { AssistedOrderItem } from "@/types/order-types";

interface OrderContextType {
  items: AssistedOrderItem[];
  addItem: (event: FormEvent) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<AssistedOrderItem>) => void;
  getTotalPrice: () => number;
}

const OrderContext = createContext<OrderContextType | null>(null);

const createOrderItem = (): AssistedOrderItem => ({
  id: crypto.randomUUID(),
  itemType: "",
  itemName: "",
  storeName: "",
  referenceNumber: "",
  itemColor: "",
  itemSize: "",
  itemQuantity: 1,
  itemPrice: 0,
  remarks: "",
  itemWeight: "",
});

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<AssistedOrderItem[]>([createOrderItem()]);

  const addItem = useCallback((e: FormEvent) => {
    e.preventDefault();
    setItems((prev) => [...prev, createOrderItem()]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      if (prev.length <= 1) {
        toast.error("At least one item is required");
        return prev;
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const updateItem = useCallback(
    (id: string, updates: Partial<AssistedOrderItem>) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          const hasChanges = Object.keys(updates).some(
            (key) =>
              item[key as keyof AssistedOrderItem] !==
              updates[key as keyof AssistedOrderItem],
          );
          return hasChanges ? { ...item, ...updates } : item;
        }),
      );
    },
    [],
  );

  const getTotalPrice = useCallback(
    () =>
      items.reduce(
        (total, item) => total + item.itemPrice * item.itemQuantity,
        0,
      ),
    [items],
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateItem, getTotalPrice }),
    [items, addItem, removeItem, updateItem, getTotalPrice],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrderContext must be used within OrderProvider");
  return context;
};

export const prepareOrderFormData = (items: AssistedOrderItem[]): FormData => {
  const formData = new FormData();
  formData.append("items", JSON.stringify(items));
  return formData;
};
