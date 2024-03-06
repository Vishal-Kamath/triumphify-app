import { Address } from "@/@types/address";
import { queryClient } from "@/components/provider/reactquery.provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllAddresses = (): Promise<Address[] & { type: string }> =>
  axios
    .get<{ data: Address[] & { type: string } }>(
      `${process.env.ENDPOINT}/api/address`,
      {
        withCredentials: true,
      },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useAddresses = () =>
  useQuery({
    queryKey: ["address"],
    queryFn: getAllAddresses,
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

const getAllAddress = (id: string): Promise<Address & { type: string }> =>
  axios
    .get<{ data: Address & { type: string } }>(
      `${process.env.ENDPOINT}/api/address/${id}`,
      {
        withCredentials: true,
      },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useAddress = (id: string) =>
  useQuery({
    queryKey: ["address", id],
    queryFn: () => getAllAddress(id),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

export const invalidateAddresses = () => {
  queryClient.invalidateQueries({
    queryKey: ["address"],
  });
};
