import { Package } from "lucide-react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Package className="h-6 w-6 sm:h-8 sm:w-8" />
      <span className="text-lg sm:text-xl font-bold">ParcelForward</span>
    </div>
  );
};

export default Logo;
