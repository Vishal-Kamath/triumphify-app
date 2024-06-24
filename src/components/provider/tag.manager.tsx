"use client";

import { useGTMId } from "@/lib/configs";
import { GoogleTagManager } from "@next/third-parties/google";
import { FC } from "react";

const GoogleTagManagerProvider: FC = () => {
  const { data: gtm, isLoading } = useGTMId();

  return gtm?.gtmId && !isLoading ? (
    <GoogleTagManager gtmId={gtm.gtmId} />
  ) : null;
};

export default GoogleTagManagerProvider;
