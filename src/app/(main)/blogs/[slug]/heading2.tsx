import { FC } from "react";

const BlogHeading2: FC<{
  value: string;
}> = ({ value }) => {
  return (
    <div className="w-full max-w-2xl border-none py-2 text-2xl font-medium text-slate-300 outline-none">
      {value}
    </div>
  );
};

export default BlogHeading2;
