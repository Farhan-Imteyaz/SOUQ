"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { FormEvent } from "react";
import { compressImages } from "@/lib/image-compressor";
import { useCallback } from "react";
import { useMemo } from "react";
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

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const orderValues = {
    id: crypto.randomUUID(),
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
    purchaseDate: new Date(),
    itemWeight: "",
  };

  const [items, setItems] = useState<OrderItem[]>([orderValues]);
  const [isCompressing, setIsCompressing] = useState(false);
  const addItem = (e: FormEvent) => {
    e.preventDefault();

    // Clone a new item so each has its own Date object
    const newItem: OrderItem = {
      ...orderValues,
      id: crypto.randomUUID(),
      purchaseDate: new Date(), // ensures a fresh date for new item
    };

    setItems((prev) => [...prev, newItem]);

    toast.success("New item added");
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));

      toast.success("Item removed");
    } else {
      toast.error("At least one item is required");
    }
  };

  const updateItem = useCallback((id: string, updates: Partial<OrderItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        let changed = false;
        for (const key in updates) {
          if (
            item[key as keyof OrderItem] !== updates[key as keyof OrderItem]
          ) {
            changed = true;
            break;
          }
        }

        return changed ? { ...item, ...updates } : item;
      }),
    );
  }, []);

  const getTotalPrice = useCallback(() => {
    return items.reduce(
      (total, item) => total + item.itemPrice * item.itemQuantity,
      0,
    );
  }, [items]);

  const blobToFile = (blob: Blob, originalFile: File) =>
    new File([blob], originalFile.name, {
      type: blob.type,
      lastModified: Date.now(),
    });

  const handleFileUpload = async (
    itemId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsCompressing(true);
    try {
      const selectedFiles = event.target.files;
      if (!selectedFiles) {
        return;
      }

      const newFiles = Array.from(selectedFiles);

      // Check for oversized files
      const oversizedFiles = newFiles.filter(
        (file) => file.size > 8 * 1024 * 1024,
      );
      if (oversizedFiles.length > 0) {
        toast.error("Each image must be less than 8MB");
        return;
      }

      // ✅ Check image count BEFORE compressing
      const currentItem = items.find((item) => item.id === itemId);
      if (!currentItem) {
        toast.error("Item not found");
        return;
      }

      if (currentItem.images.length + newFiles.length > 6) {
        toast.error("Maximum 6 images allowed per item");
        return;
      }

      // Compress images
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

      const compressedFiles = compressedBlobs.map((blob, index) =>
        blobToFile(blob, newFiles[index]),
      );

      // Update items
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, images: [...item.images, ...compressedFiles] }
            : item,
        ),
      );

      setIsCompressing(false);

      event.target.value = "";
    } catch (error) {
      toast.error("Failed to compress images");
      setIsCompressing(false);
    }
  };

  const removeImageFromItem = (id: string, fileIndex: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              images: item.images.filter((_, index) => index !== fileIndex),
            }
          : item,
      ),
    );
    toast.success("Image removed");
  };

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
    [items,isCompressing],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within OrderProvider");
  }
  return context;
};

export const prepareOrderFormData = (items: OrderItem[]): FormData => {
  const formData = new FormData();

  const itemsData = items.map(({ images, ...item }) => ({
    ...item,
    imageCount: images.length,
  }));

  formData.append("items", JSON.stringify(itemsData));

  items.forEach((item, itemIndex) => {
    item.images.forEach((file, fileIndex) => {
      formData.append(`item_${itemIndex}_image_${fileIndex}`, file);
    });
  });

  return formData;
};
