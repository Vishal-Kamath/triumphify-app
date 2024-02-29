import { TemplateAContent } from "@/@types/product";
import Image from "next/image";
import { FC } from "react";
import "./clip.css";

const ProductShowcaseTemplateA: FC<TemplateAContent> = ({
  title,
  description,
  template_image,
}) => {
  return (
    <div className="padding-x relative z-0 flex w-full items-center gap-12 overflow-hidden py-28 max-lg:flex-col">
      <div className="flex w-full flex-col gap-3">
        <h3 className="text-4xl font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="relative w-full">
        <Image
          src={template_image}
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
          className="absolute right-0 top-1/2 -z-10 -translate-y-1/2 translate-x-1/2 opacity-55"
        />
        <Image
          src="/splatter-1.svg"
          alt="splatter"
          width={1000}
          height={1000}
          className="absolute left-0 top-1/2 -z-10 -translate-x-1/3 -translate-y-1/2 opacity-55"
        />
      </div>
    </div>
  );
};

export default ProductShowcaseTemplateA;
