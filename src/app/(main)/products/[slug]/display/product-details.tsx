import { Product } from "@/@types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart } from "lucide-react";
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
          <p className="text-sm font-light text-slate-600">
            {product.brand_name}
          </p>

          <div className="flex gap-3">
            <LikeButton productId={product.id} />
            <ShareButton link={link} />
          </div>
        </div>
        <h3 className="break-words text-2xl font-semibold lg:text-3xl">
          {product.name}
        </h3>
      </div>

      <div className="text-sm text-gray-900">{product.description}</div>

      <Accordion type="single" collapsible>
        {product.product_accordians.map((description, index) => (
          <AccordionItem key={description.title + index} value={"item" + index}>
            <AccordionTrigger>{description.title}</AccordionTrigger>
            <AccordionContent className="text-xs">
              {description.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex w-full gap-3">
        <Link
          href={`/products/${product.slug}/buy`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full rounded-full",
          )}
        >
          Get it Now
        </Link>
        <Button
          className="w-full cursor-not-allowed rounded-full"
          variant="secondary"
          disabled
        >
          Learn more
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
