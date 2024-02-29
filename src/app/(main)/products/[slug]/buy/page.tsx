"use client";

import { useProductWithDetails } from "@/lib/products";
import { useParams } from "next/navigation";
import { FC } from "react";
import BuyProductImages from "./buy-product-images";
import BuyProductDetails from "./buy-product-details";

const ProductBuyPage: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data: product } = useProductWithDetails(slug);

  return product ? (
    <div className="padding-x flex h-full min-h-screen items-start gap-9 pb-24 pt-3 max-lg:flex-col lg:pt-9">
      <BuyProductImages name={product.name} images={product.product_images} />
      <BuyProductDetails product={product} />
    </div>
  ) : null;
};

export default ProductBuyPage;
