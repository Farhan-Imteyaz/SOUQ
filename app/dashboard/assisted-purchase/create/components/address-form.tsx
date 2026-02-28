"use client";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { CompleteOrderFormData } from "@/types/order-types";
import { cn } from "@/lib/utils";

interface AddressFormProps {
  formMethods: UseFormReturn<CompleteOrderFormData>;
}

const AddressForm = ({ formMethods }: AddressFormProps) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <div className="bg-white p-4 border border-slate-200 rounded-lg">
      <Label className="text-xl font-semibold font-reddit">Add address</Label>

      <div className="grid grid-cols-3 gap-5 mt-4">
        <div>
          <Label>First Name</Label>
          <Input
            {...register("address.firstName")}
            placeholder="Enter first name"
            className={cn(
              "bg-white",
              errors.address?.firstName && "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.firstName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.firstName.message}
            </p>
          )}
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            {...register("address.lastName")}
            placeholder="Enter last name"
            className={cn(
              "bg-white",
              errors.address?.lastName && "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.lastName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.lastName.message}
            </p>
          )}
        </div>

        <div>
          <Label>
            Street Address <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("address.streetAddress")}
            placeholder="Enter street address"
            className={cn(
              "bg-white",
              errors.address?.streetAddress && "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.streetAddress && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.streetAddress.message}
            </p>
          )}
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            {...register("address.phone")}
            placeholder="Enter phone"
            className={cn(
              "bg-white",
              errors.address?.phone && "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.phone && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label>
            Apt, Suit, Bldg, Gate code <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("address.aptSuitBldgGateCode")}
            placeholder="Enter Apt, Suit, Bldg, Gate code"
            className={cn(
              "bg-white",
              errors.address?.aptSuitBldgGateCode &&
                "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.aptSuitBldgGateCode && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.aptSuitBldgGateCode.message}
            </p>
          )}
        </div>

        <div>
          <Label>
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("address.city")}
            placeholder="Enter City"
            className={cn(
              "bg-white",
              errors.address?.city && "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.city && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.city.message}
            </p>
          )}
        </div>

        <div>
          <Label>
            State <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("address.state")}
            placeholder="Enter state"
            className={cn(
              "bg-white",
              errors.address?.state && "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.state && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.state.message}
            </p>
          )}
        </div>

        <div>
          <Label>
            Country <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("address.country")}
            placeholder="Enter country"
            className={cn(
              "bg-white",
              errors.address?.country && "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.country && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.country.message}
            </p>
          )}
        </div>

        <div>
          <Label>
            Zipcode <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register("address.zipcode")}
            placeholder="Enter zipcode"
            className={cn(
              "bg-white",
              errors.address?.zipcode && "border-red-500 bg-red-100",
            )}
          />
          {errors.address?.zipcode && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.zipcode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
