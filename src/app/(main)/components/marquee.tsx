"use client";

import {
  Component,
  ComponentProps,
  ElementRef,
  FC,
  use,
  useEffect,
  useRef,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Marquee: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  const marqueeVariants = {
    animate: {
      x: [0, -3865],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 90,
          ease: "linear",
        },
      },
    },
  };
  const marqueeVariants2 = {
    animate: {
      x: [-3865, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 90,
          ease: "linear",
        },
      },
    },
  };

  const reference = useRef<ElementRef<"div">>(null);

  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      <motion.div
        className="track"
        variants={marqueeVariants}
        animate="animate"
      >
        <h1
          ref={reference}
          className="m-0 text-nowrap p-0 text-[8rem] font-bold leading-none text-slate-500/15"
        >
          TRIUMPHIFY THE PURPLE PILL{" "}
          <span className="text-purple-500/25">TRIUMPHIFY</span> THE PURPLE PILL
          TRIUMPHIFY THE PURPLE PILL TRIUMPHIFY THE PURPLE PILL
        </h1>
      </motion.div>
      <motion.div
        className="track"
        variants={marqueeVariants2}
        animate="animate"
      >
        <h1
          ref={reference}
          className="m-0 text-nowrap p-0 text-[8rem] font-bold leading-none text-slate-500/20"
        >
          TRIUMPHIFY <span className="text-purple-500/25">THE</span> PURPLE PILL
          TRIUMPHIFY THE PURPLE PILL TRIUMPHIFY THE PURPLE PILL TRIUMPHIFY THE
          PURPLE PILL
        </h1>
      </motion.div>
      <motion.div
        className="track"
        variants={marqueeVariants}
        animate="animate"
      >
        <h1
          ref={reference}
          className="m-0 text-nowrap p-0 text-[8rem] font-bold leading-none text-slate-500/25"
        >
          PILL TRIUMPHIFY THE PURPLE PILL TRIUMPHIFY THE{" "}
          <span className="text-purple-500/25">PURPLE</span> PILL TRIUMPHIFY THE
          PURPLE PILL TRIUMPHIFY THE PURPLE
        </h1>
      </motion.div>
      <motion.div
        className="track"
        variants={marqueeVariants2}
        animate="animate"
      >
        <h1
          ref={reference}
          className="m-0 text-nowrap p-0 text-[8rem] font-bold leading-none text-slate-500/30"
        >
          PILL TRIUMPHIFY THE PURPLE{" "}
          <span className="text-purple-500/25">PILL</span> TRIUMPHIFY THE PURPLE
          PILL TRIUMPHIFY THE PURPLE PILL TRIUMPHIFY THE PURPLE
        </h1>
      </motion.div>
      <motion.div
        className="track"
        variants={marqueeVariants}
        animate="animate"
      >
        <h1
          ref={reference}
          className="m-0 text-nowrap p-0 text-[8rem] font-bold leading-none text-slate-500/35 md:hidden"
        >
          TRIUMPHIFY THE PURPLE PILL TRIUMPHIFY THE PURPLE PILL TRIUMPHIFY THE
          PURPLE PILL TRIUMPHIFY THE PURPLE PILL
        </h1>
      </motion.div>
    </div>
  );
};

export default Marquee;
