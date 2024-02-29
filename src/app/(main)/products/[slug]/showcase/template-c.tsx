import { TemplateCContent } from "@/@types/product";
import Image from "next/image";
import { FC } from "react";
import "./clip.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ProductShowcaseTemplateC: FC<TemplateCContent> = ({
  title0,
  description0,
  template_image0,
  title1,
  description1,
  template_image1,
}) => {
  return (
    <div className="padding-x z-0 flex w-full flex-col items-center gap-16 overflow-hidden py-28">
      <div className="flex w-full gap-16 max-lg:flex-col">
        <div className="relative w-full">
          <Image
            src={template_image0}
            alt="Product Showcase"
            width={400}
            height={400}
            className="w-full rounded-3xl border border-slate-300 bg-white object-contain shadow-md shadow-gray-950/5"
          />
          <Image
            src="/splatter-1.svg"
            alt="splatter"
            width={1000}
            height={1000}
            className="absolute left-0 top-1/2 -z-10 -translate-x-1/3 -translate-y-1/2 opacity-55"
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-4xl font-semibold text-gray-800">{title0}</h3>
          <p className="text-sm text-gray-400">{description0}</p>
        </div>
      </div>
      <div className="flex w-full gap-16 max-lg:flex-col-reverse">
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-4xl font-semibold text-gray-800">{title1}</h3>
          <p className="text-sm text-gray-400">{description1}</p>
        </div>
        <div className="w-full">
          <Image
            src={template_image1}
            alt="Product Showcase"
            width={400}
            height={400}
            className="w-full rounded-3xl border border-slate-300 bg-white object-contain shadow-md shadow-gray-950/5"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseTemplateC;
