"use client";
import { useState } from "react";
import { Edit2 } from "lucide-react";

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import EditForm from "./edit-form";
import axios from "axios";
import { toast } from "sonner";

type OrderItem = {
  id: string;
  createdAt?: string;
  storeOrderId: string;
  storeName: string;
  itemName: string;
  itemQuantity: number;
  itemColor: string;
  status: string;
  [key: string]: any;
};

type Props = {
  items: OrderItem[];
  page: number;
  total: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
};

const OrderDetails = ({
  items,
  page,
  total,
  pageSize,
  totalPages,
  onPageChange,
  loading,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpen = (item: OrderItem) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleUpdate = async (payload: any) => {
    if (!selectedItem) return;

    setSaving(true);
    try {
      const formData = new FormData();

      Object.keys(payload).forEach((key) => {
        if (key !== "existingImages" && key !== "newImages") {
          formData.append(key, payload[key]);
        }
      });

      const imagesToKeep = payload.existingImages || selectedItem.images || [];
      formData.append("existingImages", JSON.stringify(imagesToKeep));

      if (payload.newImages && payload.newImages.length > 0) {
        payload.newImages.forEach((file: File) => {
          formData.append("images", file);
        });
      }

      await axios.put(`/api/shop-n-ship/${selectedItem.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Item updated successfully");
      handleClose();
      onPageChange(page);
    } catch (error) {
      console.error("Failed to update item:", error);
      toast.error("Failed to update item. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  console.log(items);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Your Items</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Souqza Order-ID</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              items.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {order.createdAt &&
                      new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.storeOrderId}
                  </TableCell>
                  <TableCell>{order.storeName}</TableCell>
                  <TableCell>{order.itemName}</TableCell>
                  <TableCell>
                    {order.purchaseDate && formatDate(order.purchaseDate)}
                  </TableCell>
                  <TableCell>{order.itemQuantity}</TableCell>
                  <TableCell>{order.itemColor}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpen(order)}
                      className="hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Make changes to your item here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <EditForm item={selectedItem} onUpdate={handleUpdate} />
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleClose} disabled={saving}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => {}} disabled={saving} form="edit-form">
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(Math.max(page - 1, 1))}
                  className={
                    page === 1 || loading
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (page <= 4) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = page - 3 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={page === pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                  className={
                    page === totalPages || loading
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
