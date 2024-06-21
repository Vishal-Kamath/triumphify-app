import { ProductReview } from "@/@types/product";
import { AvatarElement } from "@/components/header/user-section";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { dateFormater } from "@/utils/dateFormater";
import { FC } from "react";
import { FaStar } from "react-icons/fa";

const ReviewComponent: FC<{ review: ProductReview }> = ({ review }) => {
  return (
    <div className="flex w-full flex-col gap-9">
      <div className="flex items-start gap-6">
        <AvatarElement
          image={review.user_image}
          username={review.user_username}
          className="h-14 w-14"
        />
        <div className="flex flex-col gap-1">
          <h4 className="text-xl font-semibold">{review.user_username}</h4>
          <p className="text-xs text-slate-400">
            on{" "}
            {dateFormater(
              new Date(review.updated_at || review.created_at),
              true,
              true,
            )}
          </p>
          <div className="mt-2 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating, index) => (
              <FaStar
                key={index}
                className={cn(
                  "h-4 w-4",
                  rating <= review.rating
                    ? "text-yellow-400"
                    : "text-slate-200",
                )}
              />
            ))}
          </div>
          <h5 className="mt-6 text-[16px] font-medium text-slate-200 max-lg:hidden">
            {review.review_title}
          </h5>
          <p className="text-sm text-slate-400 max-lg:hidden">
            {review.review_description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:hidden">
        <h5 className="text-[16px] font-medium text-slate-200">
          {review.review_title}
        </h5>
        <p className="mt-1 text-sm text-slate-400">
          {review.review_description}
        </p>
      </div>
      <Separator className="bg-slate-600" />
    </div>
  );
};

export default ReviewComponent;
