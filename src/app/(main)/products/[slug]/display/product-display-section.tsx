"use client";

import { useProduct } from "@/lib/products";
import { useParams } from "next/navigation";
import { FC } from "react";
import ProductImages from "./products-image";
import ProductDetails from "./product-details";
import ProductLoadingPage from "./loading";

const ProductsDisplaySection: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data: product, isLoading } = useProduct(slug);

  if (isLoading) return <ProductLoadingPage />;

  return product ? (
    <div className="padding-x flex items-start gap-9 max-lg:flex-col">
      <ProductImages name={product.name} images={product.product_images} />
      <ProductDetails product={product} />
    </div>
  ) : null;
};

export default ProductsDisplaySection;
