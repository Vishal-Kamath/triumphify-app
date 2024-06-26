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
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddressFormType, addAddressSchema } from "./edit-address-form-schema";
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
import { useParams, useRouter } from "next/navigation";
import { invalidateAddresses, useAddress } from "@/lib/address";

const EditAddressPage: FC = () => {
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

  const id = useParams()["id"] as string;
  const { data: address, isLoading } = useAddress(id);

  useEffect(() => {
    if (address) {
      form.setValue("name", address.name);
      form.setValue("street_address", address.street_address);
      form.setValue("city", address.city);
      form.setValue("state", address.state);
      form.setValue("zip", address.zip);
      form.setValue("country", address.country);
      form.setValue("tel", address.tel);
      form.setValue("email", address.email);
    }
  }, [address]);

  function onSubmit(values: AddressFormType) {
    setLoading(true);
    axios
      .put(`${process.env.ENDPOINT}/api/address/${id}`, values, {
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

  const buttonIsEnabled =
    form.watch("name") !== address?.name ||
    form.watch("street_address") !== address?.street_address ||
    form.watch("city") !== address?.city ||
    form.watch("state") !== address?.state ||
    form.watch("zip") !== address?.zip ||
    form.watch("country") !== address?.country ||
    form.watch("tel") !== address?.tel ||
    form.watch("email") !== address?.email;

  return (
    <main className="flex w-full max-w-xl flex-col gap-6 pb-12 text-white">
      <div className="flex items-center gap-3">
        <Link
          href="/account/address"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-slate-400 hover:bg-slate-800 hover:text-white",
          )}
        >
          <MoveLeft />
        </Link>
        <div className="flex flex-col">
          <h3 className="text-xl font-medium">Edit Address</h3>
          <p className="text-sm text-slate-500">
            Enter in your address details
          </p>
        </div>
      </div>
      <Separator className="bg-slate-400" />
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
                <FormLabel className="text-slate-300">Address Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-400">
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
                <FormLabel className="text-slate-300">Mobile Number</FormLabel>
                <FormControl>
                  <PhoneInput international defaultCountry="US" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-400">
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
                <FormLabel className="text-slate-300">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-400">
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
                  <p className="text-slate-300">Street Address</p>
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
                <FormDescription className="text-xs text-slate-400">
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
                <FormLabel className="text-slate-300">City</FormLabel>
                <FormControl>
                  <Input placeholder="New york City" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-400">
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
                <FormLabel className="text-slate-300">State</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-400">
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
                <FormLabel className="text-slate-300">Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States of America" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-slate-400">
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
                <FormLabel className="text-slate-300">Zip code</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    type="number"
                    placeholder="10012"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-400">
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
            <Button
              disabled={!buttonIsEnabled}
              type="submit"
              className="max-w-xs hover:bg-purple-900"
            >
              Update Address
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};

export default EditAddressPage;
