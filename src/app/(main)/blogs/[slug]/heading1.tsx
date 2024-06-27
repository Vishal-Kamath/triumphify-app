import { FC } from "react";

const BlogHeading1: FC<{
  value: string;
}> = ({ value }) => {
  return (
    <div className="w-full max-w-2xl border-none pb-1 pt-4 text-3xl font-medium text-slate-200 outline-none">
      {value}
    </div>
  );
};

export default BlogHeading1;
