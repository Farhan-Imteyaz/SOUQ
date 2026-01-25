"use client";
import { IndianRupee } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useOrderContext } from "../context/order-context";
const OrderSummary = ({
  currentStep,
  handleContinue,
  handleBack,
  isSubmitting,
}: {
  currentStep: number;
  handleContinue: () => void;
  handleBack: () => void;
  isSubmitting?: boolean;
}) => {
  const { items, isCompressing } = useOrderContext();

  return (
    <div className="bg-white sticky top-4 left-0 h-fit p-4 rounded-xl border border-slate-200">
      <h3 className="font-medium text-xl">Order Summary</h3>
      <div className="space-y-1 mt-3">
        {items.map((item, idx) => (
          <div key={idx} className=" flex items-center justify-between">
            <p className="text-slate-700 text-sm">Item ({idx + 1})</p>
            <p className="text-lg flex items-center gap-1 font-reddit font-semibold">
              <span className=" ">
                <IndianRupee className="size-4" />
              </span>
              {item.itemPrice}
            </p>
          </div>
        ))}
      </div>
      <div className=" mt-2 mb-3 flex items-center justify-between">
        <p className="text-slate-700 text-sm">Subtotal</p>
        <p className="text-lg font-reddit font-semibold flex items-center gap-1">
          <span className=" ">
            <IndianRupee className="size-4" />
          </span>
          {items.reduce((sum, item) => sum + item.itemPrice, 0)}
        </p>
      </div>
      <Separator />
      <div className="my-3 flex items-center justify-between ">
        <Label className="text-lg font-semibold">Grand Total</Label>
        <p className="text-2xl font-reddit font-semibold flex items-center gap-1">
          <span className=" ">
            <IndianRupee className="size-6" />
          </span>
          {items.reduce((sum, item) => sum + item.itemPrice, 0)}
        </p>
      </div>
      {currentStep === 0 ? (
        <Button
          disabled={isCompressing}
          type="button"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleContinue();
          }}
        >
          Continue
        </Button>
      ) : (
        <Button
          disabled={currentStep === 0 || isCompressing || isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
      )}
      {currentStep === 1 ? (
        <Button
          onClick={handleBack}
          disabled={isCompressing || isSubmitting}
          type={"button"}
          className="w-full bg-black text-white hover:bg-black/90 mt-2"
        >
          Back
        </Button>
      ) : null}

      <Link href={"/dashboard/shop-n-ship"}>
        <Button
          disabled={isSubmitting}
          type="button"
          variant={"outline"}
          className="w-full mt-2 shadow-none"
        >
          Cancel
        </Button>
      </Link>
    </div>
  );
};

export default OrderSummary;
