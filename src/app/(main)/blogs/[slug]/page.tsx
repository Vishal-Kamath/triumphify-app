"use client";

import { useBlog } from "@/lib/blogs";
import { useParams } from "next/navigation";
import { FC } from "react";
import BlogTopBar from "./top-bar";
import BlogImage from "./image";
import BlogTitle from "./title";
import BlogHeading1 from "./heading1";
import BlogHeading2 from "./heading2";
import BlogText from "./text";

const BlogPage: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data } = useBlog(slug);

  const blog = data?.blog;
  const sections = data?.sections;

  return blog && sections ? (
    <div className="padding-x flex flex-col items-center py-6">
      <BlogTopBar date={new Date(blog.created_at)} />
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          switch (section.type) {
            case "image":
              return (
                <BlogImage key={section.id} imgSrc={section.content.src} />
              );
            case "title":
              return (
                <BlogTitle key={section.id} value={section.content.value} />
              );
            case "h1":
              return (
                <BlogHeading1 key={section.id} value={section.content.value} />
              );
            case "h2":
              return (
                <BlogHeading2 key={section.id} value={section.content.value} />
              );
            case "text":
              return (
                <BlogText key={section.id} value={section.content.value} />
              );
          }
        })}
    </div>
  ) : null;
};

export default BlogPage;
