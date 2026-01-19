import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import type { EmblaOptionsType } from "embla-carousel";
import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
  SliderNextButton,
  SliderPrevButton,
} from "@/components/uilayouts/carousel";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
const OPTIONS: EmblaOptionsType = { loop: false };
const ImageDialog = ({
  open,
  setOpen,
  images,
}: {
  open: boolean;
  setOpen: any;
  images: string[];
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl ">
        <DialogHeader>
          <DialogTitle>Image Viewer</DialogTitle>
        </DialogHeader>
        <Carousel options={OPTIONS} className="relative ">
          <SliderContainer className="gap-2 h-125">
            {images.map((url, idx) => (
              <Slider key={idx} className="w-full " thumbnailSrc={url}>
                <Image
                  src={url}
                  width={1400}
                  height={800}
                  alt="image"
                  className="h-full object-cover rounded-lg w-full"
                />
              </Slider>
            ))}
          </SliderContainer>

          <SliderPrevButton className="absolute top-[50%] p-2 border-2 rounded-full left-4 bg-black/25 border-black/10 backdrop-blur-xs text-primary disabled:opacity-20">
            <ChevronLeft className="w-5 h-5" />
          </SliderPrevButton>
          <SliderNextButton className="absolute right-4 p-2 border-2 rounded-full top-[50%] bg-black/25  border-black/10 backdrop-blur-xs text-primary disabled:opacity-20">
            <ChevronRight className="w-5 h-5" />
          </SliderNextButton>
          <ThumbsSlider className="pt-4" thumbsClassName="h-fit" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
