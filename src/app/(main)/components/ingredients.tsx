"use client";

import { ElementRef, FC, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import useResponsive from "@/lib/hooks/use-responsive";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IngredientsSection: FC = () => {
  const { maxMd } = useResponsive();

  const containerRef = useRef<ElementRef<"div">>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const [progress, setProgress] = useState(0);

  scrollYProgress.on("change", (value) => {
    setProgress(value);
  });

  // section ratios
  const section1End = 1 / 6;
  const section2End = 2 / 6;
  const section3End = 3 / 6;
  const section4End = 4 / 6;
  const section5End = 5 / 6;

  // shrink range
  const shrinkRange = (
    20 -
    17.75 * ((progress - section4End) / (section5End - section4End))
  ).toFixed(1);

  return (
    <div
      ref={containerRef}
      className="padding-x relative h-[600vh] w-full py-12"
    >
      <div
        style={{
          top:
            progress > section5End && maxMd
              ? `${10 - 25 * ((progress - section5End) / (1 - section5End))}rem`
              : "10rem",
        }}
        className="sticky left-0 isolate z-10 flex w-full justify-between gap-9 max-md:flex-col max-md:items-center"
      >
        <div className="flex w-full flex-col gap-6 text-white md:max-w-lg">
          <h2 className="text-4xl font-semibold text-white">
            Made with <span className="text-purple-300">Natural</span>{" "}
            Ingredients
          </h2>
          <Accordion
            type="single"
            value={
              progress > 0 && progress < section1End
                ? "abharak-bhasma"
                : progress > section1End && progress < section2End
                  ? "dalchinni"
                  : progress > section2End && progress < section3End
                    ? "gokhru"
                    : progress > section3End && progress < section4End
                      ? "shilajeet"
                      : "none"
            }
          >
            <AccordionItem className="border-slate-500" value="abharak-bhasma">
              <AccordionTrigger hideIcon className="text-lg md:text-xl">
                Abhrak Bhasma
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-400 md:text-sm">
                A classical ayurvedic formulation that employs the use of abhrak
                ash for treating and managing a quarry of health anomalies
                including sexual and reproductive problems. Abhrak Bhasma helps
                improve sexual problems, such as, low sperm count and loss of
                libido.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-slate-500" value="dalchinni">
              <AccordionTrigger hideIcon className="text-lg md:text-xl">
                Dalchinni
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-400 md:text-sm">
                Commonly known as Cinnamon, the bark is used for
                gastrointestinal issues, diarrhea, and gas. It is also used for
                stimulating appetite; treatment of infections and for menstrual
                cramps, the common cold, and influenza.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-slate-500" value="gokhru">
              <AccordionTrigger hideIcon className="text-lg md:text-xl">
                Gokhru
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-400 md:text-sm">
                An ancient herb, commonly used in Ayurvedic healing, it is known
                as the Tribulus plant and is known to heal kidney and urinary
                diseases. It ensures normal flow of urine while detoxifying the
                kidneys. It was used in Ayurvedic medicine to treat asthma,
                cough, edema, and kidney problems. Researchers have found this
                herb to possess hypotensive, aphrodisiac, anti-microbial,
                anti-cancer, and diuretic properties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-slate-500" value="shilajeet">
              <AccordionTrigger hideIcon className="text-lg md:text-xl">
                Shilajeet
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-400 md:text-sm">
                Shilajeet contains fulvic acid and more than 84 minerals
                offering numerous health benefits. It functions as an
                antioxidant to improve your body's immunity and memory, an
                anti-inflammatory, an energy booster, and a diuretic to remove
                excess fluid from your body. It is known to boost libido and
                energy levels and is a top herb for sexual health problems. Used
                since ancient times, it may also be used for premature
                ejaculation and other sexual health disorders.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex h-[20rem] w-[20rem] flex-shrink-0 items-center justify-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            className={cn("relative", progress > section5End ? "hidden" : "")}
            style={{
              height: progress > section4End ? `${shrinkRange}rem` : "20rem",
              width: progress > section4End ? `${shrinkRange}rem` : "20rem",
            }}
          >
            <Image
              alt="ingredients Abhrak Bhasma"
              src="/home/18-abhrak-bhasma.png"
              width={200}
              height={200}
              className={cn(
                "absolute left-0 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-slate-400 p-2",
                (progress > 0 && progress < section1End) ||
                  progress > section4End
                  ? ""
                  : "opacity-25",
              )}
            />
            <Image
              alt="ingredients Dalchini"
              src="/home/9-dalchini.png"
              width={200}
              height={200}
              className={cn(
                "absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full bg-slate-400 p-2",
                (progress > section1End && progress < section2End) ||
                  progress > section4End
                  ? ""
                  : "opacity-25",
              )}
            />
            <Image
              alt="ingredients Gokhru"
              src="/home/5-Gokhru.png"
              width={200}
              height={200}
              className={cn(
                "absolute right-0 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-slate-400 p-2",
                (progress > section2End && progress < section3End) ||
                  progress > section4End
                  ? ""
                  : "opacity-25",
              )}
            />
            <Image
              alt="ingredients Shilajeet"
              src="/home/22-Shilajeet.png"
              width={200}
              height={200}
              className={cn(
                "absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-slate-400 p-2",
                (progress > section3End && progress < section4End) ||
                  progress > section4End
                  ? ""
                  : "opacity-25",
              )}
            />
          </motion.div>
          <div
            className={cn(
              "h-12 w-24 rounded-full bg-purple-500",
              progress > section5End ? "" : "hidden",
            )}
          ></div>
        </div>
      </div>

      <div className="right-x absolute bottom-0 isolate z-30 flex w-[20rem] flex-col items-center justify-center max-md:left-1/2 max-md:-translate-x-1/2">
        {/* <Image
          src="/home/open-box-flap.png"
          alt="open box flap"
          width={500}
          height={1000}
          className="z-0 w-[20rem] translate-y-2 object-contain"
        /> */}
        <Image
          src="/home/open-box.png"
          alt="open box"
          width={500}
          height={1000}
          className="h-fit w-[20rem] object-contain"
        />
      </div>
    </div>
  );
};
export default IngredientsSection;
