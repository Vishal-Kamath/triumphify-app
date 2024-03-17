"use client";

import { useProductWithDetails } from "@/lib/products";
import { notFound, useParams } from "next/navigation";
import { FC } from "react";
import BuyProductImages from "./buy-product-images";
import BuyProductDetails from "./buy-product-details";
import ProductReview from "./product-review";
import { isServer } from "@tanstack/react-query";

const ProductBuyPage: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data: product, isLoading, isFetched } = useProductWithDetails(slug);

  if (
    !isLoading &&
    isFetched &&
    !isServer &&
    product !== undefined &&
    product?.type === "error"
  ) {
    return notFound();
  }

  return product ? (
    <div className="padding-x flex h-full min-h-screen flex-col gap-9 pb-24 pt-3 lg:pt-9">
      <div className="flex items-start gap-9 max-lg:flex-col">
        <BuyProductImages name={product.name} images={product.product_images} />
        <BuyProductDetails product={product} />
      </div>
      <ProductReview productId={product.id} />
    </div>
  ) : null;
};

export default ProductBuyPage;
