"use client";

import { Cart } from "@/@types/cart";
import { useAllCart } from "@/lib/cart";
import { FC, ReactNode } from "react";

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
            curr.variation.quantity,
        0,
      )
      .toFixed(2),
  );

  const gst = parseFloat(
    cart
      .reduce(
        (gst, curr) =>
          gst +
          (curr.product.gst_price / 100) * curr.variation.price * curr.quantity,
        0,
      )
      .toFixed(2),
  );
  const total = subTotal - discount + gst;

  return { subTotal, gst, discount, total };
}

const Total: FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: carts, isLoading } = useAllCart();

  if (isLoading)
    return (
      <div className="flex w-full max-w-sm flex-col gap-2 border-l-1 border-slate-200 px-3 pl-6">
        Loading...
      </div>
    );
  if (!carts)
    return (
      <div className="flex w-full max-w-sm flex-col gap-2 border-l-1 border-slate-200 px-3 pl-6">
        Something went wrong
      </div>
    );

  const { discount, total, gst, subTotal } = getTotals(carts);
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 border-l-1 border-slate-200 px-3 pl-6 text-sm">
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
        {!!gst && (
          <div>
            <span>GST</span>
            <span></span>&#36;{gst}
          </div>
        )}
        <div className="border-t-[1px] border-gray-300 pt-5 font-bold">
          <span>Total Amount</span>
          <span>
            &#36;
            {total}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Total;
