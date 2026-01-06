"use client";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
const RestrictionCTA = () => {
  return (
    <div className="mt-12">
      <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-7">
        <div className="relative z-10 flex flex-col items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold font-reddit mb-2">
              Prohibited Items
            </h2>
            <p className="text-gray-700 leading-relaxed font-reddit">
              Some items cannot be shipped internationally due to shipping and
              customs regulations. Please check our restricted items list before
              ordering to avoid delays or returns.
            </p>
          </div>

          {/* CTA */}
          <Button className="flex-shrink-0 bg-red-600 text-white px-6 py-3 hover:bg-red-700 shadow-lg whitespace-nowrap">
            View Restrictions
          </Button>
        </div>

        {/* Decorative background */}
        <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-red-100/50" />
        <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-orange-100/50" />
      </div>
    </div>
  );
};

export default RestrictionCTA;
