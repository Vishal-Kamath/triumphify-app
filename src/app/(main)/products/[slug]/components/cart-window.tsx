import { useToast } from "@/components/ui/use-toast";
import { invalidateAllCarts, useAllCart } from "@/lib/cart";
import axios from "axios";
import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface CartWindowProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
  variationId: string;

  image: string;
  name: string;
}
const CartWindow: FC<CartWindowProps> = ({
  open,
  setOpen,
  productId,
  variationId,
  image,
  name,
}) => {
  const { toast } = useToast();
  const [quantityLoading, setQuantityLoading] = useState(false);

  const { data: carts } = useAllCart();
  const foundInCart = Array.isArray(carts)
    ? carts?.find(
        (cart) =>
          cart.product.id === productId && cart.variation.id === variationId,
      )
    : undefined;

  function handleRemovefromCart() {
    const userWantsToDeleteCartItem = confirm(
      `Are you sure you want to REMOVE "${foundInCart?.product.name}" from cart?`,
    );
    if (!userWantsToDeleteCartItem) return;

    setQuantityLoading(true);
    axios
      .delete(`${process.env.ENDPOINT}/api/cart/${foundInCart?.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setQuantityLoading(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
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
  }

  const handleUpdateQuantity = (action: "plus" | "minus") => () => {
    if (!foundInCart) return;
    const quantity =
      action === "plus" ? foundInCart.quantity + 1 : foundInCart.quantity - 1;
    if (!quantity) return;

    setQuantityLoading(true);
    axios
      .patch(
        `${process.env.ENDPOINT}/api/cart/${foundInCart.id}`,
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

  if (!foundInCart) return null;
  return open ? (
    <div
      id="cartwindow"
      className="fixed left-0 top-0 z-50 h-full min-h-screen w-full bg-slate-950/40 backdrop-blur-sm"
    >
      <div className="fixed bottom-4 right-4 flex w-full max-w-md flex-col items-end gap-3">
        <button
          onClick={() => setOpen(false)}
          className="w-fit border-b-2 border-transparent text-sm font-semibold hover:border-slate-200"
        >
          Close
        </button>
        <div className="flex w-full flex-col gap-5 rounded-md bg-slate-200 p-3 py-4">
          <div className="flex gap-3">
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="h-12 w-12 rounded-sm border-2 border-slate-700 object-cover"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check strokeWidth={2} className="h-[0.6rem] w-[0.6rem]" />
                </div>

                <span className="text-[16px] font-medium text-green-500">
                  Added to Cart
                </span>
              </div>
              <p className="truncate text-xs font-semibold text-slate-700">
                {name}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/cart"
              className="flex h-12 w-1/2 items-center justify-center rounded-sm bg-purple-500 px-4 text-white"
            >
              Cart
            </Link>
            {quantityLoading ? (
              <div className="group flex h-12 w-full items-center justify-evenly gap-3 rounded-md border-2 border-slate-400 text-slate-900">
                <AiOutlineLoading className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <div className="group flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-md border-2 border-slate-400 text-slate-900">
                <button
                  onClick={handleUpdateQuantity("plus")}
                  className="flex h-12 w-full items-center justify-center bg-slate-300 px-3 py-2 text-slate-600 hover:bg-purple-300 hover:text-purple-700"
                >
                  <Plus className="h-4 w-4 cursor-pointer" />
                </button>
                <span className="w-12 flex-shrink-0 text-center">
                  {foundInCart.quantity}
                </span>
                <button
                  onClick={() =>
                    foundInCart.quantity === 1
                      ? handleRemovefromCart()
                      : handleUpdateQuantity("minus")()
                  }
                  className="flex h-12 w-full items-center justify-center bg-slate-300 px-3 py-2 text-slate-600 hover:bg-purple-300 hover:text-purple-700"
                >
                  <Minus className="h-4 w-4 cursor-pointer" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CartWindow;
