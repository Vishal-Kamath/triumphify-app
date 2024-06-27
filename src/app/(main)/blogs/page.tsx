"use client";

import { useBlogs } from "@/lib/blogs";
import { dateFormater } from "@/utils/dateFormater";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const BlogsPage: FC = () => {
  const { data: blogs } = useBlogs();

  return (
    <div className="padding-x flex flex-col gap-9 py-20">
      <h2 className="text-4xl font-semibold text-white">
        Read <span className="text-purple-300">More</span> from us.
      </h2>
      <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-3">
        {blogs && Array.isArray(blogs) && blogs.length ? (
          blogs.map((blog) => (
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
          ))
        ) : (
          <i className="col-span-full w-full py-12 text-center text-xl text-slate-600">
            No blogs found
          </i>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
