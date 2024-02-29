"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
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
        router.push("/cart");
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

  console.log(productId, variationId);

  return loading ? (
    <Button disabled className="w-full rounded-full">
      <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
      Please wait..
    </Button>
  ) : (
    <Button
      onClick={handleAddToCart}
      disabled={!productId || !variationId}
      className="w-full rounded-full"
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
