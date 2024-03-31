"use client";

import { FC, MouseEvent, MouseEventHandler, useState } from "react";
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
import { FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, loginFormSchema } from "./form-schema";
import axios from "axios";
import { NotificationType } from "@/@types/notification";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { invalidateAll } from "@/components/provider/reactquery.provider";
import AuthInput from "../auth-input";

const LoginPage: FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") as string | undefined;
  const redirectPath = redirect
    ? `?redirect=${encodeURIComponent(redirect)}`
    : "";

  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormType) {
    setLoading(true);
    axios
      .post<NotificationType>(
        `${process.env.ENDPOINT}/api/auth/login`,
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
        invalidateAll();
        router.replace(redirect ?? "/");
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

  function handleGoogle() {
    window.open(`${process.env.ENDPOINT}/api/auth/google`, "_self");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full max-w-sm flex-col items-start gap-6 text-white"
      >
        <div className="flex w-full flex-col items-start gap-2">
          <h2 className="text-2xl font-semibold">Welcome back!</h2>
          <p className="text-sm text-gray-500">
            To login enter your email and password below.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <AuthInput
                    type="email"
                    placeholder="johndoe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <AuthInput type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link
            href="/auth/forgot"
            className="ml-auto text-sm font-semibold text-gray-500 hover:text-blue-600 hover:underline"
          >
            forgot password?
          </Link>
        </div>

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
            Login
          </Button>
        )}
        <div className="flex w-full max-w-sm items-center gap-3">
          <Separator className="w-full shrink bg-gray-500" />
          <span className="text-nowrap text-xs text-gray-300">OR</span>
          <Separator className="w-full shrink bg-gray-500" />
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={handleGoogle}
          className="w-full gap-3 border-gray-400 bg-gray-100/10 text-white hover:border-white hover:bg-white/30 hover:text-white"
        >
          <FaGoogle className="h-4 w-4" />
          <span>Continue with Google</span>
        </Button>

        <div className="flex gap-1 text-sm text-gray-400">
          <span>Don&apos;t have an account?</span>
          <Link
            href={`/auth/signup${redirectPath}`}
            className="font-semibold hover:text-white hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;
