"use client";

import { invalidateUserData, useMe } from "@/lib/auth";
import { FC, useState } from "react";
import AccountProfileLoading from "../loading";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AccountProfileFormType,
  accountProfileFormSchema,
} from "./form-schema";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, convertUTCDateToLocalDateString } from "@/lib/utils";
import { format } from "date-fns";
import { AlertCircle, CalendarIcon, CheckCircle2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateInput } from "@/components/date-picker/date-picker-input";
import axios from "axios";
import { NotificationType } from "@/@types/notification";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AccountProfile: FC = () => {
  const { toast } = useToast();

  const { data: user, isLoading } = useMe();

  const [loading, setLoading] = useState(false);

  const form = useForm<AccountProfileFormType>({
    resolver: zodResolver(accountProfileFormSchema),
    defaultValues: {
      email: user?.data.email || "",
      username: user?.data.username || "",
      dateOfBirth: user?.data.dateOfBirth
        ? new Date(user?.data.dateOfBirth)
        : undefined,
      gender: user?.data.gender || undefined,
    },
  });

  const onSubmit = (values: AccountProfileFormType) => {
    setLoading(true);
    axios
      .put<NotificationType>(
        `${process.env.ENDPOINT}/api/user/update/details`,
        {
          email: values.email,
          username: values.username,
          gender: values.gender,
          dateOfBirth: convertUTCDateToLocalDateString(values.dateOfBirth),
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

  if (isLoading) return <AccountProfileLoading />;

  const username = form.watch("username");
  const email = form.watch("email");
  const gender = form.watch("gender");
  const dateOfBirth = form.watch("dateOfBirth");

  const buttonIsEnabled =
    username.trim() !== user?.data.username ||
    email?.trim() !== user?.data.email ||
    gender?.trim() !== user?.data.gender ||
    (dateOfBirth &&
      dateOfBirth.getTime() !== new Date(user?.data.dateOfBirth!).getTime());

  return (
    <main className="flex w-full max-w-xl flex-col gap-6 pb-12">
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">Profile</h3>
        <p className="text-sm text-gray-500">
          customize how your profile details.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-9"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-3">
                  <span>Email</span>
                  {user?.data.emailVerified ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      <span className="text-xs">Email verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <AlertCircle className="h-3 w-3" />
                      <span className="text-xs">Email not verified</span>
                    </div>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-xs">
                  You can manage you email verification in the verification
                  section
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black">Gender</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-black">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
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
                      ISOWeek
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ? (
            <Button disabled className="max-w-xs">
              <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </Button>
          ) : (
            <Button
              type="submit"
              className="max-w-xs"
              disabled={!buttonIsEnabled}
            >
              Save Changes
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};

export default AccountProfile;
