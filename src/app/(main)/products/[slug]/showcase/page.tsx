"use client";

import { useShowcases } from "@/lib/products";
import { useParams } from "next/navigation";
import { FC } from "react";
import ProductShowcaseTemplateA from "./template-a";
import ProductShowcaseTemplateB from "./template-b";
import ProductShowcaseTemplateC from "./template-c";

const ProductShowcaseSection: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data: showcases } = useShowcases(slug);

  return (
    <div className="flex flex-col gap-16">
      {showcases?.map((showcase) => {
        switch (showcase.template) {
          case "A":
            return (
              <ProductShowcaseTemplateA
                key={showcase.id}
                {...showcase.content}
              />
            );
          case "B":
            return (
              <ProductShowcaseTemplateB
                key={showcase.id}
                {...showcase.content}
              />
            );
          case "C":
            return (
              <ProductShowcaseTemplateC
                key={showcase.id}
                {...showcase.content}
              />
            );
        }
      })}
    </div>
  );
};

export default ProductShowcaseSection;
