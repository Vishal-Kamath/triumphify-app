"use client";

import { useToast } from "@/components/ui/use-toast";
import { invalidateUserData, useMe } from "@/lib/auth";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AccountEmailVerificationSchema,
  AccountEmailVerificationType,
} from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { NotificationType } from "@/@types/notification";
import AccountLoading from "../loading";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const AccountEmailVerificationPage: FC = () => {
  const { toast } = useToast();

  const { data: user, isLoading } = useMe();

  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<AccountEmailVerificationType>({
    resolver: zodResolver(AccountEmailVerificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const sendOTP = () => {
    setLoadingOtp(true);
    axios
      .get<NotificationType>(`${process.env.ENDPOINT}/api/user/otp/send`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setLoadingOtp(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateUserData();
      })
      .catch((err) => {
        setLoadingOtp(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  };

  const onSubmit = (values: AccountEmailVerificationType) => {
    setLoading(true);
    axios
      .post<NotificationType>(
        `${process.env.ENDPOINT}/api/user/otp/verify`,
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
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  };

  if (isLoading) return <AccountLoading />;

  return (
    <main className="flex w-full max-w-xl flex-col gap-6 pb-12">
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">Verification</h3>
        <p className="text-sm text-gray-500">
          verify your email address to get access to all features.
        </p>
      </div>
      <Separator />

      <div className="flex flex-col gap-2 text-sm">
        {user?.data.emailVerified ? (
          <h4 className="flex items-center gap-1 text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span className="font-medium">Email verified</span>
          </h4>
        ) : (
          <h4 className="flex items-center gap-1 text-yellow-600">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">Email not verified</span>
          </h4>
        )}
        <div className="flex gap-3">
          <Input type="text" value={user?.data.email} disabled />
          {loadingOtp ? (
            <Button disabled>
              <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </Button>
          ) : (
            <Button
              type="button"
              onClick={sendOTP}
              variant="secondary"
              disabled={!!user?.data.emailVerified}
            >
              Send
            </Button>
          )}
        </div>
      </div>

      {!user?.data.emailVerified ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-9"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs">
                    Enter the verifaction
                  </FormDescription>
                </FormItem>
              )}
            />
            {loading ? (
              <Button disabled className="max-w-xs">
                <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                Please wait..
              </Button>
            ) : (
              <Button type="submit" className="max-w-xs">
                Verify
              </Button>
            )}
          </form>
        </Form>
      ) : null}
    </main>
  );
};

export default AccountEmailVerificationPage;
