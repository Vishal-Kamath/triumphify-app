import { FC } from "react";
import ProductsDisplaySection from "./display/product-display-section";
import ProductShowcaseSection from "./showcase/page";

const ProductPage: FC = () => {
  return (
    <div className="flex flex-col gap-16 py-9">
      <ProductsDisplaySection />
      <ProductShowcaseSection />
    </div>
  );
};

export default ProductPage;
