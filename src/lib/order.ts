import { Order, OrderDetails } from "@/@types/order";
import { queryClient } from "@/components/provider/reactquery.provider";
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

interface GetOrderById {
  order: Order;
  order_details: OrderDetails;
  all_orders: Order[];
}
const getOrder = (id: string): Promise<GetOrderById & { type: string }> =>
  axios
    .get<{ data: GetOrderById & { type: string } }>(
      `${process.env.ENDPOINT}/api/orders/details/${id}`,
      { withCredentials: true },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useOrder = (id: string) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

export const invalidateAllOrders = () => {
  queryClient.invalidateQueries({
    queryKey: ["orders"],
  });
};

export const invalidateOrder = (id: string) => {
  queryClient.invalidateQueries({
    queryKey: ["orders", id],
  });
};
