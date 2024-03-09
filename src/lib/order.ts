import { Order } from "@/@types/order";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllOrders = (
  type: "history" | "cancelled" | "returned",
): Promise<Order[] & { type: string }> =>
  axios
    .get<{ data: Order[] & { type: string } }>(
      `${process.env.ENDPOINT}/api/orders/${type}`,
      { withCredentials: true },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useOrders = (type: "history" | "cancelled" | "returned") =>
  useQuery({
    queryKey: ["orders", type],
    queryFn: () => getAllOrders(type),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });
