import { Banner } from "@/@types/banner";
import { ProductWithDetails } from "@/@types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBanners = (
  type: "main" | "sub",
): Promise<Banner[] & { type: string }> =>
  axios
    .get(`${process.env.ENDPOINT}/api/banners/${type}`)
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

const getBannersLinkedContent = (): Promise<
  { product?: ProductWithDetails | undefined; blog?: Blog | undefined } & {
    type: string;
  }
> =>
  axios
    .get(`${process.env.ENDPOINT}/api/banners/linked_content`)
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useBanners = (type: "main" | "sub") =>
  useQuery({
    queryKey: ["banners", type],
    queryFn: () => getBanners(type),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

export const useBannersLinkedContent = () =>
  useQuery({
    queryKey: ["banners", "linked_content"],
    queryFn: getBannersLinkedContent,
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });