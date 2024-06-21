"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useBlogs } from "@/lib/blogs";
import useResponsive from "@/lib/hooks/use-responsive";
import { dateFormater } from "@/utils/dateFormater";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const BlogsSections: FC = () => {
  const { data: blogs } = useBlogs();
  const { maxLg, maxSm } = useResponsive();

  return blogs && Array.isArray(blogs) && blogs.length ? (
    <div className="padding-x flex flex-col gap-9 py-20">
      <h2 className="text-4xl font-semibold text-white">
        Read <span className="text-purple-300">More</span> from us.
      </h2>
      <Carousel
        opts={{
          skipSnaps: true,
        }}
        className="z-10 gap-6"
      >
        <CarouselContent className="h-full">
          {blogs.map((blog) => (
            <CarouselItem
              key={blog.id}
              className="h-full w-full sm:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={`/blogs/${blog.slug}`}
                className="flex h-full w-full flex-col gap-3"
              >
                <Image
                  src={blog.image}
                  alt="Blog image"
                  width={1500}
                  height={1500}
                  className="aspect-video w-full overflow-hidden border-1 border-slate-500 object-cover"
                />
                <div className="flex flex-col gap-3">
                  <p className="text-right text-xs text-slate-400">
                    {dateFormater(new Date(blog.created_at))}
                  </p>
                  <h4 className="text-lg font-semibold text-slate-300">
                    {blog.title.length > 43
                      ? blog.title.slice(0, 43) + "..."
                      : blog.title}
                  </h4>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {blogs.length > 3 ||
        (maxSm && blogs.length !== 1) ||
        (maxLg && blogs.length !== 2) ? (
          <>
            <CarouselNext className="top-1/3" />
            <CarouselPrevious className="top-1/3" />
          </>
        ) : null}
      </Carousel>
    </div>
  ) : null;
};

export default BlogsSections;
