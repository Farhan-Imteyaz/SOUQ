import React from "react";
import { Package } from "lucide-react";
const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <Package className="h-6 w-6 sm:h-8 sm:w-8" />
      <span className="text-lg sm:text-xl font-bold">ParcelForward</span>
    </div>
  );
};

export default Logo;
