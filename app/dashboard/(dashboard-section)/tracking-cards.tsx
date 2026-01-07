"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const cards = [
  {
    title: "Fullfilled orders",
    value: 12,
    color: "bg-green-500/5",
    text: "text-green-500",
  },
  {
    title: "In Transit",
    value: 19,
    color: "bg-yellow-500/5",
    text: "text-yellow-500",
  },
  {
    title: "Cancelled orders",
    value: 5,
    color: "bg-red-500/5",
    text: "text-red-500",
  },
];
const TrackingCards = () => {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold font-reddit mb-3">
        Your Shipment Overview
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
        {cards.map((card) => (
          <Card
            key={card.title}
            className={`${card.color} shadow-none border-slate-400/10!`}
          >
            <CardHeader className="space-y-4">
              <p className={`text-6xl font-medium ${card.text}`}>
                {card.value}
              </p>
            </CardHeader>
            <CardFooter>
              <CardTitle className="font-reddit font-normal!">
                {card.title}
              </CardTitle>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TrackingCards;
