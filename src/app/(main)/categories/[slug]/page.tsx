"use client";

import { useCategory } from "@/lib/categories";
import { useParams } from "next/navigation";
import { FC } from "react";
import FiltersSidebar from "./filters";

const CategoryPage: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data: category } = useCategory(slug);

  return (
    <div className="padding-x flex gap-3">
      <FiltersSidebar />
      <div>
        <h1>{category?.name}</h1>
        <p>{category?.description}</p>
      </div>
    </div>
  );
};

export default CategoryPage;
