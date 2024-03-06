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
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AddressFormType, addAddressSchema } from "./add-address-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineLoading } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { invalidateAddresses } from "@/lib/address";

const AddAddressPage: FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<AddressFormType>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      name: "",
      street_address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      tel: "",
      email: "",
    },
  });

  function onSubmit(values: AddressFormType) {
    setLoading(true);
    axios
      .post(`${process.env.ENDPOINT}/api/address`, values, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateAddresses();
        router.push("/account/address");
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
    <main className="flex w-full max-w-xl flex-col gap-6 pb-12">
      <div className="flex items-center gap-3">
        <Link
          href="/account/address"
          className={buttonVariants({ variant: "ghost" })}
        >
          <MoveLeft />
        </Link>
        <div className="flex flex-col">
          <h3 className="text-xl font-medium">Add Address</h3>
          <p className="text-sm text-gray-500">Enter in your address details</p>
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Address Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-600">
                  Enter the full name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Mobile Number</FormLabel>
                <FormControl>
                  <PhoneInput international defaultCountry="US" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-600">
                  Provide a mobile number where you can be reached, including
                  the country code if applicable.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-600">
                  Enter your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street_address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-baseline justify-between">
                  <p className="text-black">Street Address</p>
                  <p
                    className={cn(
                      "text-xs font-light",
                      field.value.length > 150 ? "text-red-500" : "",
                    )}
                  >
                    {field.value.length} / 150
                  </p>
                </FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={150}
                    placeholder="Address field..."
                    className="max-h-[7.5rem] min-h-[5rem]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-600">
                  Provide the street name and number where you reside or where
                  you want products to be sent.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">City</FormLabel>
                <FormControl>
                  <Input placeholder="New york City" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-600">
                  Input the name of the city where your address is located.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">State</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-600">
                  Specify the state or region where your address is situated.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States of America" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-600">
                  Input the name of the country where your address is located.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Zip code</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    type="number"
                    placeholder="10012"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-600">
                  Enter the ZIP or postal code corresponding to your address.
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
            <Button type="submit" className="max-w-xs">
              Add Address
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};

export default AddAddressPage;
