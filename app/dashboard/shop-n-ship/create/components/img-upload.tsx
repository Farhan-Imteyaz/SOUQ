"use client";
import { useState } from "react";
import { useOrderContext } from "../context/order-context";
import Image from "next/image";
import { useMemo } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ImageDialog from "./img-dialog";
import { cn } from "@/lib/utils";
type ImgUploadProps = {
  itemId: string;
  errors: any;
};

const ImgUpload = ({ itemId, errors }: ImgUploadProps) => {
  const [open, setOpen] = useState(false);
  const { handleFileUpload, removeImageFromItem, items } = useOrderContext();

  const handleRemoveImage = (idx: number, e: React.FormEvent) => {
    e.stopPropagation();
    removeImageFromItem(itemId, idx);
  };

  const currentItem = items.find((item) => item.id === itemId);
  const files = currentItem?.images || [];

  const imageUrls = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  useMemo(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);
  return (
    <div>
      <div className="w-full ">
        <label
          htmlFor={itemId}
          className={cn(
            `flex cursor-pointer h-36 flex-col items-center justify-center  rounded-lg border border-dashed  p-8 text-center transition `,
            errors
              ? "border-red-500 bg-red-100 text-red-500"
              : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-100"
          )}
        >
          <p
            className={cn(
              `text-lg font-medium `,
              errors ? "text-red-500" : "text-slate-900"
            )}
          >
            Upload image
          </p>

          <p
            className={cn(
              `mt-1 text-xs `,
              errors ? "text-red-500" : "text-slate-500"
            )}
          >
            JPG, PNG, WEBP, AVIF, JPEG • Max 8MB
          </p>
        </label>

        <input
          onChange={(e) => handleFileUpload(itemId, e)}
          type="file"
          id={itemId}
          className="hidden"
          multiple
          accept="image/png,image/jpeg,image/webp,image/avif"
        />
      </div>
      <div className="overflow-hidden pr-2">
        {" "}
        <AnimatePresence mode="wait">
          <div className="w-full  grid grid-cols-2 lg:grid-cols-4 gap-4 rounded py-2 mt-3">
            {files.length > 0 && imageUrls.length > 0
              ? imageUrls.map((url, idx) => (
                  <motion.div
                    onClick={() => setOpen(true)}
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      ease: [0.19, 1, 0.22, 1],
                      duration: 0.8,
                      delay: 0.13 * idx,
                    }}
                    className="w-full aspect-square relative"
                  >
                    <Image
                      src={url}
                      alt="Image"
                      className="w-full h-full object-cover rounded-lg border border-slate-200"
                      width={50}
                      height={50}
                    />
                    <button
                      type="button"
                      className="absolute -top-2 cursor-pointer -right-2 p-1 bg-red-500 hover:bg-red-400 rounded-full"
                      onClick={(e) => handleRemoveImage(idx, e)}
                    >
                      <X className="size-3 text-white" />
                    </button>
                  </motion.div>
                ))
              : null}
          </div>
        </AnimatePresence>
      </div>

      <ImageDialog open={open} setOpen={setOpen} images={imageUrls} />
    </div>
  );
};

export default ImgUpload;
