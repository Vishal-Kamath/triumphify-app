"use client";

import { invalidateUserData, useMe } from "@/lib/auth";
import { FC, useEffect, useState } from "react";
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
import { PhoneInput } from "@/components/ui/phone-input";

const AccountProfile: FC = () => {
  const { toast } = useToast();

  const { data: user, isLoading } = useMe();

  const [loading, setLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const form = useForm<AccountProfileFormType>({
    resolver: zodResolver(accountProfileFormSchema),
    defaultValues: {
      email: "",
      username: "",
      tel: "",
      dateOfBirth: null,
      gender: null,
    },
  });

  useEffect(() => {
    if (user && user.data) {
      form.setValue("username", user.data.username || "");
      form.setValue("email", user.data.email);
      form.setValue("tel", user.data.tel || "");
      form.setValue("gender", "Female");
      form.setValue(
        "dateOfBirth",
        user.data.dateOfBirth ? new Date(user.data.dateOfBirth) : undefined,
      );
    }
  }, [user]);

  const onSubmit = (values: AccountProfileFormType) => {
    setLoading(true);
    const dateOfBirth = values.dateOfBirth
      ? convertUTCDateToLocalDateString(values.dateOfBirth)
      : null;
    axios
      .put<NotificationType>(
        `${process.env.ENDPOINT}/api/user/update/details`,
        {
          email: values.email,
          username: values.username,
          gender: values.gender,
          tel: values.tel,
          dateOfBirth,
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
  const tel = form.watch("tel");
  const gender = form.getValues("gender");
  const dateOfBirth = form.watch("dateOfBirth");

  const buttonIsEnabled =
    username.trim() !== user?.data.username ||
    email?.trim() !== user?.data.email ||
    tel?.trim() !== user?.data.tel ||
    gender?.trim() !== user?.data.gender ||
    (dateOfBirth &&
      dateOfBirth.getTime() !== new Date(user?.data.dateOfBirth!).getTime());

  return (
    <main className="flex w-full max-w-xl flex-col gap-6 pb-12">
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">Profile</h3>
        <p className="text-sm text-slate-500">
          customize how your profile details.
        </p>
      </div>
      <Separator className="bg-slate-400" />
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
                <FormLabel className="text-slate-300">Username</FormLabel>
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
                <FormLabel className="flex items-center gap-3 text-slate-300">
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
            name="tel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-slate-300">Mobile Number</FormLabel>
                <FormControl>
                  <PhoneInput international defaultCountry="US" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-slate-300">Gender</FormLabel>
                <FormControl>
                  <Select
                    value={gender || undefined}
                    defaultValue={field.value || undefined}
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
                <FormLabel className="text-slate-300">Date of birth</FormLabel>
                <Popover
                  open={popoverOpen}
                  onOpenChange={setPopoverOpen}
                  defaultOpen={popoverOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full border-slate-600 bg-slate-700/50 pl-3 text-left font-normal text-white hover:bg-slate-700 hover:text-white",
                          !field.value && "text-slate-500",
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
                  <PopoverContent
                    className="w-auto overflow-hidden border-slate-600 bg-slate-900 p-0"
                    align="start"
                  >
                    <DateInput
                      value={field.value || undefined}
                      onChange={field.onChange}
                    />
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const now = new Date();
                        const above18 = new Date(
                          now.setFullYear(now.getFullYear() - 18),
                        );
                        return date > above18 || date < new Date("1900-01-01");
                      }}
                      initialFocus
                      defaultMonth={field.value || undefined}
                      month={field.value || undefined}
                      onMonthChange={field.onChange}
                      ISOWeek
                    />

                    <div className="flex w-full justify-end px-4 pb-4">
                      <button
                        onClick={() => setPopoverOpen(false)}
                        className="text-slate-300 underline-offset-1 hover:text-white hover:underline"
                      >
                        Done
                      </button>
                    </div>
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
              className="max-w-xs hover:bg-purple-900"
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
