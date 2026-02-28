"use client";
import { ShoppingCart, Clock, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const StatCards = ({ total, status }: { total: number, status:any }) => {
  const totalOrders = total;
  const pendingOrders = status.pending;
  const rejectedOrders = status.rejected;
  const completedOrders = status.completed;
  const cards = [
    {
      label: "Total Orders",
      value: totalOrders,
      color: "#BFDBFE", // Tailwind blue-100
      icon: ShoppingCart,
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      color: "#FEF3C7", // Tailwind amber-100
      icon: Clock,
    },
    {
      label: "Rejected Orders",
      value: rejectedOrders,
      color: "#FECACA", // Tailwind red-100
      icon: XCircle,
    },
    {
      label: "Completed Orders",
      value: completedOrders,
      color: "#D1FAE5", // Tailwind emerald-100
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={cn(
              ` p-6 rounded-xl border bg-slate-100 hover:shadow-md transition-shadow duration-200`,
              card.color
            )}
          >
            <div className="p-2 w-fit bg-black rounded-lg">
              <Icon className="size-6 text-slate-50" />
            </div>

            <p className={`text-5xl font-reddit font-medium mt-4 mb-3`}>
              {card.value}
            </p>

            <p className="text-sm">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;
