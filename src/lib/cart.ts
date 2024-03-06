import { Cart } from "@/@types/cart";
import { queryClient } from "@/components/provider/reactquery.provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllCart = (): Promise<Cart[] & { type?: string }> =>
  axios
    .get(`${process.env.ENDPOINT}/api/cart`, {
      withCredentials: true,
    })
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useAllCart = () =>
  useQuery({
    queryKey: ["cart"],
    queryFn: getAllCart,
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

export const invalidateAllCarts = () => {
  queryClient.invalidateQueries({
    queryKey: ["cart"],
  });
};
