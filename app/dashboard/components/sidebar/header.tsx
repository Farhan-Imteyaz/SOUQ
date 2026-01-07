"use client";
import Link from "next/link";
import UserProfileBtn from "@/app/components/user-profile-btn";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { DollarSign } from "lucide-react";
const Header = () => {
  return (
    <div className="bg-slate-100 border-b py-3 flex justify-between items-center px-6">
      <RainbowButton variant="default" className="text-slate-50 ">
        <Link href={"/dashboard"} className="flex items-center gap-1">
          <span className="mt-px">
            <DollarSign />
          </span>
          Shipping Cost Estimator
        </Link>
      </RainbowButton>

      <UserProfileBtn isDark={true} scrolled={false} />
    </div>
  );
};

export default Header;
