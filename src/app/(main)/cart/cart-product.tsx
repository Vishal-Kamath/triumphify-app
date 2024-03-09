import { Cart } from "@/@types/cart";
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
            href={`/products/${cart.product.slug}/buy?${variation}`}
            className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border-1 border-slate-200 text-slate-400 hover:border-slate-500 hover:text-slate-600"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
          {deleteLoading ? (
            <button
              disabled
              className="flex h-6 w-6 items-center justify-center rounded-full border-1 border-slate-200 text-slate-400 hover:border-red-500 hover:text-red-600"
            >
              <RotateCw className="h-4 w-4 animate-spin" />
            </button>
          ) : (
            <button
              onClick={handleRemovefromCart}
              className="flex h-6 w-6 items-center justify-center rounded-full border-1 border-slate-200 text-slate-400 hover:border-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
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

          {quantityLoading ? (
            <div className="flex w-20 items-center justify-center rounded-full border-1 border-slate-400 px-2 py-1 text-xs">
              <RotateCw className="h-3 w-3 animate-spin" />
            </div>
          ) : (
            <div className="flex w-20 items-center justify-between gap-3 rounded-full border-1 border-slate-400 px-2 py-1 text-xs">
              <button
                className="m-0 border-none bg-transparent p-0 outline-none"
                onClick={handleUpdateQuantity("plus")}
              >
                <Plus className="h-3 w-3 cursor-pointer" />
              </button>
              {cart.quantity}
              <button
                className={cn(
                  "m-0 border-none bg-transparent p-0 outline-none",
                  cart.quantity === 1
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer",
                )}
                onClick={handleUpdateQuantity("minus")}
                disabled={cart.quantity === 1}
              >
                <Minus className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
