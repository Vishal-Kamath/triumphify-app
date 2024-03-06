"use client";

import { useAllCart } from "@/lib/cart";
import { FC } from "react";
import CartProduct from "./cart-product";
import Total from "./total";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const CartPage: FC = () => {
  const { data: carts, isLoading } = useAllCart();

  if (isLoading) return <div className="w-full">Loading...</div>;
  return (
    <div className="flex h-full gap-6 max-md:flex-col">
      <div className="flex w-full flex-col gap-3">
        {carts?.map((cart, index) => (
          <CartProduct key={cart.id + index} cart={cart} />
        ))}
      </div>
      <Total>
        <Link
          href="/cart/address"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full rounded-full",
          )}
        >
          Continue
        </Link>
      </Total>
    </div>
  );
};

export default CartPage;
