import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, FieldErrors, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
  referenceNumber: z.string().optional(),
});

type FormData = z.infer<typeof editFormSchema>;

type EditFormProps = {
  item: any;
  onUpdate?: (updatedItem: any) => void;
};

const EditForm = ({ item, onUpdate }: EditFormProps) => {
  const {
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
      referenceNumber: item.referenceNumber || "",
    },
  });

  const onSubmit = (data: FormData) => {
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
    {
      key: "referenceNumber",
      label: "Reference Number",
      placeholder: "Reference Number",
      type: "string",
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
                "referenceNumber",
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
    </form>
  );
};

export default EditForm;
