import { FC } from "react";
import Marquee from "./marquee";
import Image from "next/image";

const HeroSection: FC = () => {
  return (
    <div className="relative isolate pt-12">
      <Marquee className="z-0" />

      <div className="padding-x absolute left-0 top-0 isolate z-10 flex h-full w-full items-center justify-between gap-6 max-md:flex-col-reverse">
        <div className="flex w-full flex-col gap-6 md:max-w-lg">
          <h1 className="text-6xl font-semibold text-white">
            Something something
          </h1>
          <p className="text-justify text-sm text-slate-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            porro laudantium esse quod ipsum excepturi maxime error expedita
            nostrum. Aliquam quasi accusantium tenetur deleniti reprehenderit
            adipisci delectus pariatur illo error!
          </p>
        </div>
        <Image
          src="/home/hero-image.svg"
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full w-full object-contain md:max-w-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
