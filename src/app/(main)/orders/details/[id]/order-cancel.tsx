import { Order } from "@/@types/order";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { z } from "zod";

const orderCancelSchema = z.object({
  reason: z
    .string()
    .max(750)
    .refine((val) => !!val.trim(), "Field is required"),
});
type OrderCancelFormType = z.infer<typeof orderCancelSchema>;

const OrderCancelForm: FC<{
  order: Order;
  isCancelledRequested: string | boolean;
}> = ({ order, isCancelledRequested }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const form = useForm<OrderCancelFormType>({
    resolver: zodResolver(orderCancelSchema),
    defaultValues: {
      reason: "",
    },
  });

  function onSubmit(values: OrderCancelFormType) {
    setLoading(true);
    axios
      .post(
        `${process.env.ENDPOINT}/api/orders/request/${order.id}/cancel`,
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

  return isCancelledRequested ? (
    <span className="text-xs text-slate-500">
      Your cancellation request is already submitted. Please wait for the
      approval from the seller{" "}
      <Link
        href={`/tickets/${isCancelledRequested}?redirect=${pathname}`}
        className="text-blue-500 underline hover:text-blue-700"
      >
        View Request
      </Link>
    </span>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative isolate flex flex-col gap-6 overflow-hidden rounded-lg border-1 border-red-200 p-6"
      >
        <div
          style={{
            backgroundImage: "url('/cancel-bg.svg')",
            backgroundSize: "4.5rem",
            backgroundRepeat: "repeat",
          }}
          className="absolute left-0 top-0 -z-10 h-full w-full opacity-[3%]"
        ></div>
        <h3 className="font-medium text-red-700">Cancellation form</h3>
        <p className="text-xs text-slate-500">
          Please mention the reason for order cancellation below.{" "}
          <strong>Note</strong> that once the form is submited it cannot be
          updated. So please fill carefully
        </p>
        <Separator className="bg-red-200" />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex items-baseline justify-between">
                <p className="text-black">Reason for Cancellation</p>
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
                  placeholder="description..."
                  className="max-h-[12.5rem] min-h-[7.5rem] border-red-200 bg-white"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled className="ml-auto w-full md:max-w-[15rem]">
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button type="submit" className="ml-auto w-full md:max-w-[15rem]">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default OrderCancelForm;
