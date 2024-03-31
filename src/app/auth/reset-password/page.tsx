"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ResetPasswordType,
  resetPaswordSchema,
} from "./reset-password-form-schema";
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
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { invalidateUserData } from "@/lib/auth";
import AuthInput from "../auth-input";
import Link from "next/link";

const ResetPasswordPage: FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") as string | undefined;
  const redirectPath = redirect
    ? `?redirect=${encodeURIComponent(redirect)}`
    : "";

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPaswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: ResetPasswordType) {
    setLoading(true);
    axios
      .post(
        `${process.env.ENDPOINT}/api/auth/password/reset`,
        {
          password: values.password,
          token: searchParams.get("token"),
          otp: searchParams.get("otp"),
        },
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
        invalidateUserData();
        router.replace("/");
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
          <h2 className="text-2xl font-semibold">Reset Password</h2>
          <p className="text-sm text-gray-500">
            Enter your new login password below.
          </p>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <AuthInput type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white">Confirm Password</FormLabel>
              <FormControl>
                <AuthInput type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
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
            Reset
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

export default ResetPasswordPage;
