import { FC } from "react";

const BlogText: FC<{
  value: string;
}> = ({ value }) => {
  return (
    <div className="w-full max-w-3xl border-none py-2 text-sm text-slate-400 outline-none">
      {value}
    </div>
  );
};

export default BlogText;
