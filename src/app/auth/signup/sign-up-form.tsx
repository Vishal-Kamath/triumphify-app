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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import _ from "lodash";
import { NotificationType } from "@/@types/notification";
import { useSearchParams, useRouter } from "next/navigation";
import { invalidateUserData } from "@/lib/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateInput } from "@/components/date-picker/date-picker-input";

const SignUpForm: FC = () => {
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
      dateOfBirth: new Date(),
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
        invalidateUserData();
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col items-center gap-6"
      >
        <div className="flex w-full flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold text-slate-950">Welcome!</h2>
          <p className="text-sm text-gray-500">
            Enter in your correct details in the form below.
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black">Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
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
                <FormLabel className="text-black">Email</FormLabel>
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
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateInput value={field.value} onChange={field.onChange} />
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const now = new Date();
                        const above18 = new Date(
                          now.setFullYear(now.getFullYear() - 18),
                        );
                        return date > above18 || date < new Date("1900-01-01");
                      }}
                      initialFocus
                      defaultMonth={field.value}
                      month={field.value}
                      onMonthChange={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black">Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
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
                <FormLabel className="text-black">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {loading ? (
          <Button disabled className="w-full">
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        )}
        <Separator className="relative">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-400">
            OR CONTINUE WITH
          </span>
        </Separator>

        <Button
          variant="outline"
          className="w-full gap-2 text-gray-700 hover:text-gray-950"
        >
          <FaGoogle className="h-4 w-4" />
          Google
        </Button>
        <div className="flex gap-1 text-sm text-gray-500">
          <span>Already have an account?</span>
          <Link
            href={`/auth/login${redirectPath}`}
            className="font-semibold hover:text-foreground hover:underline "
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
