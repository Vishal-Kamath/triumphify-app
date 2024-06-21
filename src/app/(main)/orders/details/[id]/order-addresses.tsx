import { OrderDetails } from "@/@types/order";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const OrderAddressSection: FC<{ order_details?: OrderDetails }> = ({
  order_details,
}) => {
  if (!order_details) return null;
  return (
    <div className="w-full lg:max-w-sm">
      <div className="left-0 top-0 flex w-full flex-col gap-3 pt-3 md:sticky lg:max-w-sm">
        <Link
          href={`/orders/history`}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "w-fit gap-3 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300 max-lg:hidden",
          )}
        >
          <MoveLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
        <div className="flex rounded-lg border-1 border-slate-700 bg-slate-900 max-md:flex-col lg:flex-col">
          {/* shipping address */}
          <div className="flex w-full flex-col gap-3 border-b-1 border-slate-700 p-4 max-lg:md:border-b-0 max-lg:md:border-r-1">
            <h3 className="text-sm font-semibold text-slate-300 underline">
              Shipping Address
            </h3>
            <div className="flex flex-col">
              <h5 className="font-medium text-slate-100">
                {order_details.shipping_address_name}
              </h5>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-xs">
                  {order_details.shipping_address_email}
                </span>
                <span>&#8226;</span>
                <span className="text-xs">
                  {order_details.shipping_address_tel}
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-1 text-xs text-slate-400">
                <p>{order_details.shipping_address_street_address}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span>{order_details.shipping_address_city}</span>
                  <span>&#8226;</span>
                  <span>{order_details.shipping_address_state}</span>
                  <span>&#8226;</span>
                  <span>{order_details.shipping_address_country}</span>
                  <span>&#8226;</span>
                  <span>{order_details.shipping_address_zip}</span>
                </div>
              </div>
            </div>
          </div>
          {/* billing address */}
          <div className="flex w-full flex-col gap-3 p-4">
            <h3 className="text-sm font-semibold text-slate-300 underline">
              Billing Address
            </h3>
            <div className="flex flex-col">
              <h5 className="font-medium text-slate-100">
                {order_details.billing_address_name}
              </h5>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-xs">
                  {order_details.billing_address_email}
                </span>
                <span>&#8226;</span>
                <span className="text-xs">
                  {order_details.billing_address_tel}
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-1 text-xs text-slate-400">
                <p>{order_details.billing_address_street_address}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span>{order_details.billing_address_city}</span>
                  <span>&#8226;</span>
                  <span>{order_details.billing_address_state}</span>
                  <span>&#8226;</span>
                  <span>{order_details.billing_address_country}</span>
                  <span>&#8226;</span>
                  <span>{order_details.billing_address_zip}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="mx-auto w-full max-w-sm border-slate-700 bg-slate-900 hover:bg-purple-900 hover:text-white"
        >
          Download Invoice
        </Button>
      </div>
    </div>
  );
};

export default OrderAddressSection;
