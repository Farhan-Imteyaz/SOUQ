import { cn } from "@/lib/utils";

type BgLayerProps = {
  intensity: number;
};

const BgLayer = ({ intensity }: BgLayerProps) => {
  // Clamp intensity between 0.1 and 1
  const clampedIntensity = Math.min(1, Math.max(0.1, intensity));

  return (
    <div
      className={cn("absolute inset-0 w-full h-full bg-black")}
      style={{ opacity: clampedIntensity }}
    />
  );
};

export default BgLayer;
