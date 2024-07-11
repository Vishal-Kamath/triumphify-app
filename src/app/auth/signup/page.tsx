"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { SignupFormSchema, SignupFormType } from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import _ from "lodash";
import { NotificationType } from "@/@types/notification";
import { useSearchParams, useRouter } from "next/navigation";
import { PhoneInput } from "./phone-input";
import { invalidateAll } from "@/components/provider/reactquery.provider";
import AuthInput from "../auth-input";

const SignUpPage: FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") as string | undefined;
  const redirectPath = redirect
    ? `?redirect=${encodeURIComponent(redirect)}`
    : "";

  const [loading, setLoading] = useState(false);

  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: SignupFormType) {
    const body = _.omit(values, "confirmPassword");

    setLoading(true);
    axios
      .post<NotificationType>(`${process.env.ENDPOINT}/api/auth/signup`, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
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
        className="flex w-full max-w-sm flex-col items-start gap-6 text-white"
      >
        <div className="flex w-full flex-col items-start gap-2">
          <h2 className="text-2xl font-semibold">Welcome!</h2>
          <p className="text-sm text-gray-500">
            Enter in your correct details in the form below.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <AuthInput type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Email</FormLabel>
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
            name="tel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Mobile Number</FormLabel>
                <FormControl>
                  <PhoneInput international defaultCountry="US" {...field} />
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
        </div>

        <span className="text-xs">
          By registering, you agree to the processing of your personal data by
          Triumphify as described in the{" "}
          <Link
            href="/policies/privacy"
            className="font-medium text-blue-400 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </span>

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
            Sign up
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
          <span>Already have an account?</span>
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

export default SignUpPage;
