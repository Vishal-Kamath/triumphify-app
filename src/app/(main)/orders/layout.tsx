"use client";

import AuthProvider from "@/components/provider/auth.provider";
import { Separator } from "@/components/ui/separator";
import { FC, ReactNode } from "react";
import OrderNav from "./order-nav";
import { usePathname } from "next/navigation";

const OrderLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  if (pathname.startsWith("/orders/details")) return children;

  return (
    <AuthProvider>
      <div className="padding-x flex flex-col gap-6 bg-slate-950 pb-24 pt-9 text-white">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Orders</h2>
          <p className="text-sm text-slate-500">
            Manage your orders and subscriptions.
          </p>
        </div>
        <Separator className="bg-slate-500" />
        <div className="flex gap-6 max-md:flex-col">
          <OrderNav />
          {children}
        </div>
      </div>
    </AuthProvider>
  );
};

export default OrderLayout;
