import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useForm, Controller, FieldErrors, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import axios from "axios";
import { useParams } from "next/navigation";
import { compressImages } from "@/lib/image-compressor";
const addFormSchema = z.object({
  itemName: z
    .string()
    .min(1, "Item name is required")
    .max(30, "Item name is too long"),
  itemQuantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Quantity must be a positive number",
    }),
  itemColor: z
    .string()
    .min(1, "Color is required")
    .max(10, "Color name is too long"),
  storeName: z
    .string()
    .min(1, "Store name is required")
    .max(12, "Store name is too long"),
  itemPrice: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  itemSize: z.string().max(30, "Size is too long").optional(),
  itemWeight: z.string().max(5, "Weight not supported").optional(),
});

type FormData = z.infer<typeof addFormSchema>;

type AddFormProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

const AddItemForm = ({ onCancel, onSuccess }: AddFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      itemName: "",
      itemQuantity: "",
      itemColor: "",
      storeName: "",
      itemPrice: "",
      itemSize: "",
      itemWeight: "",
    },
  });

  const { orderId } = useParams();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const formFields: Array<{
    key: keyof Omit<FormData, "purchaseDate">;
    label: string;
    placeholder: string;
    type?: string;
  }> = [
    { key: "itemName", label: "Item Name", placeholder: "Item Name" },
    {
      key: "itemQuantity",
      label: "Quantity",
      placeholder: "Quantity",
      type: "number",
    },
    { key: "itemColor", label: "Color", placeholder: "Color" },
    { key: "storeName", label: "Store Name", placeholder: "Store Name" },
    {
      key: "itemPrice",
      label: "Item Price",
      placeholder: "Item Price",
      type: "number",
    },
    {
      key: "itemSize",
      label: "Item Size",
      placeholder: "Item Size",
      type: "number",
    },
    { key: "itemWeight", label: "Item Weight", placeholder: "Item Weight" },
  ];

  const onError = (errors: FieldErrors<FormData>) => {
    const traverse = (errObj: any) => {
      Object.values(errObj).forEach((err: any) => {
        if (!err) return;

        if (err.message) {
          toast.error(err.message);
        } else if (typeof err === "object") {
          traverse(err);
        }
      });
    };

    traverse(errors);
  };

  const onSubmit = async (data: FormData) => {
    // Validate images before submission

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("itemName", data.itemName);
      formData.append("itemQuantity", data.itemQuantity);
      formData.append("itemColor", data.itemColor);
      formData.append("storeName", data.storeName);
      formData.append("itemPrice", data.itemPrice);

      if (data.itemSize) {
        formData.append("itemSize", data.itemSize);
      }
      if (data.itemWeight) {
        formData.append("itemWeight", data.itemWeight);
      }

      // Make the API call
      const response = await axios.post(
        `/api/shop-n-ship/${orderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        toast.success("Item added successfully!");

        // Reset form
        reset();
        setImages([]);
        setPreviewUrls([]);

        // Call success callback
        onCancel?.();
      } else {
        toast.error(response.data.message || "Failed to add item");
      }
    } catch (error: any) {
      console.error("Error adding item:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while adding the item",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {formFields.map(({ key, label, placeholder, type = "text" }) => (
          <div key={key}>
            <Label htmlFor={key}>
              {label}
              {[
                "itemName",
                "itemQuantity",
                "itemColor",
                "storeName",
                "itemPrice",
              ].includes(key) && <span className="text-red-500"> *</span>}
            </Label>
            <Input
              id={key}
              type={type}
              {...register(key)}
              placeholder={placeholder}
              className={
                errors[key]
                  ? "border-red-500 bg-red-50 text-red-500 placeholder:text-red-500"
                  : ""
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="button"
          onClick={handleSubmit(onSubmit, onError)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Item"}
        </Button>
      </div>
    </div>
  );
};

export default AddItemForm;
