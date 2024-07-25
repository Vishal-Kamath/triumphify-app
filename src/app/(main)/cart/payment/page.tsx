"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useAddresses } from "@/lib/address";
import { useAddressState } from "@/lib/hooks/use-address";
import { cn } from "@/lib/utils";
import { Coins, ExternalLink, MoveLeft } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import Total from "../total";
import { invalidateAllCarts, useAllCart } from "@/lib/cart";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";

const CartPaymentPage: FC = () => {
  const router = useRouter();

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { data: addresses } = useAddresses();

  const [shipping] = useAddressState("shippingAddress");
  const shippingInAddresses = addresses
    ? addresses.find((addr) => addr.id === shipping)
    : undefined;

  const [billing] = useAddressState("billingAddress");
  const billingInAddresses = addresses
    ? addresses.find((addr) => addr.id === billing)
    : undefined;

  const { data: carts } = useAllCart();

  const [paymentMethod, setPaymentMethod] = useState("");

  function onPlaceOrder() {
    if (!shippingInAddresses || !billingInAddresses) return;

    setLoading(true);
    axios
      .post(
        `${process.env.ENDPOINT}/api/orders`,
        {
          shippingAddress: shippingInAddresses.id,
          billingAddress: billingInAddresses.id,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setLoading(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateAllCarts();
        // router.push("/orders/history");
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  }

  return (
    <div className="flex h-full gap-6 max-md:flex-col">
      <div className="flex w-full flex-col gap-6">
        <div className="flex justify-between gap-3">
          <Link
            href="/cart/address"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "gap-3 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300",
            )}
          >
            <MoveLeft className="w-4" />
            <span>Back</span>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Payment method</h3>
          <p className="text-justify text-sm text-gray-500">
            Select your desired payment method to continue with the order
            process. Contact our support team for assistance. Thank you for
            choosing Triumphify!
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <label
            htmlFor="cash on delivery"
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-md border-1 p-3",
              paymentMethod === "cash on delivery"
                ? "border-purple-500 outline outline-4 outline-purple-100"
                : "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600",
            )}
          >
            <input
              type="radio"
              id="cash on delivery"
              name="payment method"
              className="hidden"
              onChange={(e) => setPaymentMethod("cash on delivery")}
            />
            <Coins className="h-4 w-4" />
            <p>Cash on Delivery</p>
          </label>
        </div>

        {/* <div className="flex w-full flex-col gap-4">
          <h3 className="text-xl">Addresses</h3>
          {shippingInAddresses ? (
            <div className="flex flex-col gap-1 rounded-lg border-1 border-slate-200 p-6 shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <h5 className="text-lg font-medium">
                  {shippingInAddresses.name}
                </h5>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{shippingInAddresses.email}</span>
                <span>&#8226;</span>
                <span>{shippingInAddresses.tel}</span>
              </div>

              <div className="mt-6 flex flex-col gap-1 text-sm text-slate-600">
                <p>{shippingInAddresses.street_address}</p>
                <div className="flex items-center gap-3">
                  <span>{shippingInAddresses.city}</span>
                  <span>&#8226;</span>
                  <span>{shippingInAddresses.state}</span>
                  <span>&#8226;</span>
                  <span>{shippingInAddresses.country}</span>
                  <span>&#8226;</span>
                  <span>{shippingInAddresses.zip}</span>
                </div>
              </div>
            </div>
          ) : null}
          {billingInAddresses ? (
            <div className="flex flex-col gap-1 rounded-lg border-1 border-slate-200 p-6 shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <h5 className="text-lg font-medium">
                  {billingInAddresses.name}
                </h5>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{billingInAddresses.email}</span>
                <span>&#8226;</span>
                <span>{billingInAddresses.tel}</span>
              </div>

              <div className="mt-6 flex flex-col gap-1 text-sm text-slate-600">
                <p>{billingInAddresses.street_address}</p>
                <div className="flex items-center gap-3">
                  <span>{billingInAddresses.city}</span>
                  <span>&#8226;</span>
                  <span>{billingInAddresses.state}</span>
                  <span>&#8226;</span>
                  <span>{billingInAddresses.country}</span>
                  <span>&#8226;</span>
                  <span>{billingInAddresses.zip}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-4">
          <h3 className="text-xl">Products</h3>
          {carts?.map((cart) => (
            <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
              <Image
                src={cart.product.product_images[0]}
                alt={cart.product.name}
                width={300}
                height={500}
                className="max-h-32 object-contain object-left"
              />

              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">
                    {cart.product.brand_name}
                  </span>
                  <Link
                    href={`/products/${cart.product.slug}/buy`}
                    className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border-1 border-slate-200 text-slate-400 hover:border-slate-500 hover:text-slate-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
                <h4 className="text-xl font-semibold">{cart.product.name}</h4>

                <div className="flex flex-wrap gap-2">
                  {cart.variation.key.split(" - ").map((variation, index) => (
                    <div
                      key={variation + index}
                      className="rounded-full border-1 border-slate-400 px-2 py-1 text-xs"
                    >
                      {variation.replace(":", ": ")}
                    </div>
                  ))}
                  <div className="rounded-full border-1 border-slate-400 px-2 py-1 text-xs">
                    {"quantity: " + cart.quantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* <div className="flex w-full flex-col gap-4">
          <h3 className="text-xl">Payment Methods</h3>
          <Button className="w-fit gap-3">
            <Coins className="h-6 w-6" />
            <span>Cash on Delivery</span>
          </Button>
        </div> */}
      </div>
      <Total>
        {!!shippingInAddresses && !!billingInAddresses && !!paymentMethod ? (
          loading ? (
            <Button disabled className="w-full rounded-full">
              <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </Button>
          ) : (
            <Button onClick={onPlaceOrder} className="w-full rounded-full">
              Payment
            </Button>
          )
        ) : (
          <Button disabled className="w-full cursor-not-allowed rounded-full">
            Payment
          </Button>
        )}
      </Total>
    </div>
  );
};

export default CartPaymentPage;
