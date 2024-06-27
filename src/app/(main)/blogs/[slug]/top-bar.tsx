import { dateFormater } from "@/utils/dateFormater";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const BlogTopBar: FC<{ date: Date }> = ({ date }) => {
  return (
    <div className="mb-6 flex w-full max-w-2xl items-center justify-between gap-6">
      <Link
        href="/blogs"
        className="group flex h-10 items-center gap-3 rounded-md bg-slate-900 px-4 text-slate-300 transition-all duration-300 ease-in-out hover:bg-slate-700 hover:text-white"
      >
        <ChevronLeft className="block h-4 w-4 group-hover:hidden" />
        <ArrowLeft className="hidden h-4 w-4 group-hover:block" />
        <span className="max-md:hidden">Back</span>
      </Link>
      <i className="flex h-10 items-center text-sm text-slate-500 underline underline-offset-2">
        {dateFormater(date)}
      </i>
    </div>
  );
};

export default BlogTopBar;
