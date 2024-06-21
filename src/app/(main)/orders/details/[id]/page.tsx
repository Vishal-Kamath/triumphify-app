"use client";

import { useOrder } from "@/lib/order";
import { notFound, useParams } from "next/navigation";
import { FC } from "react";
import { isServer } from "@tanstack/react-query";
import OrderProductDetails from "./order-details";
import OrderAddressSection from "./order-addresses";
import OrderStatus from "./order-status";
import OrderGroupDetails from "./order-group-details";
import OrderUserReview from "./user-review";
import OrderCancelForm from "./order-cancel";

const OrderDetails: FC = () => {
  const id = useParams()["id"] as string;
  const { data, isError, isLoading, isFetched } = useOrder(id);

  if (
    !isLoading &&
    isFetched &&
    !isServer &&
    data !== undefined &&
    data?.type === "error"
  ) {
    return notFound();
  }

  if (!data) return null;
  return (
    <main className="padding-x relative flex gap-5 bg-slate-950 pb-24 text-slate-200 max-lg:flex-col-reverse">
      <OrderAddressSection order_details={data.order_details} />
      <div className="flex flex-col gap-12 pt-3">
        <OrderProductDetails order={data.order} />
        <OrderStatus order={data.order} />
        <OrderGroupDetails all_orders={data.all_orders} />
        <OrderUserReview productId={data.order.product_id} />
        <OrderCancelForm
          order={data.order}
          isCancelledRequested={data.isCancelledRequested}
        />
      </div>
    </main>
  );
};

export default OrderDetails;
