"use client";

import { Cart } from "@/@types/cart";
import { useAllCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, ReactNode, useState } from "react";

function getTotals(cart: Cart[]) {
  const subTotal = parseFloat(
    cart
      .reduce(
        (subTotal, curr) => subTotal + curr.variation.price * curr.quantity,
        0,
      )
      .toFixed(2),
  );
  const discount = parseFloat(
    cart
      .reduce(
        (discount, curr) =>
          discount +
          curr.variation.price *
            (curr.variation.discount / 100) *
            curr.quantity,
        0,
      )
      .toFixed(2),
  );
  const total = subTotal - discount;

  return { subTotal, discount, total };
}

const Total: FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: carts, isLoading } = useAllCart();
  const [open, setOpen] = useState(true);

  if (isLoading)
    return (
      <div className="flex w-full max-w-sm flex-col gap-2 border-l-1 border-slate-700 px-3 pl-6">
        Loading...
      </div>
    );
  if (!carts)
    return (
      <div className="flex w-full max-w-sm flex-col gap-2 border-l-1 border-slate-700 px-3 pl-6">
        Something went wrong
      </div>
    );

  const { discount, total, subTotal } = getTotals(carts);
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 border-slate-700 bg-slate-950 text-sm text-white",
        "padding-x border-slate-600 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:rounded-t-xl max-md:border-t-1 max-md:pb-6",
        "md:max-w-sm md:border-none md:px-0",
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-center pt-3 text-slate-600 hover:text-slate-300 md:hidden"
      >
        {open ? (
          <ChevronDown className="size-6" />
        ) : (
          <ChevronUp className="size-6" />
        )}
      </button>
      <div className={cn("flex flex-col gap-2", !open ? "max-md:hidden" : "")}>
        <div className="flex items-baseline gap-2">
          <h4 className="text-lg font-semibold">Totals</h4>
          <span>{carts.length !== 1 ? `${carts.length} items` : `1 item`}</span>
        </div>
        <div className="mb-6 flex w-full flex-col gap-3 [&>*]:flex [&>*]:w-full [&>*]:justify-between">
          <div>
            <span>Total MRP</span>
            <span>&#36;{subTotal}</span>
          </div>
          {!!discount && (
            <div>
              <span>Discount</span>
              <span className="text-green-400">-&#36;{discount}</span>
            </div>
          )}
          {/* {couponDiscount && !!couponDiscount.discount && (
            <div>
              <span>Coupon Discount</span>
              <span className="text-green-400">
                -&#36;{couponDiscount.discount}
              </span>
            </div>
          )} */}
          <div className="border-t-[1px] border-gray-700 pt-5 font-bold">
            <span>Total Amount</span>
            <span>
              &#36;
              {total}
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Total;
