"use client";

import { useBlog } from "@/lib/blogs";
import { useParams } from "next/navigation";
import { FC } from "react";
import BlogTopBar from "./top-bar";
import BlogImage from "./image";
import BlogText from "./text";
import BlogsSections from "../../components/blogs";

const BlogPage: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data } = useBlog(slug);

  const blog = data?.blog;
  const sections = data?.sections;

  return blog && sections ? (
    <div className="flex flex-col items-center py-6">
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
            case "h1":
            case "h2":
            case "text":
              return (
                <BlogText
                  key={section.id}
                  type={section.type}
                  value={section.content.value}
                />
              );
          }
        })}
      <BlogsSections />
    </div>
  ) : null;
};

export default BlogPage;
