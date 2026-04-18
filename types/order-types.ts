import { z } from "zod";

// ============================================
// Shared Utilities
// ============================================

const requiredString = (field: string, min = 1) =>
  z.string().min(min, `${field} is required`);

const optionalString = (maxLength?: number) =>
  maxLength
    ? z.string().max(maxLength).optional().or(z.literal(""))
    : z.string().optional().or(z.literal(""));

// ============================================
// Address Schema & Types
// ============================================

export const addressSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .optional(),
  streetAddress: requiredString("Street address", 5),
  aptSuitBldgGateCode: requiredString("Apt/Suite/Building/Gate code"),
  city: requiredString("City", 2),
  phone: z.string().min(10, "Valid phone number is required").optional(),
  state: requiredString("State", 2),
  country: requiredString("Country", 2),
  zipcode: z.string().regex(/^\d{6}$/, "Valid 6-digit zipcode required"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

// ============================================
// Shop-N-Ship Schemas & Types
// ============================================

export const shopNShipItemSchema = z.object({
  itemType: requiredString("Item type"),
  itemName: requiredString("Item name").max(30, "Item name is too long"),
  storeName: requiredString("Online store").max(12, "Store name is too long"),
  storeOrderId: requiredString("Order ID", 3).max(25, "Order ID is too long"),
  itemColor: requiredString("Color name").max(10, "Color name is too long"),
  itemSize: optionalString(30),
  itemQuantity: z.number().int().min(1, "Quantity must be at least 1"),
  itemPrice: z.number().positive("Price must be greater than 0"),
  remarks: optionalString(500),
  purchaseDate: z
    .date()
    .refine((date) => date !== null, "Purchase date is required"),
  itemWeight: optionalString(5),
  images: z
    .array(z.instanceof(File))
    .min(2, "At least 2 images are required")
    .max(6, "Maximum 6 images allowed"),
});

export const shopNShipOrderSchema = z.object({
  items: z.array(shopNShipItemSchema),
});

export const shopNShipCompleteSchema = z.object({
  items: shopNShipOrderSchema.shape.items,
  address: addressSchema,
});

export type ShopNShipItemFormData = z.infer<typeof shopNShipItemSchema>;
export type ShopNShipOrderFormData = z.infer<typeof shopNShipOrderSchema>;
export type ShopNShipCompleteFormData = z.infer<typeof shopNShipCompleteSchema>;

export interface ShopNShipItem extends ShopNShipItemFormData {
  id: string;
}

// ============================================
// Assisted Purchase Schemas & Types
// ============================================

export const assistedPurchaseItemSchema = z.object({
  itemType: requiredString("Item type"),
  itemName: requiredString("Item name").max(30, "Item name is too long"),
  storeName: requiredString("Online store").max(12, "Store name is too long"),
  referenceNumber: optionalString(25),
  itemColor: requiredString("Color name").max(10, "Color name is too long"),
  itemSize: optionalString(30),
  itemQuantity: z.number().int().min(1, "Quantity must be at least 1"),
  itemPrice: z.number().positive("Price must be greater than 0"),
  remarks: optionalString(500),
  itemWeight: optionalString(5),
});

export const assistedPurchaseOrderSchema = z.object({
  items: z.array(assistedPurchaseItemSchema),
});

export const assistedPurchaseCompleteSchema = z.object({
  items: assistedPurchaseOrderSchema.shape.items,
  address: addressSchema,
});

export type AssistedPurchaseItemFormData = z.infer<
  typeof assistedPurchaseItemSchema
>;
export type AssistedPurchaseOrderFormData = z.infer<
  typeof assistedPurchaseOrderSchema
>;
export type AssistedPurchaseCompleteFormData = z.infer<
  typeof assistedPurchaseCompleteSchema
>;

export interface AssistedOrderItem extends AssistedPurchaseItemFormData {
  id: string;
}

// ============================================
// Legacy exports (keep for backward compat during migration)
// ============================================

/** @deprecated use ShopNShipCompleteFormData */
export const completeOrderSchema = shopNShipCompleteSchema;
/** @deprecated use ShopNShipCompleteFormData */
export type CompleteOrderFormData = ShopNShipCompleteFormData;
