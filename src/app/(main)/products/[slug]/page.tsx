import { FC } from "react";
import ProductsDisplaySection from "./display/product-display-section";
import ProductShowcaseSection from "./showcase/page";
import ProductVariations from "./components/product-variation";
import ProductReviewSection from "./components/product-review";

const ProductPage: FC = () => {
  return (
    <div className="flex flex-col gap-16 bg-slate-950 py-9">
      <ProductsDisplaySection />
      <ProductVariations />
      <ProductShowcaseSection />
      <ProductReviewSection />
    </div>
  );
};

export default ProductPage;
