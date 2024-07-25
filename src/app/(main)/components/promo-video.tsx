"use client";

import { ElementRef, FC, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

const PromoVideoComponent: FC = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<ElementRef<"video">>(null);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="isolate flex flex-col gap-16 md:gap-24 md:py-12">
      <h2 className="padding-x text-4xl font-semibold leading-[1.2] text-white md:leading-[1.2] lg:text-5xl">
        You can learn from <span className="text-purple-400">Mike</span>
      </h2>

      <div className="relative md:px-[max(calc(50vw-40rem),5vw)]">
        <video
          ref={videoRef}
          src="/home/promo-video.mp4"
          style={{
            boxShadow: "0 0 80px 0 #a855f7, 0 0 10px 0 #d8b4fe",
          }}
          className="z-0 overflow-hidden md:rounded-b-lg md:rounded-t-3xl"
          controls
          controlsList="nodownload"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        ></video>
        {playing ? null : (
          <button
            onClick={playVideo}
            className="absolute left-1/2 top-1/2 z-20 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-purple-700 opacity-75 hover:opacity-100 md:size-24"
          >
            <FaPlay className="size-6 translate-x-[2px] text-white md:size-9 md:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PromoVideoComponent;
