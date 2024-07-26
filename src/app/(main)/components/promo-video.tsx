"use client";

import { ElementRef, FC, useEffect, useRef } from "react";
import { isServer } from "@tanstack/react-query";
import { Options } from "plyr";
import "./plyr.css";

const PromoVideoComponent: FC = () => {
  const videoPlayerRef = useRef<ElementRef<"video">>(null);

  const options: Options = {
    speed: {
      selected: 1,
      options: [0.5, 1, 1.5, 2],
    },
    controls: [
      "play-large",
      "restart",
      "rewind",
      "play",
      "fast-forward",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "captions",
      "settings",
      "pip",
      "airplay",
      // "download",
      "fullscreen",
    ],
  };

  const sources = {
    type: "video",
    sources: [
      {
        src: "/home/promo-video/360.mp4",
        type: "video/mp4",
        size: 360,
      },
      {
        src: "/home/promo-video/480.mp4",
        type: "video/mp4",
        size: 480,
      },
      {
        src: "/home/promo-video/720.mp4",
        type: "video/mp4",
        size: 720,
      },
      {
        src: "/home/promo-video/1080.mp4",
        type: "video/mp4",
        size: 1080,
      },
    ],
  };

  useEffect(() => {
    if (isServer || document === undefined) return () => {};

    async function loadPlyr() {
      const Plyr = (await import("plyr")).default;
      const player = new Plyr("#promo-video-player", options);
      player.source = sources as any;

      return () => {
        player.destroy();
      };
    }
    loadPlyr();
  }, [videoPlayerRef, isServer]);

  return (
    <div className="isolate flex flex-col gap-16 md:gap-24 md:py-12">
      <h2 className="padding-x text-4xl font-semibold leading-[1.2] text-white md:leading-[1.2] lg:text-5xl">
        You can learn from <span className="text-purple-400">Mike</span>
      </h2>

      <div className="relative md:px-[max(calc(50vw-40rem),5vw)]">
        <div
          style={{
            boxShadow: "0 0 80px 0 #a855f7, 0 0 10px 0 #d8b4fe",
          }}
          className="overflow-hidden md:rounded-b-xl md:rounded-t-3xl"
        >
          <video id="promo-video-player" ref={videoPlayerRef}></video>
        </div>
      </div>
    </div>
  );
};

export default PromoVideoComponent;
