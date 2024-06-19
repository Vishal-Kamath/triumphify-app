import { Product } from "@/@types/product";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import LikeButton from "../products/[slug]/components/like";

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="flex max-w-[15rem] flex-col gap-4">
      <Carousel className="relative aspect-square overflow-hidden rounded-lg border border-slate-700">
        <LikeButton
          productId={product.id}
          className="absolute right-3 top-3 z-10"
        />
        <CarouselContent>
          {product.product_images.map((image, index) => (
            <CarouselItem key={image + index}>
              <Image
                src={image}
                width={360}
                height={720}
                alt={product.name}
                className="aspect-square h-full w-full object-contain object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-col gap-2">
        <h4 className="break-words text-lg font-semibold leading-5">
          {product.name}
        </h4>
        <p className="text-sm text-gray-400">{product.brand_name}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`${process.env.APP_WEBSITE}/products/${product.slug}`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-rm bg-slate-800 py-1 text-xs hover:bg-purple-950",
          )}
        >
          Get it Now
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
