"use client";
import VirtualAddress from "./(dashboard-section)/virtual-address";
import RestrictionCTA from "./(dashboard-section)/restriction-cta";
import TrackingCards from "./(dashboard-section)/tracking-cards";
import { Header } from "./(dashboard-section)/Header";
import Process from "./(dashboard-section)/process";

export default function DashboardPage() {
  return (
    <section className=" mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_.8fr]">
      {/* LEFT: Context & Actions */}
      <div className="space-y-8">
        <Header />

        <Process />

        <TrackingCards />

        <RestrictionCTA />
      </div>

      {/* RIGHT: Assets & tools */}
      <div className="h-full relative">
        <VirtualAddress />
      </div>
    </section>
  );
}
