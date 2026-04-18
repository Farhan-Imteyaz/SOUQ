"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CompleteOrderFormData } from "@/types/order-types";
interface FormContentProps {
  index: number;
  formMethods: UseFormReturn<CompleteOrderFormData>;
}

const itemTypes = {
  home: [
    { key: "bedsheet", value: "Bedsheet" },
    { key: "curtains", value: "Curtains" },
    { key: "pillows", value: "Pillows" },
    { key: "blankets", value: "Blankets" },
  ],

  books_stationery: [
    { key: "books", value: "Books" },
    { key: "notebooks", value: "Notebooks" },
    { key: "magazines", value: "Magazines" },
  ],

  groceries: [
    { key: "cereals", value: "Cereals" },
    { key: "pulses", value: "Pulses" },
    { key: "snacks", value: "Snacks" },
  ],

  personal_care: [
    { key: "cosmetics", value: "Cosmetics" },
    { key: "skincare", value: "Skincare" },
    { key: "haircare", value: "Hair Care" },
  ],
};

const FormContent = ({ index, formMethods }: FormContentProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = formMethods;
  const [open, setOpen] = useState(false);

  const purchaseDate = watch(`items.${index}.purchaseDate`);

  return (
    <div className="bg-white p-4 border border-slate-200 rounded-lg">
      <Label className="text-xl font-semibold font-reddit">
        Item {index + 1}
      </Label>
      <div className="mt-4">
        <div className="pb-6">
          <Label className="text-md">Personal Information</Label>
          <div className="grid grid-cols-1 px-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3 mt-2 ">
            <div>
              <Label className="text-slate-600">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.fistName`)}
                placeholder="Enter first name"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.firstName &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.lastName`)}
                placeholder="Enter last name"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.lastName &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.email`)}
                placeholder="Enter email"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.email &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Phone
                <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.phone`)}
                placeholder="Enter phone"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.phone &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
          </div>
        </div>
        <Separator className="" />
        <div className="py-6">
          <Label className="text-md">Pickup Details</Label>
          <div className="grid grid-cols-1 px-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3 mt-2 ">
            <div>
              <Label className="text-slate-600">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.pFirstName`)}
                placeholder="Enter first name"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.pFirstName &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.pLastName`)}
                placeholder="Enter last name"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.pLastName &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.pEmail`)}
                placeholder="Enter email"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.pEmail &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Phone
                <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.pPhone`)}
                placeholder="Enter phone"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.pPhone &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Country
                <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.country`)}
                placeholder="Select Country"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.storeOrderId &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                City
                <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.city`)}
                placeholder="Enter City"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.city &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                State
                <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.state`)}
                placeholder="Enter State"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.state &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Street Address 1<span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.streetAddress`)}
                placeholder="Enter State"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.streetAddress &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">Street Address 2</Label>
              <Input
                {...register(`items.${index}.streetAddress2`)}
                placeholder="Enter State"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.streetAddress2 &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Pin code <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.pin`)}
                placeholder="Enter State"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.pin &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Upload Document 1 <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.doc1`)}
                placeholder=""
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.doc1 &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Upload Document 2 <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.doc2`)}
                placeholder=""
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.doc2 &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
          </div>
        </div>
        <Separator className="" />
        <div className="pt-6">
          <Label className="text-md">Item Details</Label>
          <div className="mt-2 grid px-3 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3">
            <div>
              <Label className="text-slate-600">Item Name</Label>
              <Input
                {...register(`items.${index}.itemName`)}
                placeholder="Enter Item weight"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemName &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">Item Type</Label>
              <Input
                {...register(`items.${index}.itemType`)}
                placeholder="Enter Item Type"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemType &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
                type="number"
              />
            </div>
            <div>
              <Label className="text-slate-600">itemWeight (gms)</Label>
              <Input
                {...register(`items.${index}.itemWeight`)}
                placeholder="Enter Item weight"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemWeight &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
                type="number"
              />
            </div>
            <div>
              <Label className="text-slate-600">Size</Label>
              <Input
                {...register(`items.${index}.itemSize`)}
                placeholder="Enter size"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemSize &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">Quantity</Label>
              <Input
                {...register(`items.${index}.itemQuantity`, {
                  valueAsNumber: true,
                  setValueAs: (v) =>
                    v === "" || isNaN(Number(v)) ? 1 : Number(v),
                })}
                placeholder="Enter quantity"
                defaultValue={1}
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemQuantity &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
                type="number"
                min={1}
              />
            </div>
            <div className=" ">
              <Label className="text-slate-600">
                Price (INR) <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.itemPrice`, {
                  setValueAs: (v) =>
                    v === "" || isNaN(Number(v)) ? 0 : Number(v),
                })}
                placeholder="Enter price"
                value={watch(`items.${index}.itemPrice`) ?? ""}
                onChange={(e) =>
                  setValue(
                    `items.${index}.itemPrice`,
                    e.target.value === "" ? 0 : Number(e.target.value),
                    { shouldValidate: true },
                  )
                }
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemPrice &&
                    "border-red-500 bg-red-100 placeholder:text-red-500 text-red-500",
                )}
                type="number"
                min={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContent;
