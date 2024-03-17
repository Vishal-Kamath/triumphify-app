"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { invalidateAllCarts, useAllCart } from "@/lib/cart";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const AddToCartButton: FC<{ productId: string; variationId: string }> = ({
  productId,
  variationId,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [quantityLoading, setQuantityLoading] = useState(false);

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
      .post(
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
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateAllCarts();
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

    setdeleteLoading(true);
    axios
      .delete(`${process.env.ENDPOINT}/api/cart/${foundInCart?.id}`, {
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

  return foundInCart?.quantity ? (
    quantityLoading ? (
      <div className="flex h-10 w-full max-w-xs items-center justify-between rounded-full border-1 border-slate-300 px-3">
        <AiOutlineLoading className="h-4 w-4 animate-spin" />
      </div>
    ) : (
      <div className="flex h-10 w-full max-w-xs items-center justify-between rounded-full border-1 border-slate-300 px-3">
        <Plus
          onClick={handleUpdateQuantity("plus")}
          className="h-4 w-4 cursor-pointer text-slate-600"
        />
        <span>{foundInCart.quantity}</span>
        <Minus
          onClick={() =>
            foundInCart.quantity === 1
              ? handleRemovefromCart()
              : handleUpdateQuantity("minus")()
          }
          className="h-4 w-4 cursor-pointer text-slate-600"
        />
      </div>
    )
  ) : loading ? (
    <Button disabled className="w-full max-w-xs rounded-full">
      <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
      Please wait..
    </Button>
  ) : (
    <Button
      onClick={handleAddToCart}
      disabled={!productId || !variationId}
      className="w-full max-w-xs rounded-full"
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
