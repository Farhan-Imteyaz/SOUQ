import { z } from "zod";

// ============================================
// Shared Schemas & Utilities
// ============================================

const requiredString = (field: string, min = 1) =>
  z.string().min(min, `${field} is required`);

const optionalString = (maxLength?: number) =>
  maxLength
    ? z.string().max(maxLength).optional().or(z.literal(""))
    : z.string().optional().or(z.literal(""));

const phoneSchema = z.object({
  countryCode: z.string().min(1),
  number: z.string().min(10, "Valid phone number is required"),
});

// ============================================
// Order Item Schema & Types
// ============================================

export const orderItemSchema = z.object({
  items: z.array(
    z.object({
      itemType: requiredString("Item type"),
      itemName: requiredString("Item name").max(30, "Item name is too long"),
      storeName: requiredString("Online store").max(
        12,
        "Store name is too long",
      ),
      storeOrderId: requiredString("Order ID", 3).max(
        25,
        "Order ID is too long",
      ),
      itemColor: requiredString("Color name").max(10, "Color name is too long"),
      itemSize: optionalString(30),
      itemQuantity: z.number().int().min(1, "Quantity must be at least 1"),
      itemPrice: z.number().positive("Price must be greater than 0"),
      remarks: optionalString(500),
      purchaseDate: z.date().refine((date) => date !== null, "Purchase date is required"),
      itemWeight: optionalString(5),
      images: z
        .array(z.instanceof(File))
        .min(2, "At least 2 images are required")
        .max(6, "Maximum 6 images allowed"),
    }),
  ),
});

export type OrderItemFormData = z.infer<typeof orderItemSchema>;
export type OrderItem = OrderItemFormData["items"][number] & { id: string };

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
// Combined Form Schema (Items + Address)
// ============================================

export const completeOrderSchema = z.object({
  items: orderItemSchema.shape.items,
  address: addressSchema,
});

export type CompleteOrderFormData = z.infer<typeof completeOrderSchema>;

// ============================================
// Type Exports
// ============================================

export type Phone = z.infer<typeof phoneSchema>;
