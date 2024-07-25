"use client";

import { useBannersLinkedContent } from "@/lib/banners";
import Link from "next/link";
import { FC } from "react";
import "./shop-now.css";

const ShopNow: FC = () => {
  const { data } = useBannersLinkedContent();
  return data?.blog ? (
    <div className="padding-2x relative isolate flex items-center justify-center py-20">
      <div className="absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[10rem] font-bold text-white/10">
        THE PURPLE PILL
      </div>
      <Link
        href={`/blogs/${data.blog.slug}`}
        className="shop-now-button z-10 border-purple-800 bg-clip-text text-[5rem] font-semibold text-transparent hover:border-b-8"
      >
        Shop Now
      </Link>
    </div>
  ) : null;
};

export default ShopNow;
