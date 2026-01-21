"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImgUpload from "./img-upload";
import AddressForm from "./address-form";
import { CircleCheck, Plus } from "lucide-react";
import OrderSummary from "./order-summary";
import FormContent from "./form-content";
import { useOrderContext } from "../context/order-context";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  completeOrderSchema,
  CompleteOrderFormData,
  AddressFormData,
} from "@/types/order-types";
import { prepareOrderFormData } from "../context/order-context";
import { FieldErrors, FieldError } from "react-hook-form";

const STEPS = ["Add item", "Add address"] as const;
const DEBOUNCE_DELAY = 500;
const CONTEXT_UPDATE_DELAY = 100;

const CreateNewOrder = () => {
  const { items, addItem, updateItem } = useOrderContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [savedAddress, setSavedAddress] = useState<any>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const isInitialMount = useRef(true);
  const isUpdatingFromContext = useRef(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mapItemsToFormData = (items: any[]) =>
    items.map((item) => ({
      itemType: item.itemType,
      itemName: item.itemName,
      storeName: item.storeName,
      storeOrderId: item.storeOrderId,
      itemColor: item.itemColor,
      itemSize: item.itemSize,
      itemQuantity: item.itemQuantity,
      itemPrice: item.itemPrice,
      remarks: item.remarks,
      purchaseDate: item.purchaseDate || new Date(),
      itemWeight: item.itemWeight,
      images: item.images || [],
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

    // Extract item errors
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
            if (error.message) {
              messages.push(`Item ${index + 1}: ${error.message}`);
            }
          }
        });
      });
    }

    // Extract address errors
    if (errors?.address) {
      Object.entries(errors.address).forEach(([field, fieldError]) => {
        if (
          fieldError &&
          typeof fieldError === "object" &&
          "message" in fieldError
        ) {
          const error = fieldError as FieldError;
          if (error.message) {
            messages.push(`Address: ${error.message}`);
          }
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
            storeOrderId: formItem.storeOrderId || "",
            itemColor: formItem.itemColor || "",
            itemSize: formItem.itemSize || "",
            itemQuantity: formItem.itemQuantity || 1,
            itemPrice: formItem.itemPrice || 0,
            remarks: formItem.remarks || "",
            purchaseDate: formItem.purchaseDate || new Date(),
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
    items.forEach((item, index) => {
      const currentImages = formMethods.getValues(`items.${index}.images`);
      if (JSON.stringify(currentImages) !== JSON.stringify(item.images)) {
        formMethods.setValue(`items.${index}.images`, item.images, {
          shouldValidate: item.images.length > 0,
        });
      }
    });
  }, [items, formMethods]);

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

  const handleContinue = async () => {
    const isValid = await formMethods.trigger("items");
    if (!isValid) {
      const messages = extractErrors(formMethods.formState.errors);
      messages.forEach((msg) => toast.error(msg));
      return;
    }

    setCurrentStep(1);
  };

  const handleBack = () => setCurrentStep(0);

  const handleSelectAddress = (addressId: string, address: any) => {
    setSelectedAddressId(addressId);
    // Populate form with selected address
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
    // Clear form
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
    clearUpdateTimeout();
    await new Promise((resolve) => setTimeout(resolve, CONTEXT_UPDATE_DELAY));

    const toastId = toast.loading("Creating order...");

    try {
      // Prepare order items FormData
      const orderFormData = prepareOrderFormData(items);

      // Add addressId to FormData if a saved address is selected
      if (selectedAddressId) {
        orderFormData.append("addressId", selectedAddressId);
      }

      // Submit order items
      const orderResponse = await fetch("/api/shop-n-ship/create", {
        method: "POST",
        body: orderFormData,
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderResult.error || "Failed to create order");
      }

      // If using a saved address, we're done
      if (selectedAddressId) {
        toast.success("Order created successfully!", { id: toastId });
        // Reset form or redirect
        // formMethods.reset();
        // router.push("/dashboard/shop-n-ship");
        return;
      }

      // Submit address data only if it's a new address
      const addressResponse = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      // Reset form or redirect
      // formMethods.reset();
      // router.push("/dashboard/shop-n-ship");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create order";
      toast.error(errorMessage, { id: toastId });
    }
  };

  // ============================================
  // Render
  // ============================================

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
        {currentStep === 0 ? (
          <div>
            {items.map((field, idx) => (
              <div key={field.id} className="mb-4">
                <FormContent index={idx} formMethods={formMethods} />
                <div className="grid mt-4 grid-cols-2 gap-5">
                  <div>
                    <Label className="text-md">Attach Product Images</Label>
                    <ImgUpload
                      itemId={items[idx].id}
                      errors={
                        formMethods.formState.errors?.items?.[idx]?.images
                          ?.message
                      }
                    />
                  </div>
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
        ) : (
          <div>
            {/* Saved Addresses Section */}
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

            {/* Add New Address Form */}
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
          handleContinue={handleContinue}
          handleBack={handleBack}
          currentStep={currentStep}
        />
      </div>

      {/* Add Item Button */}
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
