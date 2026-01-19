import { z } from "zod";
export interface OrderItem {
  id: string;
  itemType: string;
  itemName: string;
  storeName: string;
  storeOrderId: string;
  itemColor: string;
  itemSize: string;
  itemQuantity: number;
  itemPrice: number;
  remarks: string;
  images: File[];
  purchaseDate: Date;
  itemWeight: string;
}

export const orderItemSchema = z.object({
  items: z.array(
    z.object({
      itemType: z.string().min(1, "Item type is required"),
      itemName: z
        .string()
        .min(1, "Item name is required")
        .max(30, "Item name is too long"),
      storeName: z
        .string()
        .min(1, "Online store is required")
        .max(12, "Store name is too long"),
      storeOrderId: z
        .string()
        .min(3, "Order ID is required")
        .max(25, "Order ID is too long"),
      itemColor: z
        .string()
        .min(1, "Color name is required")
        .max(10, "Color name is too long"),
      itemSize: z
        .string()
        .max(30, "Size is too long")
        .optional()
        .or(z.literal("")),
      itemQuantity: z.number().int().min(1, "Quantity must be at least 1"),
      itemPrice: z.number().min(0.01, "Price must be greater than 0"),
      remarks: z
        .string()
        .max(500, "Remarks is too long")
        .optional()
        .or(z.literal("")),
      purchaseDate: z.date().min(1, "Purchase date is required"),
      itemWeight: z.string().max(5, "weight not supported").optional(),
      images: z
        .array(z.any())
        .min(2, "At least 2 images are required")
        .max(6, "Maximum 6 images allowed"),
    }),
  ),
});

export type OrderItemFormData = z.infer<typeof orderItemSchema>;

export interface AddressFormData {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  addressType: "home" | "office";
}

export const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  addressLine1: z.string().min(5, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Valid 6-digit pincode required"),
  country: z.string().min(2, "Country is required"),
  addressType: z
    .enum(["home", "office"])
    .refine((value) => value !== undefined, {
      message: "Please select address type",
    }),
});
