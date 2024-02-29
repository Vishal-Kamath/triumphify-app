import { Product, ProductWithDetails, Showcase } from "@/@types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProduct = (slug: string): Promise<Product & { type: string }> =>
  axios
    .get<{ data: Product & { type: string } }>(
      `${process.env.ENDPOINT}/api/products/details/${slug}`,
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useProduct = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProduct(slug),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

const getProductWithDetails = (
  slug: string,
): Promise<ProductWithDetails & { type: string }> =>
  axios
    .get<{ data: ProductWithDetails & { type: string } }>(
      `${process.env.ENDPOINT}/api/products/details/${slug}/buy`,
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useProductWithDetails = (slug: string) =>
  useQuery({
    queryKey: ["products", slug, "details"],
    queryFn: () => getProductWithDetails(slug),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

const getShowcases = (slug: string): Promise<Showcase[] & { type: string }> =>
  axios
    .get<{ data: Showcase[] & { type: string } }>(
      `${process.env.ENDPOINT}/api/products/showcase/${slug}`,
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useShowcases = (slug: string) =>
  useQuery({
    queryKey: ["products", slug, "showcase"],
    queryFn: () => getShowcases(slug),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });
