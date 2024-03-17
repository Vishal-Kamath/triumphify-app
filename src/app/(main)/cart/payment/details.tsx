import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAddresses } from "@/lib/address";
import { useAllCart } from "@/lib/cart";
import { useAddressState } from "@/lib/hooks/use-address";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const PaymentDetailsPopup: FC<{ paymentMethod: string }> = ({
  paymentMethod,
}) => {
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
        router.push("/account/orders");
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
    <>
      <div className="flex w-full flex-col gap-4">
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
              <h5 className="text-lg font-medium">{billingInAddresses.name}</h5>
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
        {carts?.map((cart, index) => (
          <div
            key={cart.id + index}
            className="flex gap-4 rounded-xl border border-slate-200 p-4"
          >
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
      </div>

      {!!shippingInAddresses && !!billingInAddresses ? (
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
    </>
  );
};
export default PaymentDetailsPopup;
