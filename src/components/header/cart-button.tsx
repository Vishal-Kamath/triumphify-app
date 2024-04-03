"use client";

import { useAllCart } from "@/lib/cart";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useMe } from "@/lib/auth";

const CartButton: FC = () => {
  const { data: carts, isLoading: isMeLoading } = useAllCart();
  const { data: me, isLoading, isError } = useMe();

  if (isLoading || isMeLoading)
    return <Skeleton className="h-10 w-10 rounded-full" />;
  if (!carts || !me || me.type !== "success") return null;

  const count = Array.isArray(carts)
    ? carts.reduce((acc, cart) => acc + cart.quantity, 0)
    : 0;

  return (
    <Link
      href="/cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full border-1 border-slate-200 text-slate-500 hover:border-slate-500 hover:bg-slate-50 hover:text-slate-700"
    >
      <ShoppingCart className="h-4 w-4" />

      {count > 0 ? (
        <div className="absolute right-0 top-0 flex h-5 w-5 -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
          {count > 99 ? "99+" : count}
        </div>
      ) : null}
    </Link>
  );
};

export default CartButton;
