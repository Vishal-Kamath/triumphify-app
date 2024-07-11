import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/provider/reactquery.provider";
import { cn } from "@/lib/utils";
import FloatingActionButtons from "@/components/misc/floating-action-bottons";
import { GoogleTagManagerScript } from "@/components/provider/google.tag.manager.provider";
import CookieConfigProvider from "@/components/provider/cookie.config.provider";
import SocketProvider from "@/components/provider/socket.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Triumphify - Natural Men's Sexual Health Supplement",
  description:
    "Discover Triumphify, a natural sexual health supplement for men. Enhance libido, improve performance, and boost satisfaction with our high-quality herbal formula, free from artificial additives. Start today!",
  keywords: [
    "men's sexual health",
    "natural supplement",
    "enhance libido",
    "improve performance",
    "boost satisfaction",
    "herbal formula",
    "sexual health support",
    "safe supplements",
    "Triumphify",
    "natural libido booster",
    "male performance enhancement",
  ],

  authors: [
    {
      name: "Triumphify",
      url: "https://triumphify.com",
    },
  ],

  openGraph: {
    title: "Triumphify - Natural Men's Sexual Health Supplement",
    description:
      "Discover Triumphify, a natural sexual health supplement for men. Enhance libido, improve performance, and boost satisfaction with our high-quality herbal formula, free from artificial additives. Start today!",
    url: "https://triumphify.com",
    siteName: "Triumphify",
    images: [
      {
        url: "https://triumphify.com/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <SocketProvider>
          <head>
            <GoogleTagManagerScript />
          </head>
          <body
            className={cn(
              inter.className,
              "relative isolate flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-slate-950 text-white scrollbar-none",
            )}
          >
            <CookieConfigProvider />
            {children}
            <Toaster />
            <FloatingActionButtons />
          </body>
        </SocketProvider>
      </ReactQueryProvider>
    </html>
  );
}
