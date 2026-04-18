"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import AddressForm from "./address-form";
import {
  CircleCheck,
  Plus,
  Trash2,
  Gift,
  Box,
  User2Icon,
  TestTube,
} from "lucide-react";
import OrderSummary from "./order-summary";
import FormContent from "./form-content";
import { useOrderContext } from "../context/order-context";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  completeOrderSchema,
  CompleteOrderFormData,
} from "@/types/order-types";
import { prepareOrderFormData } from "../context/order-context";
import { FieldErrors, FieldError } from "react-hook-form";
import { useRouter } from "next/navigation";

const STEPS = ["Add item", "Priority", "Add address"] as const;
const DEBOUNCE_DELAY = 500;
const CONTEXT_UPDATE_DELAY = 100;

const courier_type = [
  {
    value: "normal",
    label: "Normal",
    description: "perfect for most people",
    icon: "🛡️",
  },
  {
    value: "premium",
    label: "Premium",
    description: "for the most important items",
    icon: "📦",
  },
];

const ORDER_TYPE_OPTIONS = [
  {
    key: "commercial",
    label: "Commercial",
    description: "Business shipment",
    icon: <Box />,
  },
  {
    key: "gift",
    label: "Gift",
    description: "Sent as a present",
    icon: <Gift />,
  },
  {
    key: "personal",
    label: "Personal",
    description: "Personal use items",
    icon: <User2Icon />,
  },
  {
    key: "sample",
    label: "Sample",
    description: "Product sample",
    icon: <TestTube />,
  },
] as const;

type OrderType = (typeof ORDER_TYPE_OPTIONS)[number]["key"];

