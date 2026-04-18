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
      itemName: item.itemName || "",
      itemQuantity: item.itemQuantity?.toString() || "",
      itemColor: item.itemColor || "",
      storeName: item.storeName || "",
      itemPrice: item.itemPrice?.toString() || "",
      itemSize: item.itemSize || "",
      itemWeight: item.itemWeight || "",
    },
  });

  const [existingImages, setExistingImages] = useState<ImageType[]>(
    item.images || [],
  );
  const [open, setOpen] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    };

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
      </div>
    </form>
  );
};

export default EditForm;
