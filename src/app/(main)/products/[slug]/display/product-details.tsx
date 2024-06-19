import { Product } from "@/@types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { FC } from "react";
import ShareButton from "./share";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import LikeButton from "../components/like";

const ProductDetails: FC<{ product: Product }> = ({ product }) => {
  const pathname = usePathname();
  const link = `${process.env.APP_WEBSITE}${pathname}`;
  return (
    <div className="flex w-full flex-col gap-6 pt-12 lg:w-2/3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-light text-slate-400">
            {product.brand_name}
          </p>

          <div className="flex gap-3">
            <LikeButton productId={product.id} />
            <ShareButton link={link} />
          </div>
        </div>
        <h3 className="break-words text-2xl font-semibold text-white lg:text-3xl">
          {product.name}
        </h3>
      </div>

      <div className="text-sm text-gray-400">{product.description}</div>

      <Accordion type="single" collapsible>
        {product.product_accordians.map((description, index) => (
          <AccordionItem
            className="border-slate-700"
            key={description.title + index}
            value={"item" + index}
          >
            <AccordionTrigger className="text-gray-200">
              {description.title}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-gray-400">
              {description.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProductDetails;
