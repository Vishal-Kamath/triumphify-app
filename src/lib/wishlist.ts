import { Product } from "@/@types/product";
import { queryClient } from "@/components/provider/reactquery.provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getWishlists = (): Promise<Product[] & { type: string }> =>
  axios
    .get<{ data: Product[] & { type: string } }>(
      `${process.env.ENDPOINT}/api/wishlist/`,
      {
        withCredentials: true,
      },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useWishlists = () =>
  useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlists,
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

export const invalidateWishlist = () => {
  queryClient.invalidateQueries({
    queryKey: ["wishlist"],
  });
};
