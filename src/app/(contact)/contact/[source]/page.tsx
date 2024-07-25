"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PhoneCall } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(3).max(50),
  email: z.string().trim().email().min(1).max(100),
  tel: z
    .string()
    .max(100)
    // .refine((val) => val.toString().length > 9, "Field is required")
    .refine((val) => !Number.isNaN(Number(val)), "Invalid input"),
});

type ContactType = z.infer<typeof contactSchema> & { tel: E164Number };

const ContactPage: FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const isWebsite = pathname === "/contact/website";

  const source = useParams()["source"] as string;

  const form = useForm<ContactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      tel: "",
    },
  });

  function onSubmit(values: ContactType) {
    setLoading(true);
    axios
      .post(`${process.env.ENDPOINT}/api/contact/${source}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        router.replace(`${pathname}/thankyou`);
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
    <main
      className={cn(
        "padding-x isolate flex h-full w-full flex-col justify-center",
        isWebsite ? "min-h-remaining" : "min-h-screen",
      )}
    >
      <div className="mx-auto flex flex-col gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
        >
          Back to Home
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="w-fit bg-gradient-to-br from-purple-700 to-slate-950 bg-clip-text text-3xl font-semibold text-transparent lg:text-5xl">
            Lets Get in touch!!
          </h1>
          <p className="text-sm text-slate-600 lg:text-lg">
            Please fill your details and we will get in touch with you.
          </p>
        </div>

        <div className="flex justify-between gap-9 max-md:flex-col">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full max-w-md flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-black">Name</FormLabel>
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
                name="tel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-black">Mobile Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry="US"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loading ? (
                <Button disabled className="ml-auto w-full max-w-[15rem]">
                  <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                  Please wait..
                </Button>
              ) : (
                <Button type="submit" className="ml-auto w-full max-w-[15rem]">
                  Submit
                </Button>
              )}
            </form>
          </Form>
          {/* <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Contact us</h2>
              <p className="text-xs text-slate-500">
                on any of our social media platforms
              </p>
              <div className="mt-2 flex gap-3">
                <FaInstagram className="size-6" />
                <FaFacebook className="size-6" />
                <FaTwitter className="size-6" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Call us</h2>
              <p className="text-xs text-slate-500">
                Reach out to our team Mon-Fri from 9am to 5pm
              </p>
              <a
                href="tel:+11234567890"
                className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-600 underline hover:text-slate-900"
              >
                <PhoneCall className="size-4" />
                <span>+1 123 456 7890</span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
