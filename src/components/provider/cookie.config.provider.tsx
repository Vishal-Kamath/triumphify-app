"use client";

import { FC, useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { activateGA4 } from "./google.tag.manager.provider";
import { isServer } from "@tanstack/react-query";
import { useGTMId } from "@/lib/configs";

const cookieConfigSchema = z.object({
  config_has_been_set: z.boolean().optional(),
  GA_Config: z.boolean().optional(),
});

type CookieConfig = z.infer<typeof cookieConfigSchema>;

const CookieConfigProvider: FC = () => {
  const cookieName = "cookie_config";
  const { data: gtm, isLoading } = useGTMId();
  const [configureCookiePageOpen, setConfigureCookiePageOpen] = useState(false);

  const form = useForm<CookieConfig>({
    resolver: zodResolver(cookieConfigSchema),
    defaultValues: {
      config_has_been_set: true,
      GA_Config: true,
    },
  });

  useEffect(fetchConfig, [gtm, isLoading, isServer]);

  function fetchConfig() {
    if (isServer || !gtm || isLoading) return;
    try {
      const configValue = getCookie(cookieName);
      if (!configValue) {
        form.setValue("config_has_been_set", false);
        return;
      }

      const config = JSON.parse(configValue);
      const parsedConfig = cookieConfigSchema.parse(config);

      form.setValue("config_has_been_set", parsedConfig.config_has_been_set);
      form.setValue("GA_Config", parsedConfig.GA_Config);

      if (parsedConfig.config_has_been_set && parsedConfig.GA_Config) {
        console.log("Activating GA4");
        activateGA4();
      }
    } catch (err) {
      console.error(err);
      deleteCookie(cookieName);
      form.setValue("config_has_been_set", false);
      return;
    }
  }

  function handleSetAllCookieSubmit() {
    const config: CookieConfig = {
      config_has_been_set: true,
      GA_Config: true,
    };

    console.log(config);
    setCookie(cookieName, JSON.stringify(config), {
      maxAge: 30 * 24 * 60 * 60,
    });
    fetchConfig();
  }

  function handleConfigureCookieSubmit(data: CookieConfig) {
    const config: CookieConfig = {
      ...data,
      config_has_been_set: true,
    };

    console.log(data);
    setCookie(cookieName, JSON.stringify(config));
    fetchConfig();
  }

  return !form.watch().config_has_been_set ? (
    <Form {...form}>
      {!configureCookiePageOpen ? (
        <form
          onSubmit={form.handleSubmit(handleSetAllCookieSubmit)}
          className="fixed bottom-0 left-0 isolate z-[2000000001] flex w-full flex-col gap-3 border-t-2 border-slate-700 bg-slate-950/70 p-6 text-white backdrop-blur-md md:max-w-lg md:rounded-tr-lg md:border-r-2"
        >
          <h4 className="pb-3 text-xs text-slate-200">
            This website stores cookies on your device. We use this information
            to improve your user experience and for analytics. To learn more
            about the cookies used, see our Privacy Policy.
          </h4>
          <div className="flex w-full justify-end gap-4">
            <button
              type="button"
              onClick={() => setConfigureCookiePageOpen(true)}
              className="h-10 w-fit rounded-full border-2 border-slate-800 px-6 text-sm text-slate-300 hover:border-purple-950 hover:bg-purple-950/30 hover:text-white"
            >
              Configure Cookies
            </button>
            <button
              type="submit"
              className="h-10 w-fit rounded-full bg-slate-800 px-6 text-sm text-slate-300 hover:bg-purple-900 hover:text-white"
            >
              Accept Cookies
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={form.handleSubmit(handleConfigureCookieSubmit)}
          className="fixed bottom-0 left-0 isolate z-[2000000001] flex w-full flex-col gap-6 border-t-2 border-slate-700 bg-slate-950/70 p-6 text-white backdrop-blur-md md:max-w-lg md:rounded-tr-lg md:border-r-2"
        >
          <button
            type="button"
            onClick={() => setConfigureCookiePageOpen(false)}
            className="w-fit text-sm text-slate-400 underline underline-offset-2 hover:text-white"
          >
            Back
          </button>
          <FormField
            control={form.control}
            name="GA_Config"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <FormLabel>Google Analytics</FormLabel>
                  <FormControl>
                    <Switch
                      thumbClassName="data-[state=checked]:bg-slate-200 data-[state=unchecked]:bg-slate-500"
                      className="data-[state=checked]:bg-purple-800 data-[state=unchecked]:bg-slate-800"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormDescription className="text-xs text-slate-400">
                  Google Analytics tracks website traffic and user behavior and
                  provides insights.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="h-10 w-fit rounded-full bg-slate-800 px-9 text-sm text-slate-300 hover:bg-purple-900 hover:text-white"
            >
              Confirm
            </button>
          </div>
        </form>
      )}
    </Form>
  ) : null;
};

export default CookieConfigProvider;
