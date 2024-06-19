"use client";

import { useToast } from "@/components/ui/use-toast";
import { invalidateAllCarts, useAllCart } from "@/lib/cart";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Minus, Plus } from "lucide-react";
import CartWindow from "./cart-window";

const AddToCartButton: FC<{ productId: string; variationId: string }> = ({
  productId,
  variationId,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quantityLoading, setQuantityLoading] = useState(false);

  const [open, setOpen] = useState(true);
  const [CartWindowName, setCartWindowName] = useState("");
  const [CartWindowImage, setCartWindowImage] = useState("");
  const [CartWindowVariationId, setCartWindowVariationId] = useState("");

  useEffect(() => {
    console.log("CE", CartWindowVariationId);
  }, [CartWindowVariationId]);

  const { data: carts } = useAllCart();
  const foundInCart = Array.isArray(carts)
    ? carts?.find(
        (cart) =>
          cart.product.id === productId && cart.variation.id === variationId,
      )
    : undefined;

  const handleAddToCart = () => {
    if (!productId || !variationId) return;
    setLoading(true);
    axios
      .post<{
        data: {
          name: string;
          variationId: string;
          image: string;
        };
      }>(
        `${process.env.ENDPOINT}/api/cart`,
        {
          productId,
          variationId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        setLoading(false);
        setCartWindowImage(res.data.data.image);
        setCartWindowName(res.data.data.name);
        setCartWindowVariationId(res.data.data.variationId);
        setOpen(true);
        invalidateAllCarts();
        console.log(res.data);
        // router.push("/cart");
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  };

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

  return (
    <>
      {loading ? (
        <button
          disabled
          className="group flex h-12 items-center justify-center gap-3 rounded-md bg-slate-700 hover:bg-slate-600"
        >
          <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
          Please wait..
        </button>
      ) : foundInCart?.variation.id === variationId ? (
        quantityLoading ? (
          <div className="group flex h-12 w-full items-center justify-evenly gap-3 rounded-md border-2 border-slate-700 px-4 text-slate-900">
            <AiOutlineLoading className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <div className="group flex w-full items-center justify-center gap-3 overflow-hidden rounded-md border-2 border-slate-700 p-0 text-white">
            <button
              onClick={handleUpdateQuantity("plus")}
              className="flex h-12 w-full items-center justify-center bg-slate-700 text-slate-200 hover:bg-purple-600 hover:text-purple-300"
            >
              <Plus className="h-4 w-4 cursor-pointer" />
            </button>
            <span className="w-full text-center">{foundInCart.quantity}</span>
            <button
              onClick={() =>
                foundInCart.quantity === 1
                  ? handleRemovefromCart()
                  : handleUpdateQuantity("minus")()
              }
              className="flex h-12 w-full items-center justify-center bg-slate-700 text-slate-200 hover:bg-purple-600 hover:text-purple-300"
            >
              <Minus className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        )
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={!productId || !variationId}
          className="group flex h-12 items-center justify-center gap-3 rounded-md bg-slate-700 hover:bg-slate-600"
        >
          Add to Cart
        </button>
      )}
      <CartWindow
        open={open}
        setOpen={setOpen}
        productId={productId}
        variationId={CartWindowVariationId}
        image={CartWindowImage}
        name={CartWindowName}
      />
    </>
  );
};

export default AddToCartButton;
