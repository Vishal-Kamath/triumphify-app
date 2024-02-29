"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { AccountSecurityType, accountSecuritySchema } from "./form-schema";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import _ from "lodash";
import axios from "axios";
import { NotificationType } from "@/@types/notification";
import { useMe } from "@/lib/auth";

const AccountSecurityPage: FC = () => {
  const { toast } = useToast();
  const { data: user } = useMe();

  const [loading, setLoading] = useState(false);

  const form = useForm<AccountSecurityType>({
    resolver: zodResolver(accountSecuritySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function ResetPassword() {
    axios
      .post(
        `${process.env.ENDPOINT}/api/auth/password/send-reset-link`,
        {
          email: user?.data.email,
        },
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

  const onSubmit = (values: AccountSecurityType) => {
    setLoading(true);
    axios
      .put<NotificationType>(
        `${process.env.ENDPOINT}/api/user/update/password`,
        _.omit(values, ["confirmNewPassword"]),
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
  };

  return (
    <main className="flex w-full max-w-xl flex-col gap-6 pb-12">
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">Security</h3>
        <p className="text-sm text-gray-500">
          Manage your password to keep your account secure.
        </p>
      </div>
      <Separator />
      {user?.data.needs_to_reset_password ? (
        <div className="flex flex-col gap-6">
          <p className="text-xs text-slate-600">
            It appears that you signed up for an account on our platform using
            Google authentication. We require all users who signed up via Google
            authentication to reset their passwords.
          </p>

          <Button onClick={ResetPassword} className="ml-auto">
            Reset password
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-9"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs">
                    For your security, you must confirm your current password to
                    make changes to your account.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs">
                    Enter a new password for your account.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs">
                    Confirm your new password to make changes to your account.
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
                Change Password
              </Button>
            )}
          </form>
        </Form>
      )}
    </main>
  );
};

export default AccountSecurityPage;
