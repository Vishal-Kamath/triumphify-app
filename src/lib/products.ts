import {
  Product,
  ProductReview,
  ProductReviewStats,
  ProductWithDetails,
  Showcase,
} from "@/@types/product";
import { queryClient } from "@/components/provider/reactquery.provider";
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

const getAllProductReviews = (
  id: string,
): Promise<ProductReview[] & { type: string }> =>
  axios
    .get<{ data: ProductReview[] & { type: string } }>(
      `${process.env.ENDPOINT}/api/products/reviews/${id}/all`,
      {
        withCredentials: true,
      },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useProductReviews = (id: string) =>
  useQuery({
    queryKey: ["products", "reviews", "all", id],
    queryFn: () => getAllProductReviews(id),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

const getAllProductReviewsStats = (
  id: string,
): Promise<ProductReviewStats & { type: string }> =>
  axios
    .get<{ data: ProductReviewStats & { type: string } }>(
      `${process.env.ENDPOINT}/api/products/reviews/${id}/stats`,
      {
        withCredentials: true,
      },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useProductReviewsStats = (id: string) =>
  useQuery({
    queryKey: ["products", "reviews", "stats", id],
    queryFn: () => getAllProductReviewsStats(id),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

const getProductReview = (
  id: string,
): Promise<ProductReview & { type: string }> =>
  axios
    .get<{ data: ProductReview & { type: string } }>(
      `${process.env.ENDPOINT}/api/products/reviews/${id}`,
      {
        withCredentials: true,
      },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useProductReview = (id: string) =>
  useQuery({
    queryKey: ["products", "reviews", id],
    queryFn: () => getProductReview(id),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

export const invalidateProductReview = (id: string) => {
  queryClient.invalidateQueries({
    queryKey: ["products", "reviews", id],
  });
};
