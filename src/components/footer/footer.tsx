"use client";

import { FC } from "react";
import TriumphifyLogo from "../ui/logo";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useCategories } from "@/lib/categories";
import Link from "next/link";

const Footer: FC = () => {
  const { data: categories } = useCategories();
  return (
    <footer className="padding-x mt-auto flex w-full gap-6 bg-purple-950/20 py-16 text-white">
      <div className="flex w-full flex-col gap-3">
        <TriumphifyLogo className="h-fit w-[10rem] fill-white" />

        <div className="flex gap-3">
          <FaInstagram className="h-6 w-6" />
          <FaFacebook className="h-6 w-6" />
          <FaTwitter className="h-6 w-6" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <h4>Categories</h4>

        <ul className="flex flex-col gap-2 text-sm text-slate-400">
          {categories?.map((category) => (
            <Link href={`/categories/${category.slug}`} key={category.id}>
              {category.name}
            </Link>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
