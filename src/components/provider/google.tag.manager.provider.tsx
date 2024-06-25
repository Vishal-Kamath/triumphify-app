"use client";

import { useGTMId } from "@/lib/configs";
import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google";
import { FC, useEffect } from "react";

export function gtag(...args: any[]) {
  window.dataLayer && window.dataLayer.push(arguments);
}

export function activateGA4() {
  gtag("consent", "default", {
    ad_storage: "granted",
    ad_personalization: "granted",
    ad_user_data: "granted",
    analytics_storage: "granted",
  });

  sendGTMEvent({ event: "ConsentConfiguredEvent" });
}

export const GoogleTagManagerScript: FC = () => {
  const { data: gtm, isLoading } = useGTMId();

  useEffect(() => {
    if (gtm?.gtmId && !isLoading) {
      gtag("consent", "default", {
        ad_storage: "denied",
        ad_personalization: "denied",
        ad_user_data: "denied",
        analytics_storage: "denied",
      });
    }
  }, [gtm, isLoading]);

  return gtm?.gtmId && !isLoading ? (
    <GoogleTagManager gtmId={gtm.gtmId} />
  ) : null;
};
