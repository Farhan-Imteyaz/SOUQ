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
import { compressImages } from "@/lib/image-compressor";
import { OrderItem } from "@/types/order-types";

interface OrderContextType {
  items: OrderItem[];
  addItem: (event: FormEvent) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<OrderItem>) => void;
  handleFileUpload: (
    itemId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  removeImageFromItem: (id: string, fileIndex: number) => void;
  getTotalPrice: () => number;
  isCompressing: boolean;
}

const OrderContext = createContext<OrderContextType | null>(null);

const DEFAULT_ORDER_VALUES: Omit<OrderItem, "id" | "purchaseDate"> = {
  itemType: "",
  itemName: "",
  storeName: "",
  storeOrderId: "",
  itemColor: "",
  itemSize: "",
  itemQuantity: 1,
  itemPrice: 0,
  remarks: "",
  images: [],
  itemWeight: "",
};

const createOrderItem = (): OrderItem => ({
  ...DEFAULT_ORDER_VALUES,
  id: crypto.randomUUID(),
  purchaseDate: new Date(),
});

const blobToFile = (blob: Blob, originalFile: File) =>
  new File([blob], originalFile.name, {
    type: blob.type,
    lastModified: Date.now(),
  });

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([createOrderItem()]);
  const [isCompressing, setIsCompressing] = useState(false);

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

  const updateItem = useCallback((id: string, updates: Partial<OrderItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const hasChanges = Object.keys(updates).some(
          (key) =>
            item[key as keyof OrderItem] !== updates[key as keyof OrderItem],
        );
        return hasChanges ? { ...item, ...updates } : item;
      }),
    );
  }, []);

  const getTotalPrice = useCallback(
    () =>
      items.reduce(
        (total, item) => total + item.itemPrice * item.itemQuantity,
        0,
      ),
    [items],
  );

  const handleFileUpload = useCallback(
    async (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (!selectedFiles) return;

      const newFiles = Array.from(selectedFiles);

      if (newFiles.some((file) => file.size > 8 * 1024 * 1024)) {
        toast.error("Each image must be less than 8MB");
        return;
      }

      const currentItem = items.find((item) => item.id === itemId);
      if (!currentItem) {
        toast.error("Item not found");
        return;
      }

      if (currentItem.images.length + newFiles.length > 6) {
        toast.error("Maximum 6 images allowed per item");
        return;
      }

      setIsCompressing(true);
      try {
        const result = await compressImages(newFiles, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          quality: 0.8,
        });
        const compressedBlobs =
          "files" in result
            ? result.files
            : Array.isArray(result)
              ? result
              : [result];
        const compressedFiles = compressedBlobs.map((blob, i) =>
          blobToFile(blob, newFiles[i]),
        );

        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, images: [...item.images, ...compressedFiles] }
              : item,
          ),
        );
        event.target.value = "";
      } catch {
        toast.error("Failed to compress images");
      } finally {
        setIsCompressing(false);
      }
    },
    [items],
  );

  const removeImageFromItem = useCallback((id: string, fileIndex: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, images: item.images.filter((_, i) => i !== fileIndex) }
          : item,
      ),
    );
    toast.success("Image removed");
  }, []);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateItem,
      handleFileUpload,
      removeImageFromItem,
      getTotalPrice,
      isCompressing,
    }),
    [
      items,
      isCompressing,
      addItem,
      removeItem,
      updateItem,
      handleFileUpload,
      removeImageFromItem,
      getTotalPrice,
    ],
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

export const prepareOrderFormData = (items: OrderItem[]): FormData => {
  const formData = new FormData();
  formData.append(
    "items",
    JSON.stringify(
      items.map(({ images, ...item }) => ({
        ...item,
        imageCount: images.length,
      })),
    ),
  );
  items.forEach((item, itemIndex) => {
    item.images.forEach((file, fileIndex) => {
      formData.append(`item_${itemIndex}_image_${fileIndex}`, file);
    });
  });
  return formData;
};
