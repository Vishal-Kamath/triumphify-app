import { Banner } from "@/@types/banner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBanners = (
  type: "main" | "sub",
): Promise<Banner[] & { type: string }> =>
  axios
    .get(`${process.env.ENDPOINT}/api/banners/${type}`)
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useBanners = (type: "main" | "sub") =>
  useQuery({
    queryKey: ["banners", type],
    queryFn: () => getBanners(type),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });
