"use client";
import { useRef } from "react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  Slider,
  SliderContainer,
  SliderProgress,
} from "@/components/uilayouts/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BgLayer from "@/app/components/bg-layer";
const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Sign Up",
      desc: "Create your free account and get your Indian virtual address",
      image: "/assets/signup.png",
    },
    {
      step: 2,
      title: "Shop Online",
      desc: "Use your address to shop from any Indian e-commerce site",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop",
    },
    {
      step: 3,
      title: "We Receive",
      desc: "We receive, inspect, and photograph your packages",
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&auto=format&fit=crop",
    },
    {
      step: 4,
      title: "Choose Shipping",
      desc: "Select shipping method, consolidation, and delivery preferences",
      image:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop",
    },
    {
      step: 5,
      title: "Ship Worldwide",
      desc: "We consolidate and ship to your doorstep with full tracking",
      image:
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&auto=format&fit=crop",
    },
    {
      step: 6,
      title: "Track & Deliver",
      desc: "Track your shipment in real time until it reaches you",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    },
  ];
  const emblaRef = useRef<EmblaCarouselType | null>(null);

  const OPTIONS: EmblaOptionsType = { loop: false };
  return (
    <section className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-semibold">How It Works</h1>

        <div className="flex gap-2">
          <button
            onClick={() => emblaRef.current?.scrollPrev()}
            className="p-2 rounded-lg border"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => emblaRef.current?.scrollNext()}
            className="p-2 rounded-lg border"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <Carousel options={OPTIONS}>
        <SliderContainer className="gap-3">
          {steps.map((step, idx) => (
            <Slider className="w-1/4 h-112.5 " key={idx}>
              <div className="flex relative rounded-lg overflow-hidden items-center h-full justify-center">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={step.image}
                  alt={step.title}
                />
                <BgLayer intensity={0.2} />
                <div className="relative z-10 flex items-end h-full ">
                  <div className="px-4 py-4 bg-linear-to-t from-slate-800/50 via-slate-600/40 to-transparent   font-semibold">
                    <h3 className="text-xl text-slate-100 font-bold mb-1">
                      {step.title}
                    </h3>
                    <p className=" text-slate-100  leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          ))}
        </SliderContainer>

        <div className="w-full mt-4 flex justify-center items-center">
          <SliderProgress />
        </div>
      </Carousel>
    </section>
  );
};

export default HowItWorks;
