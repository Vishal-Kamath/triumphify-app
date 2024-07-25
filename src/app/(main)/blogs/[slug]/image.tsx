import { FC } from "react";
import Image from "next/image";

interface BlogImageProps {
  imgSrc: string;
}
const BlogImage: FC<BlogImageProps> = ({ imgSrc }) => {
  return (
    <div className="padding-x w-full py-4 md:py-6">
      <div className="w-full rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-800/80 p-5 md:p-6">
        <Image
          src={imgSrc}
          alt="image"
          className="h-fit w-full overflow-hidden rounded-sm border-2 border-slate-700 object-contain md:shadow-lg md:shadow-slate-900"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default BlogImage;
