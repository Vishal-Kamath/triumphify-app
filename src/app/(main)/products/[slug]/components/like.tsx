"use client";

import { useToast } from "@/components/ui/use-toast";
import { useMe } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { invalidateWishlist, useWishlists } from "@/lib/wishlist";
import { isServer } from "@tanstack/react-query";
import axios from "axios";
import { RotateCw } from "lucide-react";
import { FC, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton: FC<{ productId: string; className?: string }> = ({
  productId,
  className,
}) => {
  const { toast } = useToast();
  const { data: wishlist, isLoading } = useWishlists();
  const [loading, setLoading] = useState(false);
  const { data, isLoading: userLoading, isFetched } = useMe();

  function handleAddToWishlist() {
    setLoading(true);
    axios
      .get(`${process.env.ENDPOINT}/api/wishlist/${productId}/add`, {
        withCredentials: true,
      })
      .then((res) => {
        invalidateWishlist();
        setLoading(false);
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

  function handleRemoveFromWishlist() {
    setLoading(true);
    axios
      .get(`${process.env.ENDPOINT}/api/wishlist/${productId}/remove`, {
        withCredentials: true,
      })
      .then((res) => {
        invalidateWishlist();
        setLoading(false);
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

  if (isLoading)
    return (
      <button
        disabled
        className={cn(
          className,
          "ml-auto flex h-8 w-8 items-center justify-center rounded-full border-1 border-slate-300 text-slate-400 hover:border-slate-700 hover:fill-red-600 hover:text-red-600",
        )}
      >
        <RotateCw className="h-4 w-4 animate-spin" />
      </button>
    );

  if (loading)
    return (
      <button
        disabled
        className={cn(
          className,
          "ml-auto flex h-8 w-8 items-center justify-center rounded-full border-1 border-slate-300 text-slate-400 hover:border-slate-700 hover:fill-red-600 hover:text-red-600",
        )}
      >
        <RotateCw className="h-4 w-4 animate-spin" />
      </button>
    );

  if (
    !userLoading &&
    isFetched &&
    !isServer &&
    data !== undefined &&
    data?.type === "error"
  ) {
    return null;
  }

  const exists = !!(
    wishlist &&
    Array.isArray(wishlist) &&
    wishlist?.find((product) => product?.id === productId)
  );

  return exists ? (
    <button
      onClick={handleRemoveFromWishlist}
      className={cn(
        className,
        "ml-auto flex h-8 w-8 items-center justify-center rounded-full border-1 border-slate-300 text-red-600 hover:border-slate-700",
      )}
    >
      <FaHeart className="text-re h-4 w-4" />
    </button>
  ) : (
    <button
      onClick={handleAddToWishlist}
      className={cn(
        className,
        "ml-auto flex h-8 w-8 items-center justify-center rounded-full border-1 border-slate-300 text-slate-400 hover:border-slate-700 hover:fill-red-600 hover:text-red-600",
      )}
    >
      <FaRegHeart className="h-4 w-4" />
    </button>
  );
};

export default LikeButton;
