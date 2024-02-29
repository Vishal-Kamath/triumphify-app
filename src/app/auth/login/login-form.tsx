"use client";

import { FC, MouseEvent, MouseEventHandler, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { invalidateUserData } from "@/lib/auth";

const LoginForm: FC<{ inline?: boolean }> = ({ inline }) => {
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
        invalidateUserData();
        if (!inline) return router.replace(redirect ?? "/");
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
        className="flex h-full w-full max-w-sm flex-col items-center gap-6"
      >
        <div className="flex w-full flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold text-slate-950">
            {inline ? "You seem to be Logged out" : "Welcome back!"}
          </h2>
          <p className="text-sm text-gray-500">
            To login enter your email and password below.
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input
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
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
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
          <Button disabled className="w-full">
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Login
          </Button>
        )}
        <Separator className="relative">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-400">
            OR CONTINUE WITH
          </span>
        </Separator>

        <Button
          variant="outline"
          type="button"
          onClick={handleGoogle}
          className="w-full gap-2 text-gray-700 hover:text-gray-950"
        >
          <FaGoogle className="h-4 w-4" />
          Google
        </Button>

        <div className="flex gap-1 text-sm text-gray-500">
          <span>Don&apos;t have an account?</span>
          <Link
            href={`/auth/signup${redirectPath}`}
            className="font-semibold hover:text-foreground hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
