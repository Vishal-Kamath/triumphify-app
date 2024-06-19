"use client";

import { FC, useState } from "react";
import Total from "../total";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight, MoveLeft, Plus } from "lucide-react";
import { useAddressState } from "@/lib/hooks/use-address";
import AddressDropdown from "./addressDropdown";
import { useAddresses } from "@/lib/address";
import { useToast } from "@/components/ui/use-toast";

const UserCartAddress: FC = () => {
  const { toast } = useToast();
  const { data: addresses } = useAddresses();

  const formatedAddresses = Array.isArray(addresses)
    ? addresses.map((address) => ({
        id: address.id,
        title: address.name,
        content: [
          address.street_address,
          address.city,
          address.state,
          address.country,
          address.zip,
        ].join(" "),
      }))
    : [];

  const [shipping, setShipping] = useAddressState("shippingAddress");
  const shippingInAddresses = formatedAddresses
    ? formatedAddresses.find((addr) => addr.id === shipping)
    : undefined;

  const [billing, setBilling] = useAddressState("billingAddress");
  const billingInAddresses = formatedAddresses
    ? formatedAddresses.find((addr) => addr.id === billing)
    : undefined;

  const handleSetShippingAddress = (id: string) => {
    const address = addresses && addresses.find((addr) => addr.id === id);
    if (!address) return;

    setShipping(address.id);
  };

  const handleSetBillingAddress = (id: string) => {
    const address = addresses && addresses.find((addr) => addr.id === id);
    if (!address) return;

    setBilling(address.id);
  };

  const fillAllDetails = () => {
    toast({
      title: "Warning",
      description: "Please fill all the details",
      variant: "warning",
    });
  };

  // dropdown open logic
  const [shippingOpen, setShippingOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);

  const openAndCloseShipping = (action: "open" | "close") => {
    if (action === "open") {
      setShippingOpen(true);
      setBillingOpen(false);
    }
    if (action === "close") {
      setShippingOpen(false);
    }
  };

  const openAndCloseBilling = (action: "open" | "close") => {
    if (action === "open") {
      setBillingOpen(true);
      setShippingOpen(false);
    }
    if (action === "close") {
      setBillingOpen(false);
    }
  };

  return (
    <div className="flex h-full gap-6 max-md:flex-col">
      <div className="flex w-full flex-col gap-6">
        <div className="flex justify-between gap-3">
          <Link
            href="/cart"
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
          <h2 className="text-xl font-semibold text-slate-300">
            Select shipping and billing address
          </h2>
          <p className="text-justify text-sm text-gray-500">
            Please fill in both the billing and shipping addresses accurately to
            ensure timely delivery. Contact our support team for assistance.
            Thank you for choosing Triumphify!
          </p>
        </div>

        <div className="mt-6 flex w-full flex-col gap-6 lg:flex-row">
          <AddressDropdown
            main={
              shippingInAddresses || {
                title: "Shipping Address",
                content: "Select a shipping address",
              }
            }
            title="Shipping Address"
            options={formatedAddresses}
            setAddress={handleSetShippingAddress}
            open={shippingOpen}
            openAndClose={openAndCloseShipping}
          />
          <AddressDropdown
            main={
              billingInAddresses || {
                title: "Billing Address",
                content: "Select a billing address",
              }
            }
            title="Billing Address"
            options={formatedAddresses}
            setAddress={handleSetBillingAddress}
            open={billingOpen}
            openAndClose={openAndCloseBilling}
          />
        </div>
        <Link
          href={`/account/address/add?redirect=${encodeURIComponent(
            "/cart/address",
          )}`}
          className="mt-6 flex justify-between border-b-1 border-slate-500 p-4 hover:border-slate-400"
        >
          <span>Add a new Address</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <Total>
        {!!shippingInAddresses && !!billingInAddresses ? (
          <Link
            href="/cart/payment"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full rounded-md hover:bg-purple-900",
            )}
          >
            Continue
          </Link>
        ) : (
          <Button
            onClick={fillAllDetails}
            className="w-full cursor-not-allowed rounded-md bg-slate-700"
          >
            Continue
          </Button>
        )}
      </Total>
    </div>
  );
};

export default UserCartAddress;
