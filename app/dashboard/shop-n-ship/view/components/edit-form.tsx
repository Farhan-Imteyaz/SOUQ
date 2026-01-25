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
import { compressImages } from "@/lib/image-compressor";
const editFormSchema = z.object({
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

type FormData = z.infer<typeof editFormSchema>;
const MAX_IMAGES = 6;
const MAX_SIZE_MB = 8;
type ImageType = {
  id?: string;
  imageUrl: string;
};

type EditFormProps = {
  item: any;
  onUpdate?: (updatedItem: any) => void;
};

const EditForm = ({ item, onUpdate }: EditFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      purchaseDate: item.purchaseDate ? new Date(item.purchaseDate) : undefined,
      itemName: item.itemName || "",
      itemQuantity: item.itemQuantity?.toString() || "",
      itemColor: item.itemColor || "",
      storeName: item.storeName || "",
      itemPrice: item.itemPrice?.toString() || "",
      itemSize: item.itemSize || "",
      itemWeight: item.itemWeight || "",
      storeOrderId: item.storeOrderId || "",
    },
  });

  const [existingImages, setExistingImages] = useState<ImageType[]>(
    item.images || [],
  );
  const [open, setOpen] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
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

  const handleDeleteExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDeleteNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== index));
    setPreviewUrls((prev) => {
      const newPreviews = prev.filter((_, idx) => idx !== index);
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const toastId = toast.loading("Compressing images...");

    try {
      const selectedFiles = e.target.files;
      if (!selectedFiles) {
        toast.dismiss(toastId);
        return;
      }

      const files = Array.from(selectedFiles);

      // ❌ Size validation
      const oversizedFiles = files.filter(
        (file) => file.size > MAX_SIZE_MB * 1024 * 1024,
      );

      if (oversizedFiles.length) {
        toast.error(`Each image must be under ${MAX_SIZE_MB}MB`, {
          id: toastId,
        });
        return;
      }

      // ❌ Count validation
      if (newImages.length + files.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed`, {
          id: toastId,
        });
        return;
      }

      // ✅ Compress
      const result = await compressImages(files, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        quality: 0.8,
      });

      if (!("files" in result)) {
        toast.error("Image compression failed", { id: toastId });
        return;
      }

      const compressedFiles = result.files;

      const previewUrls = compressedFiles.map((file) =>
        URL.createObjectURL(file),
      );

      setNewImages((prev) => [...prev, ...compressedFiles]);
      setPreviewUrls((prev) => [...prev, ...previewUrls]);

      // ⚠️ Partial failure info
      if (result.failed.length) {
        toast.warning(
          `${result.failed.length} image(s) could not be compressed`,
          { id: toastId },
        );
        return;
      }

      toast.success(`${compressedFiles.length} image(s) added successfully`, {
        id: toastId,
      });

      e.target.value = "";
    } catch (error) {
      console.error(error);
      toast.error("Failed to process images", { id: toastId });
    }
  };

  const onSubmit = (data: FormData) => {
    const totalImages = existingImages.length + newImages.length;
    const payload = {
      ...data,
      existingImages,
      newImages,
      purchaseDate: data.purchaseDate?.toISOString(),
    };

    if (totalImages < 2) {
      toast.error("Please add atleast two image");
      return;
    }

    onUpdate?.(payload);
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

  return (
    <form
      id="edit-form"
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-6"
    >
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
            Product Images ({existingImages.length + newImages.length})
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

        {existingImages.length === 0 && newImages.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              No images yet. Click "Add Images" to upload.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {existingImages.map((img, idx) => (
              <div key={`existing-${idx}`} className="relative group">
                <div className="relative aspect-square rounded-md overflow-hidden border border-slate-300">
                  <Image
                    src={img.imageUrl}
                    fill
                    alt={`Product ${idx + 1}`}
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteExistingImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                  aria-label="Delete image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {newImages.map((_, idx) => (
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
                  onClick={() => handleDeleteNewImage(idx)}
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
    </form>
  );
};

export default EditForm;
