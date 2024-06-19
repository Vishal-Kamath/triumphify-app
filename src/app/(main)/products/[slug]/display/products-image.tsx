"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useState } from "react";

const ProductImages: FC<{ name: string; images: string[] }> = ({
  name,
  images,
}) => {
  const [api, setApi] = useState<CarouselApi>();

  function selectSlide(index: number) {
    api?.scrollTo(index);
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <Carousel
        setApi={setApi}
        style={{
          boxShadow: "0 0 10px #c084fc77",
        }}
        className="w-full overflow-hidden rounded-[2rem] border-2 border-purple-900 bg-slate-950"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              className="cursor-grab active:cursor-grabbing"
              key={name + "image" + index}
            >
              <Image
                src={image}
                alt={name + "image"}
                width={1080}
                height={1080}
                className="aspect-square w-full object-contain object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="right-3" />
        <CarouselPrevious className="left-3" />

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-slate-600/40 to-transparent py-5">
          <Carousel className={"mx-auto w-full max-w-[31.5rem] gap-6"}>
            <CarouselContent className="justify-center">
              {images.map((image, index) => (
                <CarouselItem
                  key={name + "image" + index}
                  className="basis-1/6"
                >
                  <Image
                    src={image}
                    alt={name + "image"}
                    width={200}
                    height={200}
                    onClick={() => selectSlide(index)}
                    className={cn(
                      "aspect-square w-[4rem] cursor-pointer rounded-full border-2 border-slate-700 object-cover",
                    )}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 6 ? (
              <>
                <CarouselNext className="right-3" />
                <CarouselPrevious className="left-3" />
              </>
            ) : null}
          </Carousel>
        </div>
      </Carousel>
    </div>
  );
};

export default ProductImages;
