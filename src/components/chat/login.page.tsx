import { FC, useContext, useState } from "react";
import { Socket } from "../provider/socket.provider";
import { X } from "lucide-react";
import Link from "next/link";
import LoginForm from "@/app/auth/login/login-form";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormType } from "@/app/auth/login/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { NotificationType } from "@/@types/notification";
import { invalidateAll } from "../provider/reactquery.provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import AuthInput from "@/app/auth/auth-input";
import { Button } from "../ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { Separator } from "../ui/separator";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";

const ChatLoginPage: FC<{ closeFn: VoidFunction }> = ({ closeFn }) => {
  const { toast } = useToast();
  const { login, loggedIn, loggedOut, unauthorized } = useContext(Socket);
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
        login();
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
    <div className="relative isolate flex h-full w-full flex-col overflow-y-auto scrollbar-none">
      <Image
        alt="auth background image"
        src="/auth-bg.svg"
        width={1000}
        height={1000}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
      />
      <button
        onClick={closeFn}
        className="absolute right-4 top-4 border-none bg-transparent text-slate-300 outline-none hover:text-white"
      >
        <X className="size-6" />
      </button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex h-full w-full max-w-sm flex-col items-start gap-6 p-6 max-md:justify-center"
        >
          <div className="flex w-full flex-col items-start gap-2">
            <h2 className="text-2xl font-semibold text-fuchsia-400 md:text-xl">
              You seem to be Logged out
            </h2>
            <p className="text-sm text-gray-300 md:text-xs">
              Please login to contact our customer support team.
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
                  {/* <FormLabel>Password</FormLabel> */}
                  <FormControl>
                    <AuthInput
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link
              href="/auth/forgot"
              className="ml-auto text-sm font-semibold text-gray-300 hover:text-blue-400 hover:underline md:text-xs"
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

          <div className="flex gap-1 text-sm text-gray-400 md:text-xs">
            <span>Don&apos;t have an account?</span>
            <Link
              href={`/auth/signup`}
              className="font-semibold hover:text-white hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatLoginPage;
