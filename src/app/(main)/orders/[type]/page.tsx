"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/lib/order";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { FC, useState } from "react";
import OrderComponent from "./order-component";

const OrderSearchPages: FC = () => {
  const type = useParams()["type"] as string;
  if (type !== "history" && type !== "cancelled" && type !== "returned")
    return notFound();

  const { data: orders, isLoading, refetch } = useOrders(type);
  const [search, setSearch] = useState("");

  const filteredOrders = orders?.filter(
    (order) =>
      order.product_name.toLowerCase().includes(search.toLowerCase()) ||
      order.id.includes(search),
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-end gap-3 max-md:flex-col">
        <Input
          type="text"
          placeholder="Search orders by name or id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="group active:bg-purple-100"
            onClick={() => refetch()}
          >
            <RefreshCw className="h-3 w-3 group-active:animate-spin " />
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        {filteredOrders?.map((order) => (
          <OrderComponent order={order} key={order.id} />
        ))}
        {!filteredOrders?.length ? (
          <div className="mt-9 flex w-full items-center justify-center gap-3 text-slate-500">
            <AlertCircle className="h-6 w-6" />
            <h4 className="text-lg font-medium">No orders found</h4>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderSearchPages;
