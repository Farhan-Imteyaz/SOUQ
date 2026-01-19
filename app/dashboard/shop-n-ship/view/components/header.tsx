import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
const Header = () => {
  return (
    <div className="flex mb-12 justify-between items-center">
      <div className="">
        <h1 className="text-2xl tracking-tight font-semibold font-reddit">
          Order Details
        </h1>
        <p className="text-gray-600">Manage your package forwarding orders</p>
      </div>
      <Link href="/dashboard/shop-n-ship/create-order">
        <Button className="cursor-pointer">
          <Plus className="h-10 w-10 " />
          Add Item
        </Button>
      </Link>
    </div>
  );
};

export default Header;
