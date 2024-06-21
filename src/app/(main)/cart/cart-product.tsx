import { Cart } from "@/@types/cart";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { invalidateAllCarts } from "@/lib/cart";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ExternalLink, Minus, Plus, RotateCw, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

const CartProduct: FC<{ cart: Cart }> = ({ cart }) => {
  const { toast } = useToast();
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [quantityLoading, setQuantityLoading] = useState(false);

  function handleRemovefromCart() {
    const userWantsToDeleteCartItem = confirm(
      `Are you sure you want to REMOVE "${cart.product.name}" from cart?`,
    );
    if (!userWantsToDeleteCartItem) return;

    setdeleteLoading(true);
    axios
      .delete(`${process.env.ENDPOINT}/api/cart/${cart.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setdeleteLoading(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateAllCarts();
      })
      .catch((err) => {
        setdeleteLoading(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  }

  const handleUpdateQuantity = (action: "plus" | "minus") => () => {
    const quantity = action === "plus" ? cart.quantity + 1 : cart.quantity - 1;
    if (!quantity) return;

    setQuantityLoading(true);
    axios
      .patch(
        `${process.env.ENDPOINT}/api/cart/${cart.id}`,
        {
          quantity,
        },
        { withCredentials: true },
      )
      .then((res) => {
        setQuantityLoading(false);
        invalidateAllCarts();
      })
      .catch((err) => {
        setQuantityLoading(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  };

  const variation = cart.variation.key
    .split(" - ")
    .map((variation) => variation.replace(":", "="))
    .join("&");

  return (
    <div className="flex flex-col gap-9 border-b-1 border-slate-700 px-2 py-6">
      <Link
        href={`/products/${cart.product.slug}?${variation}`}
        className="flex gap-6 md:gap-4"
      >
        <Image
          src={cart.product.product_images[0]}
          alt={cart.product.name}
          width={300}
          height={500}
          className="max-h-32 w-[7.5rem] object-contain object-left md:min-w-48"
        />

        <div className="flex w-full flex-col gap-2">
          <span className="text-sm text-slate-400">
            {cart.product.brand_name}
          </span>

          <h4 className="text-xl font-semibold">{cart.product.name}</h4>

          <div className="flex flex-col gap-4">
            <p className="text-xs text-slate-500">
              {cart.product.description.length > 100
                ? cart.product.description.slice(0, 200) + "..."
                : cart.product.description}
            </p>

            <div className="flex flex-col gap-1">
              {cart.variation.key.split(" - ").map((variation, index) => (
                <div key={variation + index} className="flex gap-2">
                  <span className="text-xs text-slate-300">
                    {variation.split(":")[0]}:
                  </span>
                  <span className="text-xs text-slate-500">
                    {variation.split(":")[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex w-full items-center gap-6 md:gap-4">
        <div className="min-w-[7.5rem] md:min-w-48">
          {quantityLoading ? (
            <div className="flex h-9 w-full items-center justify-center rounded-lg border-1 border-slate-600 text-xs">
              <RotateCw className="h-3 w-3 animate-spin" />
            </div>
          ) : (
            <div className="flex h-9 w-full items-center justify-between gap-3 overflow-hidden rounded-lg border-1 border-slate-600 text-xs">
              <button
                className="m-0 flex h-9 w-full cursor-pointer items-center justify-center border-r-1 border-slate-600 bg-slate-900 p-0 outline-none hover:bg-sky-800"
                onClick={handleUpdateQuantity("plus")}
              >
                <Plus className="h-3 w-3 cursor-pointer" />
              </button>
              <div className="flex w-9 items-center justify-center md:w-full">
                {cart.quantity}
              </div>
              {cart.quantity === 1 ? (
                <button
                  className="m-0 flex h-9 w-full cursor-pointer items-center justify-center border-l-1 border-slate-600 bg-slate-900 p-0 outline-none hover:bg-red-800"
                  onClick={handleRemovefromCart}
                >
                  <Trash2 className="h-3 w-3 cursor-pointer" />
                </button>
              ) : (
                <button
                  className="m-0 flex h-9 w-full cursor-pointer items-center justify-center border-l-1 border-slate-600 bg-slate-900 p-0 outline-none hover:bg-sky-800"
                  onClick={handleUpdateQuantity("minus")}
                >
                  <Minus className="h-3 w-3 cursor-pointer" />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex w-full gap-4">
          <button className="text-sm text-slate-300 hover:text-white hover:underline hover:underline-offset-2">
            Save for later
          </button>
          <Separator orientation="vertical" className="h-6 bg-slate-500" />
          <button
            onClick={handleRemovefromCart}
            className="text-sm text-slate-300 hover:text-red-400 hover:underline hover:underline-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
