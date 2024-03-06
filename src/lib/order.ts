import { Order } from "@/@types/order";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllOrders = (): Promise<Order & { type: string }> =>
  axios
    .get<{ data: Order & { type: string } }>(
      `${process.env.ENDPOINT}/api/orders`,
      { withCredentials: true },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });
