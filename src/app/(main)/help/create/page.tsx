"use client";

import { NotificationType } from "@/@types/notification";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { z } from "zod";

const zticket = z.object({
  title: z
    .string()
    .max(100)
    .refine((val) => !!val.trim(), "Field is required"),
  description: z
    .string()
    .max(750)
    .refine((val) => !!val.trim(), "Field is required"),
});

export type zTicket = z.infer<typeof zticket>;

const CreateTicketPage: FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") as string | undefined;

  const [loading, setLoading] = useState(false);

  const form = useForm<zTicket>({
    resolver: zodResolver(zticket),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: zTicket) {
    setLoading(true);
    axios
      .post<NotificationType>(`${process.env.ENDPOINT}/api/tickets`, values, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        form.reset();
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        router.push(redirect ? redirect : "/account/address");
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <h1 className="bg-gradient-to-br from-purple-600 to-purple-950 bg-clip-text text-xl font-bold text-transparent md:text-4xl">
            Help Center
          </h1>
          <p className="text-xs text-slate-600">
            Please fill in the given form below to create a new ticket. Our
            operators will get back to you as soon as possible.
          </p>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Title</FormLabel>
              <FormControl>
                <Input max={100} placeholder="query title" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-baseline justify-between">
                <p className="text-black">Description</p>
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
                  placeholder="Mention your query..."
                  className="max-h-[15rem] min-h-[7.5rem]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled className="ml-auto w-full max-w-[15rem]">
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button type="submit" className="ml-auto w-full max-w-[15rem]">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreateTicketPage;