const CreateNewOrder = () => {
  const { items, addItem, updateItem, removeItem } = useOrderContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [savedAddress, setSavedAddress] = useState<any>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [orderType, setOrderType] = useState<OrderType>("commercial");
  const [courierType, setCourierType] = useState("normal");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isInitialMount = useRef(true);
  const isUpdatingFromContext = useRef(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mapItemsToFormData = (items: any[]) =>
    items.map((item) => ({
      itemType: item.itemType ?? "",
      itemName: item.itemName ?? "",
      storeName: item.storeName ?? "",
      itemColor: item.itemColor ?? "",
      itemSize: item.itemSize ?? "",
      itemQuantity: item.itemQuantity ?? 1,
      itemPrice: item.itemPrice ?? 0,
      remarks: item.remarks ?? "",
      itemWeight: item.itemWeight ?? "",
    }));

  const formMethods = useForm<CompleteOrderFormData>({
    resolver: zodResolver(completeOrderSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      items: mapItemsToFormData(items),
      address: {
        firstName: "",
        lastName: "",
        streetAddress: "",
        aptSuitBldgGateCode: "",
        city: "",
        phone: "",
        state: "",
        country: "",
        zipcode: "",
      },
    },
  });

  // ============================================
  // Utility Functions
  // ============================================

  const extractErrors = (
    errors: FieldErrors<CompleteOrderFormData>,
  ): string[] => {
    const messages: string[] = [];

    if (errors?.items && Array.isArray(errors.items)) {
      errors.items.forEach((itemError, index) => {
        if (!itemError || typeof itemError !== "object") return;
        Object.entries(itemError).forEach(([field, fieldError]) => {
          if (
            fieldError &&
            typeof fieldError === "object" &&
            "message" in fieldError
          ) {
            const error = fieldError as FieldError;
            if (error.message)
              messages.push(`Item ${index + 1}: ${error.message}`);
          }
        });
      });
    }

    if (errors?.address) {
      Object.entries(errors.address).forEach(([field, fieldError]) => {
        if (
          fieldError &&
          typeof fieldError === "object" &&
          "message" in fieldError
        ) {
          const error = fieldError as FieldError;
          if (error.message) messages.push(`Address: ${error.message}`);
        }
      });
    }

    return messages;
  };

  const clearUpdateTimeout = () => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
      updateTimeoutRef.current = null;
    }
  };

  // ============================================
  // Sync form with context (debounced)
  // ============================================

  useEffect(() => {
    const subscription = formMethods.watch((formData) => {
      if (isUpdatingFromContext.current || !formData.items) return;

      clearUpdateTimeout();

      updateTimeoutRef.current = setTimeout(() => {
        formData.items?.forEach((formItem, index) => {
          const contextItem = items[index];
          if (!contextItem || !formItem) return;

          updateItem(contextItem.id, {
            itemType: formItem.itemType || "",
            itemName: formItem.itemName || "",
            storeName: formItem.storeName || "",
            itemColor: formItem.itemColor || "",
            itemSize: formItem.itemSize || "",
            itemQuantity: formItem.itemQuantity ?? 1,
            itemPrice: formItem.itemPrice ?? 0,
            remarks: formItem.remarks || "",
            itemWeight: formItem.itemWeight || "",
          });
        });
      }, DEBOUNCE_DELAY);
    });

    return () => {
      subscription.unsubscribe();
      clearUpdateTimeout();
    };
  }, [items, updateItem, formMethods]);

  // ============================================
  // Sync context with form when items added/removed
  // ============================================

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentFormItems = formMethods.getValues("items");
    if (currentFormItems.length === items.length) return;

    isUpdatingFromContext.current = true;

    formMethods.reset(
      {
        items: mapItemsToFormData(items),
        address: formMethods.getValues("address"),
      },
      { keepErrors: false, keepDirty: false },
    );

    setTimeout(() => {
      isUpdatingFromContext.current = false;
    }, CONTEXT_UPDATE_DELAY);
  }, [items.length, formMethods, items]);

  // ============================================
  // Sync images separately
  // ============================================

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetch("/api/address");
      const data = await response.json();
      setSavedAddress(data.addresses);
    };
    fetchAddress();
  }, []);

  // ============================================
  // Event Handlers
  // ============================================

  const handleAddItem = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const isValid = await formMethods.trigger("items");
      if (!isValid) {
        const messages = extractErrors(formMethods.formState.errors);
        messages.forEach((msg) => toast.error(msg));
        return;
      }

      addItem(e);
      toast.success("Item added successfully!");
    },
    [addItem, formMethods],
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItem(itemId);
    },
    [removeItem],
  );

  const handleContinue = async () => {
    if (currentStep === 0) {
      const isValid = await formMethods.trigger("items");
      if (!isValid) {
        const messages = extractErrors(formMethods.formState.errors);
        messages.forEach((msg) => toast.error(msg));
        return;
      }
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  const handleSelectAddress = (addressId: string, address: any) => {
    setSelectedAddressId(addressId);
    formMethods.setValue("address", {
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      streetAddress: address.streetAddress,
      aptSuitBldgGateCode: address.aptSuitBldgGateCode,
      city: address.city,
      phone: address.phone || "",
      state: address.state,
      country: address.country,
      zipcode: address.zipcode,
    });
    setShowAddressForm(false);
  };

  const handleAddNewAddress = () => {
    setSelectedAddressId(null);
    setShowAddressForm(true);
    formMethods.setValue("address", {
      firstName: "",
      lastName: "",
      streetAddress: "",
      aptSuitBldgGateCode: "",
      city: "",
      phone: "",
      state: "",
      country: "",
      zipcode: "",
    });
  };

  const onSubmit = async (data: CompleteOrderFormData) => {
    setIsSubmitting(true);
    clearUpdateTimeout();
    await new Promise((resolve) => setTimeout(resolve, CONTEXT_UPDATE_DELAY));

    const toastId = toast.loading("Creating order...");

    try {
      const orderFormData = prepareOrderFormData(items);

      orderFormData.append("orderType", orderType);
      orderFormData.append("insurance", courierType);

      if (selectedAddressId) {
        orderFormData.append("addressId", selectedAddressId);
      }

      const orderResponse = await fetch("/api/shop-n-ship/create", {
        method: "POST",
        body: orderFormData,
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderResult.error || "Failed to create order");
      }

      if (selectedAddressId) {
        toast.success("Order created successfully!", { id: toastId });
        router.push("/dashboard/shop-n-ship");
        return;
      }

      const addressResponse = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data.address,
          orderId: orderResult.orderId,
        }),
      });

      const addressResult = await addressResponse.json();

      if (!addressResponse.ok) {
        throw new Error(addressResult.error || "Failed to save address");
      }

      toast.success("Order and address created successfully!", { id: toastId });
      router.push("/dashboard/shop-n-ship");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create order";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={formMethods.handleSubmit(onSubmit, (errors) => {
        const messages = extractErrors(errors);
        messages.forEach((msg) => toast.error(msg));
      })}
    >
      {/* Step Indicator */}
      <div className="grid grid-cols-[1.5fr_.5fr] gap-4 relative mb-3 h-10">
        <div className="relative flex justify-between items-center">
          <div className="h-[2px] absolute top-1/2 -translate-y-1/2 left-0 bg-slate-300 w-full" />
          {STEPS.map((label, idx) => (
            <div
              key={idx}
              className="bg-slate-50 relative flex justify-center flex-col px-4 items-center z-10"
            >
              <CircleCheck
                className={
                  idx <= currentStep
                    ? "text-slate-50 fill-green-500"
                    : "text-slate-50 fill-slate-400"
                }
              />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[1.5fr_.5fr] gap-4">
        {/* ── Step 0: Add Items ── */}
        {currentStep === 0 && (
          <div>
            {items.map((field, idx) => (
              <div key={field.id} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500">
                    Item {idx + 1}
                  </span>
                  {idx > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(field.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
                <FormContent index={idx} formMethods={formMethods} />
                <div className="grid mt-4 grid-cols-2 gap-5">
                  <div>
                    <Label className="text-md">Remarks</Label>
                    <textarea
                      {...formMethods.register(`items.${idx}.remarks`)}
                      className="border block w-full resize-none bg-white border-slate-300 h-36 rounded-lg p-4 text-sm"
                      rows={4}
                      placeholder="Add any additional remarks or instructions..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Step 1: Priority ── */}
        {currentStep === 1 && (
          <div className="bg-white p-6 border border-slate-200 rounded-lg space-y-8">
            <div>
              <Label className="text-xl font-semibold font-reddit">
                Shipping Options
              </Label>
              <p className="text-sm text-slate-500 mt-1">
                Choose your preferred shipping options
              </p>
            </div>

            {/* Order Type */}
            <div>
              <Label className="text-md flex items-center gap-2 mb-3">
                Order Type
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {ORDER_TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setOrderType(option.key)}
                    className={`relative border-2 rounded-xl p-5 text-left transition-all cursor-pointer ${
                      orderType === option.key
                        ? "border-green-500 bg-green-50 shadow-sm"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {orderType === option.key && (
                      <CircleCheck className="absolute top-3 right-3 w-5 h-5 text-green-500 fill-green-500" />
                    )}
                    <span className="text-2xl mb-2 block">{option.icon}</span>
                    <p className="font-semibold text-slate-800">
                      {option.label}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Insurance */}
            <div>
              <Label className="text-md flex items-center gap-2 mb-3">
                Courier Type
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {courier_type.map((option) => (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => setCourierType(option.value)}
                    className={`relative border-2 rounded-xl p-5 text-left transition-all cursor-pointer ${
                      courierType === option.value
                        ? "border-green-500 bg-green-50 shadow-sm"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {courierType === option.value && (
                      <CircleCheck className="absolute top-3 right-3 w-5 h-5 text-green-500 fill-green-500" />
                    )}
                    <span className="text-2xl mb-2 block">{option.icon}</span>
                    <p className="font-semibold text-slate-800">
                      {option.label}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Add Address ── */}
        {currentStep === 2 && (
          <div>
            {savedAddress && savedAddress.length > 0 && !showAddressForm && (
              <div className="bg-white p-4 border border-slate-200 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-xl font-semibold font-reddit">
                    Your saved addresses
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddNewAddress}
                    className="text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {savedAddress.map((address: any) => (
                    <div
                      key={address.id}
                      onClick={() => handleSelectAddress(address.id, address)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? "border-green-500 bg-green-50 shadow-md"
                          : "border-slate-200 bg-slate-50 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="text-lg font-semibold">
                          {address.firstName} {address.lastName}
                        </h2>
                        {selectedAddressId === address.id && (
                          <CircleCheck className="w-5 h-5 text-green-500 fill-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600">
                        {address.streetAddress}
                        {address.aptSuitBldgGateCode && (
                          <span className="block">
                            {address.aptSuitBldgGateCode}
                          </span>
                        )}
                        <span className="block">
                          {address.city}, {address.state}, {address.zipcode}
                        </span>
                        <span className="block">{address.country}</span>
                        {address.phone && (
                          <span className="block mt-1">{address.phone}</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(showAddressForm ||
              !savedAddress ||
              savedAddress.length === 0) && (
              <div>
                {savedAddress && savedAddress.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowAddressForm(false)}
                    className="mb-4"
                  >
                    ← Back to saved addresses
                  </Button>
                )}
                <AddressForm formMethods={formMethods} />
              </div>
            )}
          </div>
        )}

        <OrderSummary
          isSubmitting={isSubmitting}
          handleContinue={handleContinue}
          handleBack={handleBack}
          currentStep={currentStep}
        />
      </div>

      {/* Add Item Button — only on step 0 */}
      {currentStep === 0 && (
        <div className="grid grid-cols-[1.5fr_.5fr] gap-4">
          <Button
            onClick={handleAddItem}
            type="button"
            variant="outline"
            className="shadow-none cursor-pointer w-full text-yellow-500 hover:bg-primary h-11"
          >
            <Plus /> Add another item
          </Button>
        </div>
      )}
    </form>
  );
};

export default CreateNewOrder;
