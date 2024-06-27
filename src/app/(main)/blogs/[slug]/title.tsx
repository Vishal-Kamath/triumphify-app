import { FC } from "react";

const BlogTitle: FC<{
  value: string;
}> = ({ value }) => {
  return (
    <div className="w-full max-w-2xl border-none pb-4 pt-8 text-4xl font-medium text-slate-100 outline-none">
      {value}
    </div>
  );
};

export default BlogTitle;
