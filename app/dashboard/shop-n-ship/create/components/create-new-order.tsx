"use client";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImgUpload from "./img-upload";
import { Plus } from "lucide-react";
import OrderSummary from "./order-summary";
import FormContent from "./form-content";
import { useOrderContext } from "../context/order-context";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderItemSchema, OrderItemFormData } from "@/types/order-types";
import { prepareOrderFormData } from "../context/order-context";
import { FieldErrors, FieldError } from "react-hook-form";
const CreateNewOrder = () => {
  const { items, addItem, updateItem } = useOrderContext();

  const isInitialMount = useRef(true);
  const isUpdatingFromContext = useRef(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formMethods = useForm<OrderItemFormData>({
    resolver: zodResolver(orderItemSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      items: items.map((item) => ({
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
      })),
    },
  });

  useEffect(() => {
    const subscription = formMethods.watch((formData) => {
      if (isUpdatingFromContext.current) return;

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(() => {
        if (formData.items) {
          formData.items.forEach((formItem, index) => {
            const contextItem = items[index];
            if (contextItem && formItem) {
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
            }
          });
        }
      }, 500);
    });

    return () => {
      subscription.unsubscribe();
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [items, updateItem]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentFormItems = formMethods.getValues("items");
    if (currentFormItems.length !== items.length) {
      isUpdatingFromContext.current = true;

      formMethods.reset(
        {
          items: items.map((item) => ({
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
          })),
        },
        { keepErrors: false, keepDirty: false },
      );

      setTimeout(() => {
        isUpdatingFromContext.current = false;
      }, 100);
    }
  }, [items.length, formMethods]);

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

  const extractErrors = (errors: FieldErrors<OrderItemFormData>): string[] => {
    const messages: string[] = [];

    if (errors?.items && Array.isArray(errors.items)) {
      errors.items.forEach((itemError, index: number) => {
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

    return messages;
  };

  const handleAddItem = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const isValid = await formMethods.trigger();

      if (!isValid) {
        const errors = formMethods.formState.errors;
        const errorMessages: string[] = [];

        if (errors?.items && Array.isArray(errors.items)) {
          errors.items.forEach((itemError, index: number) => {
            if (!itemError || typeof itemError !== "object") return;

            Object.entries(itemError).forEach(([field, fieldError]) => {
              if (
                fieldError &&
                typeof fieldError === "object" &&
                "message" in fieldError
              ) {
                const error = fieldError as FieldError;
                if (error.message) {
                  errorMessages.push(
                    `Item ${index + 1} - ${field}: ${error.message}`,
                  );
                }
              }
            });
          });
        }

        const uniqueErrors = [...new Set(errorMessages)];
        uniqueErrors.forEach((msg) => {
          toast.error(msg);
        });

        return;
      }

      addItem(e);
      toast.success("Item added successfully!");
    },
    [addItem, formMethods],
  );

  const onSubmit = async (data: OrderItemFormData) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    const toastId = toast.loading("Creating order...");

    try {
      const formData = prepareOrderFormData(items);

      const response = await fetch("/api/shop-n-ship/create", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      toast.success("Order created successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <form
      onSubmit={formMethods.handleSubmit(onSubmit, (errors) => {
        const messages = extractErrors(errors);

        messages.forEach((msg) => {
          toast.error(msg);
        });
      })}
      className="grid grid-cols-[1.5fr_.5fr] gap-4"
    >
      <div className=" ">
        <div className="relative mb-4">
          <div className="px-4 relative">
            <div className="absolute w-4 h-4 bg-blue-400" />
            <div className="h-[2px] bg-red-400 w-full" />
            <div className="absolute w-4 h-4 bg-blue-400" />
          </div>
        </div>

        {items.map((field, idx) => (
          <div key={field.id} className="mb-4">
            <FormContent index={idx} formMethods={formMethods} />
            <div className="grid mt-4 grid-cols-2 gap-5">
              <div>
                <Label className="text-md">Attach Product Images</Label>

                <ImgUpload
                  itemId={items[idx].id}
                  errors={
                    formMethods.formState.errors?.items?.[idx]?.images?.message
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
      <OrderSummary />
      <Button
        onClick={handleAddItem}
        type="button"
        variant={"outline"}
        className="shadow-none cursor-pointer w-full text-yellow-500 hover:bg-primary h-11"
      >
        <Plus /> Add another item
      </Button>
    </form>
  );
};

export default CreateNewOrder;
