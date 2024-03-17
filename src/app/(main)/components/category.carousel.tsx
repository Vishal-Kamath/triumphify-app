"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCategories } from "@/lib/categories";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const CategoryCarousel: FC = () => {
  const { data: categories } = useCategories();
  return (
    <div className="padding-x">
      <div className="relative w-full">
        <Carousel
          opts={{
            skipSnaps: true,
          }}
          className="absolute top-0 z-10 w-full -translate-y-12 lg:-translate-y-20"
        >
          <CarouselContent>
            {categories?.map((category) => (
              <CarouselItem key={category.id} className="w-full md:basis-1/2">
                <Link
                  href={`/categories/${category.slug}`}
                  className="flex justify-between gap-6 rounded-xl border-1 border-slate-300 bg-white p-4 shadow-md"
                >
                  <div className="flex flex-col justify-center gap-3">
                    <h4 className="text-lg font-semibold">{category.name}</h4>
                    <p className="text-justify text-xs text-slate-500 max-lg:hidden">
                      {category.description}
                    </p>
                  </div>
                  <Image
                    src={category.category_image || ""}
                    alt="Banner image"
                    width={1500}
                    height={1500}
                    className="max-h-16 w-fit rounded-md object-contain lg:max-h-36 lg:w-full"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
