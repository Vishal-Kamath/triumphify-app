import { FC } from "react";
import Marquee from "./marquee";
import Image from "next/image";

const HeroSection: FC = () => {
  return (
    <div className="relative isolate overflow-hidden py-12">
      <Marquee className="absolute left-0 top-0 isolate z-0" />

      <div className="padding-x isolate z-10 flex h-full w-full justify-between gap-12 max-lg:flex-col-reverse lg:items-center lg:gap-6">
        <div className="relative flex w-full flex-col gap-6 lg:max-w-lg">
          <Image
            src="/home/dot-grid.svg"
            alt="dot grid"
            width={250}
            height={250}
            className="absolute left-0 top-0 -z-0 -translate-x-16 -translate-y-16 max-md:hidden"
          />
          <Image
            src="/home/dot-grid-max-md.svg"
            alt="dot grid"
            width={125}
            height={125}
            className="absolute left-0 top-0 -z-0 -translate-y-14 md:hidden"
          />
          <h1 className="z-10 text-5xl font-semibold text-white lg:text-6xl">
            A product for <span className="text-purple-300">Men</span>, by Men
          </h1>
          <p className="z-10 text-justify text-[16px] text-slate-300">
            Our all-natural formula enhances libido, performance, and
            satisfaction, promoting sexual health without artificial additives.
            Feel confident and fulfilled today.
          </p>
        </div>
        <Image
          src="/home/hero-image.svg"
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full w-full object-contain object-center max-lg:mx-auto max-md:px-6 max-md:pb-12 md:max-w-md lg:max-w-md"
        />
      </div>
    </div>
  );
};

export default HeroSection;
