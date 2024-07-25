import { dateFormater } from "@/utils/dateFormater";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";

const BlogTopBar: FC<{ date: Date }> = ({ date }) => {
  return (
    <div className="padding-x mb-6 flex w-full items-center justify-between gap-6 border-b-1 border-slate-700 pb-6">
      <div className="flex gap-2">
        <Link
          href="/"
          className="group flex h-10 items-center gap-3 rounded-md bg-slate-900 px-4 text-slate-300 transition-all duration-300 ease-in-out hover:bg-slate-700 hover:text-white"
        >
          <AiOutlineHome className="block h-4 w-4 group-hover:hidden" />
          <AiFillHome className="hidden h-4 w-4 group-hover:block" />
          <span className="max-md:hidden">Home</span>
        </Link>
      </div>
      <i className="flex h-10 items-center text-sm text-slate-500 underline underline-offset-2">
        {dateFormater(date)}
      </i>
    </div>
  );
};

export default BlogTopBar;
