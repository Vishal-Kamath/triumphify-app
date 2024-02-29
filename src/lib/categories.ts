import { Category } from "@/@types/categories";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllCategories = (): Promise<Category[] & { type?: string }> =>
  axios
    .get<{ data: Category[]; type: "success" | "error" }>(
      `${process.env.ENDPOINT}/api/categories/`,
      { withCredentials: true },
    )
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

const getCategory = (slug: string): Promise<Category & { type?: string }> =>
  axios
    .get(`${process.env.ENDPOINT}/api/categories/${slug}`, {
      withCredentials: true,
    })
    .then((res) => res.data.data)
    .catch((err) => err.response.data);

export const useCategory = (slug: string) =>
  useQuery({
    queryKey: ["categories", slug],
    queryFn: () => getCategory(slug),
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });
