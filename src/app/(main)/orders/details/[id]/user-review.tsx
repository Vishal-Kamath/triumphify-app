"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { invalidateProductReview, useProductReview } from "@/lib/products";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import { z } from "zod";

const reviewSchema = z.object({
  review_title: z
    .string()
    .max(100)
    .refine((val) => !!val.trim(), "Field is required"),
  review_description: z
    .string()
    .max(750)
    .refine((val) => !!val.trim(), "Field is required"),
  rating: z
    .number()
    .min(1)
    .max(5)
    .refine((val) => !!val, "Field is required"),
});
type ReviewFormType = z.infer<typeof reviewSchema>;

const OrderUserReview: FC<{ productId: string }> = ({ productId }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const form = useForm<ReviewFormType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review_title: "",
      review_description: "",
      rating: 5,
    },
  });

  const { data: review, isLoading } = useProductReview(productId);
  useEffect(() => {
    if (review) {
      form.setValue("review_title", review.review_title || "");
      form.setValue("review_description", review.review_description || "");
      form.setValue("rating", review.rating || 5);
    }
  }, [review]);

  const reviewExist =
    review !== undefined &&
    !!review &&
    review?.type !== "error" &&
    !isLoading &&
    !!review.review_title.trim() &&
    !!review.review_description.trim() &&
    !!review.rating;

  function onSubmit(values: ReviewFormType) {
    const method = reviewExist ? "put" : "post";
    setLoading(true);
    axios[method](
      `${process.env.ENDPOINT}/api/products/reviews/${productId}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    )
      .then((res) => {
        setLoading(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateProductReview(productId);
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  }

  const onDelete = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?",
    );
    if (!confirmDelete) return;
    setLoadingDelete(true);
    axios
      .delete(`${process.env.ENDPOINT}/api/products/reviews/${productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoadingDelete(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateProductReview(productId);
      })
      .catch((err) => {
        setLoadingDelete(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  };

  const formDataChanged =
    form.watch("review_title") !== review?.review_title ||
    form.watch("review_description") !== review?.review_description ||
    form.watch("rating") !== review?.rating;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-lg border-1 p-6"
      >
        <h3 className="font-medium">Leave us a review</h3>
        <Separator />
        <div className="flex gap-6 max-md:flex-col">
          <FormField
            control={form.control}
            name="review_title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black">Review Title</FormLabel>
                <FormControl>
                  <Input placeholder="Review title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-baseline justify-between py-1 text-black">
                  <p className="text-black">Rating</p>
                  <p className="text-xs font-light">{field.value} / 5</p>
                </FormLabel>
                <div
                  className={cn(
                    "flex h-10 items-center justify-evenly gap-3 rounded-md border-1",
                    field.value === 5
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-slate-200 bg-slate-50",
                  )}
                >
                  {[1, 2, 3, 4, 5].map((rating, index) =>
                    field.value >= rating ? (
                      <FaStar
                        key={index}
                        className="h-6 w-6 cursor-pointer text-yellow-400"
                        onClick={() => form.setValue("rating", rating)}
                      />
                    ) : (
                      <FaRegStar
                        key={index}
                        className="h-6 w-6 cursor-pointer text-yellow-400"
                        onClick={() => form.setValue("rating", rating)}
                      />
                    ),
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="review_description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex items-baseline justify-between">
                <p className="text-black">Review Description</p>
                <p
                  className={cn(
                    "text-xs font-light",
                    field.value.length > 750 ? "text-red-500" : "",
                  )}
                >
                  {field.value.length} / 750
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  maxLength={750}
                  placeholder="Review description..."
                  className="max-h-[12.5rem] min-h-[7.5rem]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {reviewExist ? (
          <div className="flex gap-3">
            {loading ? (
              <Button disabled className="ml-auto max-w-xs">
                <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                Please wait..
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                onClick={onDelete}
                className="w-full max-w-xs hover:bg-red-500 hover:text-white"
              >
                Delete
              </Button>
            )}

            {loading ? (
              <Button disabled className="max-w-xs">
                <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                Please wait..
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                className="w-full max-w-xs"
                disabled={loadingDelete || !formDataChanged}
              >
                Edit review
              </Button>
            )}
          </div>
        ) : loading ? (
          <Button disabled className="ml-auto w-full max-w-xs">
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button type="submit" className="ml-auto w-full max-w-xs">
            Submit review
          </Button>
        )}
      </form>
    </Form>
  );
};

export default OrderUserReview;
