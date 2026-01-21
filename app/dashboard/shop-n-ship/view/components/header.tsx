"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddItemForm from "./Add-item-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const Header = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="flex mb-12 justify-between items-center">
      <div className="">
        <h1 className="text-2xl tracking-tight font-semibold font-reddit">
          Order Details
        </h1>
        <p className="text-gray-600">Manage your package forwarding orders</p>
      </div>
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogTrigger asChild>
          <Button type="button" className="cursor-pointer">
            <Plus className="h-10 w-10 " />
            Add Item
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add item</DialogTitle>
            <div className="mt-3">
              <AddItemForm onCancel={() => setShowAddForm(false)} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
