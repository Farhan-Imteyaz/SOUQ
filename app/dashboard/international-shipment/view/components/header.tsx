"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddItemForm from "./Add-item-form";

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
      <Button
        type="button"
        className="cursor-pointer"
        onClick={() => setShowAddForm((prev) => !prev)}
      >
        <Plus className="h-5 w-5 mr-2" />
        {showAddForm ? "Close Form" : "Add Item"}
      </Button>

      {showAddForm && (
        <div className="fixed z-20 inset-0 w-full h-full bg-black/70 flex justify-center items-center">
          <div className="max-w-4xl mt-6 border rounded-xl p-6 bg-white shadow">
            <h2 className="text-xl font-semibold mb-4">Add Item</h2>

            <AddItemForm onCancel={() => setShowAddForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
