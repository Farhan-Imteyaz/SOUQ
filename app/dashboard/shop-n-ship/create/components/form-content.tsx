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
import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";
import { OrderItemFormData } from "@/types/order-types";
interface FormContentProps {
  index: number;
  formMethods: UseFormReturn<OrderItemFormData>;
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

  return (
    <div className="bg-white p-4 border border-slate-200 rounded-lg">
      <Label className="text-xl font-semibold font-reddit">
        Item {index + 1}
      </Label>
      <div className="mt-4">
        <div className="pb-6">
          <Label className="text-md">Basic Information</Label>
          <div className="grid grid-cols-1 px-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3 mt-2 ">
            <div>
              <Label className="text-slate-600">
                Purchase Date <span className="text-red-500">*</span>
              </Label>

              <Controller
                control={formMethods.control}
                name={`items.${index}.purchaseDate`}
                render={({ field }) => (
                  <div className="w-full">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className={cn(
                            `w-full justify-between font-normal`,
                            errors.items?.[index]?.purchaseDate &&
                              "border-red-500",
                          )}
                        >
                          {watch(`items.${index}.purchaseDate`)
                            ? format(
                                new Date(watch(`items.${index}.purchaseDate`)),
                                "dd MMM yyyy",
                              )
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="relative overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          disabled={(date) => date > new Date()}
                          selected={watch(`items.${index}.purchaseDate`)}
                          captionLayout="dropdown"
                          className="w-auto rounded-lg border-none"
                          onSelect={(date) => {
                            if (date) {
                              setValue(`items.${index}.purchaseDate`, date);
                            }
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Item Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watch(`items.${index}.itemType`)}
                onValueChange={(value) =>
                  setValue(`items.${index}.itemType`, value, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger
                  className={cn(
                    `bg-white`,
                    errors.items?.[index]?.itemType &&
                      "border-red-500 bg-red-100 text-red-500! ",
                  )}
                >
                  <SelectValue placeholder="Select Item type" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {Object.entries(itemTypes).map(([category, items]) => (
                    <SelectGroup key={category}>
                      <SelectLabel className="text-slate-500!">
                        {category.replace(/_/g, " ").toUpperCase()}
                      </SelectLabel>

                      {items.map((item) => (
                        <SelectItem
                          className="pl-3!"
                          key={item.key}
                          value={item.key}
                        >
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-600">
                Item Name <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.itemName`)}
                placeholder="Enter item name"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemName &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Online Store <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.storeName`)}
                placeholder="Enter online store name"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.storeName &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Order ID/ Reference number{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.storeOrderId`)}
                placeholder="Enter order ID"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.storeOrderId &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
              />
            </div>
            <div>
              <Label className="text-slate-600">
                Color <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.itemColor`)}
                placeholder="Enter Color"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemColor &&
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
                })}
                placeholder="Enter quantity"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemQuantity &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 ",
                )}
                type="number"
              />
            </div>
            <div className=" ">
              <Label className="text-slate-600">
                Price (INR) <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register(`items.${index}.itemPrice`, {
                  valueAsNumber: true,
                })}
                placeholder="Enter price"
                className={cn(
                  `bg-white`,
                  errors.items?.[index]?.itemPrice &&
                    "border-red-500 bg-red-100  placeholder:text-red-500 text-red-500 ",
                )}
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContent;
