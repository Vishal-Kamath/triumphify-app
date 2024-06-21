import { Order } from "@/@types/order";
import { cn } from "@/lib/utils";
import { dateFormater } from "@/utils/dateFormater";
import { Check, Clock4 } from "lucide-react";
import { FC } from "react";

const OrderStatus: FC<{ order?: Order }> = ({ order }) => {
  if (!order) return null;
  const currentStatusesArray = !order.returned
    ? ["pending", "confirmed", "out for delivery", "delivered"]
    : ["return approved", "out for pickup", "picked up", "refunded"];

  const currentStep = currentStatusesArray.indexOf(order.status);

  return (
    <div className="flex w-full flex-col gap-6 px-3">
      <div className="flex gap-2">
        <h3 className="font-medium">Order Status:</h3>
        {order.cancelled ? (
          <h3 className="font-semibold text-red-600">Cancelled</h3>
        ) : null}
      </div>

      <div
        className={cn(
          "overflow-x-auto pb-6 scrollbar-thin",
          order.cancelled ? "opacity-50" : "",
        )}
      >
        <div className="mx-auto flex h-fit w-full min-w-[32rem] max-w-3xl items-start  text-[10px]">
          {currentStatusesArray.map((step, index) => (
            <div
              className="step-item relative flex w-full flex-col items-center justify-center gap-1"
              key={step + index}
            >
              {/* dash */}
              <div
                className={cn(
                  "absolute right-1/2 top-[8px] h-[2px] w-full -translate-y-1/2",
                  index === 0 && "hidden",
                  index <= currentStep ? "bg-purple-500" : "bg-slate-700",
                )}
              ></div>

              {/* content */}
              <div
                className={cn(
                  "z-10 flex h-4 w-4 items-center justify-center rounded-full bg-purple-900 text-xs font-bold",
                  index <= currentStep && "bg-purple-500 text-white",
                  index > currentStep && "bg-slate-700",
                )}
              >
                {index <= currentStep ? (
                  <Check strokeWidth={5} className="h-[0.6rem] w-[0.6rem]" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="px-[2px] text-center text-gray-400">{step}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
        <Clock4 className="h-3 w-3" />
        <span>
          {dateFormater(
            new Date(order.updated_at ? order.updated_at : order.created_at),
          )}
        </span>
      </div>
    </div>
  );
};

export default OrderStatus;
