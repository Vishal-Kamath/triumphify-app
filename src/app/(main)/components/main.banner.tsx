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
    <div className="padding-x w-full py-12">
      <Carousel
        opts={{
          skipSnaps: true,
        }}
        className="z-10"
      >
        <CarouselContent>
          {mainBanners.map((banner) => (
            <CarouselItem key={banner.id} className="w-full">
              <Link href={banner.link} target="_blank">
                <Image
                  src={banner.banner_image_desktop}
                  alt="Banner image"
                  width={1500}
                  height={1500}
                  className="w-full object-contain max-lg:hidden"
                />
                <Image
                  src={banner.banner_image_mobile}
                  alt="Banner image"
                  width={1500}
                  height={1500}
                  className="w-full object-contain lg:hidden"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  ) : null;
};

export default MainBanners;
