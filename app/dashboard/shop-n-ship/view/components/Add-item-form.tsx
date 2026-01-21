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

const addFormSchema = z.object({
  purchaseDate: z
    .date()
    .optional()
    .refine((date) => date instanceof Date, {
      message: "Purchase date is required",
    }),
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
  storeOrderId: z
    .string()
    .min(3, "Order ID is required")
    .max(25, "Order ID is too long"),
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
      purchaseDate: undefined,
      itemName: "",
      itemQuantity: "",
      itemColor: "",
      storeName: "",
      itemPrice: "",
      itemSize: "",
      itemWeight: "",
      storeOrderId: "",
    },
  });

  const { orderId } = useParams();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const purchaseDate = useWatch({
    control,
    name: "purchaseDate",
  });

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
    setPreviewUrls((prev) => {
      const newPreviews = prev.filter((_, idx) => idx !== index);
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newUrls = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
    { key: "storeOrderId", label: "Store Order ID", placeholder: "Order ID" },
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
    if (images.length < 2) {
      toast.error("Please add at least two images");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all text fields
      formData.append("purchaseDate", data.purchaseDate!.toISOString());
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

      formData.append("storeOrderId", data.storeOrderId);

      // Append all image files
      images.forEach((file: File) => {
        formData.append("images", file);
      });

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
        onSuccess?.();
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
        <div>
          <Label className="text-slate-600">
            Purchase Date <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="purchaseDate"
            control={control}
            render={({ field }) => (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full shadow-none justify-between"
                  >
                    {purchaseDate
                      ? new Date(purchaseDate).toLocaleDateString("en-In")
                      : "Select date"}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-60" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={purchaseDate}
                    onSelect={(date) => {
                      setValue("purchaseDate", date);
                      setOpen(false);
                    }}
                    disabled={(date) => date > new Date()}
                    captionLayout="dropdown"
                    className="rounded-md border w-full"
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

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
                "storeOrderId",
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

      {/* Images Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>
            Product Images ({images.length})
            <span className="text-red-500"> * (minimum 2)</span>
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Add Images
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleAddImages}
          />
        </div>

        {images.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              No images yet. Click "Add Images" to upload at least 2 images.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {images.map((_, idx) => (
              <div key={`new-${idx}`} className="relative group">
                <div className="relative aspect-square rounded-md overflow-hidden border border-green-400">
                  <Image
                    src={previewUrls[idx]}
                    fill
                    alt={`New ${idx + 1}`}
                    className="object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                    New
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                  aria-label="Delete image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
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
