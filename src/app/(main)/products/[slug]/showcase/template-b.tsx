import { TemplateBContent } from "@/@types/product";
import Image from "next/image";
import { FC } from "react";
import "./clip.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ProductShowcaseTemplateB: FC<TemplateBContent> = ({
  title0,
  description0,
  template_image0,
  title1,
  description1,
  template_image1,
  title2,
  description2,
  template_image2,
}) => {
  return (
    <div className="padding-x z-0 flex w-full items-center gap-16 overflow-hidden py-28">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="relative w-full"
      >
        <div className="absolute left-0 top-1/2 -z-10 h-[25rem] w-[25rem] -translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-tr from-purple-50/25 via-purple-200/25 to-purple-400/75"></div>
        <Image
          src="/splatter-1.svg"
          alt="splatter"
          width={1000}
          height={1000}
          className="absolute right-0 top-1/2 -z-10 -translate-y-1/2 translate-x-1/3 opacity-25"
        />
        <CarouselContent>
          <CarouselItem className="flex w-full flex-col gap-12 px-6 md:basis-1/2 lg:basis-1/3">
            <div className="w-full">
              <Image
                src={template_image0}
                alt="Product Showcase"
                width={400}
                height={400}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 object-contain shadow-md shadow-gray-950/5"
              />
            </div>
            <div className="flex w-full flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-200">{title0}</h3>
              <p className="text-sm text-gray-400">{description0}</p>
            </div>
          </CarouselItem>
          <CarouselItem className="flex w-full flex-col gap-12 px-6 md:basis-1/2 lg:basis-1/3">
            <div className="w-full">
              <Image
                src={template_image1}
                alt="Product Showcase"
                width={400}
                height={400}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 object-contain shadow-md shadow-gray-950/5"
              />
            </div>
            <div className="flex w-full flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-200">{title1}</h3>
              <p className="text-sm text-gray-400">{description1}</p>
            </div>
          </CarouselItem>
          <CarouselItem className="flex w-full flex-col gap-12 px-6 md:basis-1/2 lg:basis-1/3">
            <div className="w-full">
              <Image
                src={template_image2}
                alt="Product Showcase"
                width={400}
                height={400}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 object-contain shadow-md shadow-gray-950/5"
              />
            </div>
            <div className="flex w-full flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-200">{title2}</h3>
              <p className="text-sm text-gray-400">{description2}</p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductShowcaseTemplateB;
