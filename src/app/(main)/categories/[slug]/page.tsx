"use client";

import { useCategory } from "@/lib/categories";
import { useParams } from "next/navigation";
import { FC } from "react";

const CategoryPage: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data: category } = useCategory(slug);

  return <div>{JSON.stringify(category)}</div>;
};

export default CategoryPage;
