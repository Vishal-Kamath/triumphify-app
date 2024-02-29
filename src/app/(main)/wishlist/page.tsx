"use client";

import { useWishlists } from "@/lib/wishlist";
import { FC } from "react";
import ProductCard from "../components/product-card";

const WishlistPage: FC = () => {
  const { data: wishlist } = useWishlists();
  return (
    <div>
      {wishlist?.map((product, index) => (
        <ProductCard key={product.name + index} product={product} />
      ))}
    </div>
  );
};

export default WishlistPage;
