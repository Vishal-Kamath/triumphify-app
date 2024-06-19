"use client";

import { Separator } from "@/components/ui/separator";
import {
  useProductReviews,
  useProductReviewsStats,
  useProductWithDetails,
} from "@/lib/products";
import { FC } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReviewComponent from "./review-component";
import { numberFormater } from "@/utils/numberFormater";
import { useParams } from "next/navigation";

const ProductReviewSection: FC = () => {
  const slug = useParams()["slug"] as string;
  const { data: product, isLoading } = useProductWithDetails(slug);

  if (!product || isLoading) return null;
  return <ProductReview productId={product.id} />;
};

const ProductReview: FC<{ productId: string }> = ({ productId }) => {
  const { data: reviews, isLoading } = useProductReviews(productId);
  const { data: reviewsStats, isLoading: statsIsLoading } =
    useProductReviewsStats(productId);

  if (!reviews) return null;
  return (
    <div className="padding-x flex flex-col gap-9 text-white">
      <div className="flex justify-between gap-6">
        <h3 className="text-3xl font-semibold">Customer reviews</h3>
      </div>

      <div className="flex gap-9 max-lg:flex-col">
        {/* Total reviews */}
        <div className="flex w-full flex-col gap-4 border-slate-600 max-lg:border-b-2 max-lg:pb-9 lg:border-r-2 lg:pr-9">
          <h4 className="text-lg font-medium text-slate-400">Total Reviews</h4>
          <p className="text-3xl font-semibold">
            {numberFormater(reviewsStats?.total_reviews || 0)}
          </p>
        </div>

        {/* Average rating */}
        <div className="flex w-full flex-col gap-4 border-slate-600 max-lg:border-b-2 max-lg:pb-9 lg:border-r-2 lg:pr-9">
          <h4 className="text-lg font-medium text-slate-400">Average rating</h4>
          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-semibold">
              {reviewsStats?.average_rating?.toFixed(1)}
            </p>
            {[1, 2, 3, 4, 5].map((rating, index) =>
              rating <=
              Math.floor(
                Number(reviewsStats?.average_rating?.toFixed(1)) || 0,
              ) ? (
                <FaStar key={index} className="h-6 w-6 text-yellow-400" />
              ) : rating ===
                Math.ceil(
                  Number(reviewsStats?.average_rating?.toFixed(1)) || 0,
                ) ? (
                <FaStarHalfAlt
                  key={index}
                  className="h-6 w-6 text-yellow-400"
                />
              ) : (
                <FaRegStar key={index} className="h-6 w-6 text-yellow-400" />
              ),
            )}
          </div>
        </div>

        {/* Total 5 */}
        <div className="flex w-full flex-col gap-1">
          {reviewsStats?.ratings.map((review, index) => (
            <div
              key={review.rating + index}
              className="flex items-center gap-2 text-xs"
            >
              <p>{review.rating}</p>
              <div className="flex h-2 w-full justify-start rounded-full bg-slate-900">
                <div
                  style={{
                    width: `${(review.count / reviewsStats.total_reviews) * 100}%`,
                  }}
                  className="rounded-full bg-green-600"
                ></div>
              </div>
              <p className="w-9">{numberFormater(review.count)}</p>
            </div>
          ))}
        </div>
      </div>
      <Separator className="bg-slate-600" />
      {reviews.map((review, index) => (
        <ReviewComponent key={review.id + index} review={review} />
      ))}
      {!reviews.length ? (
        <div className="flex h-48 items-center justify-center text-xl font-semibold text-gray-400">
          No reviews yet
        </div>
      ) : null}
    </div>
  );
};

export default ProductReviewSection;
