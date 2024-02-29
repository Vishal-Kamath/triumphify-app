"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useBanners } from "@/lib/banners";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import "./main.banner.css";

const MainBanners: FC = () => {
  const { data: mainBanners } = useBanners("main");
  return mainBanners && Array.isArray(mainBanners) ? (
    <div className="padding-2x banner flex h-full max-h-screen min-h-screen items-center justify-center">
      {/* <div className="bg"></div> */}
      <Carousel
        opts={{
          skipSnaps: true,
        }}
        className="z-10 pt-16"
      >
        <CarouselContent>
          {mainBanners.map((banner) => (
            <CarouselItem
              key={banner.id}
              className="flex w-full items-center gap-12 max-md:flex-col-reverse"
            >
              <div className="flex w-full flex-col gap-3">
                <h2 className="text-3xl font-bold capitalize text-purple-800 md:text-6xl">
                  {banner.name}
                </h2>
                <p className="max-w-lg text-sm text-slate-500">
                  {banner.description}
                </p>
                <Link
                  href={banner.link}
                  target="_blank"
                  className="mt-12 flex max-w-[15rem] items-center justify-center rounded-md border-1 border-purple-300 bg-purple-50 px-4 py-2 text-purple-600 hover:bg-purple-100"
                >
                  <span>Visit</span>
                </Link>
              </div>
              <Image
                src={banner.banner_image}
                alt={banner.name}
                width={500}
                height={500}
                className="aspect-square w-full max-w-xs object-contain md:w-1/3"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  ) : null;
};

export default MainBanners;
