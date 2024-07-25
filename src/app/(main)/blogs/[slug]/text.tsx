import { cn } from "@/lib/utils";
import { FC } from "react";

const styles = {
  title: "pb-4 pt-8 text-4xl font-medium text-slate-100 lg:text-5xl",
  h1: "pb-1 pt-4 text-3xl font-medium text-slate-200",
  h2: "py-2 text-2xl font-medium text-slate-300",
  text: "text-slate-400 text-sm py-2",
};

const BlogText: FC<{
  value: string;
  type: "title" | "h1" | "h2" | "text";
}> = ({ value, type }) => {
  return (
    <div
      className={cn("padding-x w-full border-none outline-none", styles[type])}
    >
      {value}
    </div>
  );
};

export default BlogText;
