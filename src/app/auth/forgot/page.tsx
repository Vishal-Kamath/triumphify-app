"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordEnterEmailType,
  forgotPaswordEnterEmailSchema,
} from "./forgot-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import AuthInput from "../auth-input";
import { useSearchParams } from "next/navigation";

const ForgotPasswordPage: FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const redirect = useSearchParams().get("redirect") as string | undefined;
  const redirectPath = redirect
    ? `?redirect=${encodeURIComponent(redirect)}`
    : "";

  const form = useForm<ForgotPasswordEnterEmailType>({
    resolver: zodResolver(forgotPaswordEnterEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordEnterEmailType) {
    axios
      .post(
        `${process.env.ENDPOINT}/api/auth/password/send-reset-link`,
        values,
        {
          headers: { "Content-Type": "application/json" },
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col items-start gap-6 text-white"
      >
        <div className="flex w-full flex-col items-start gap-2">
          <h2 className="text-2xl font-semibold">Forgot Password?</h2>
          <p className="text-sm text-gray-500">
            Enter your email and we will send you a reset link.
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <AuthInput
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        {loading ? (
          <Button
            disabled
            className="w-full bg-gray-100/20 text-white hover:bg-white/30"
          >
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-gray-100/20 text-white hover:bg-white/30"
          >
            Send Link
          </Button>
        )}

        <div className="mt-4 flex gap-1 text-sm text-gray-400">
          <span>Go back to</span>

          <Link
            href={`/auth/login${redirectPath}`}
            className="font-semibold hover:text-white hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordPage;
