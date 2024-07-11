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

  alternates: {
    canonical: "https://triumphify.com",
    languages: {
      "en-US": "https://triumphify.com",
    },
  },

  authors: [
    {
      name: "Triumphify",
      url: "https://triumphify.com",
    },
  ],

  // Favicons
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", type: "image/png" }],
    other: [
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

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
        alt: "Triumphify",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Triumphify - Natural Men's Sexual Health Supplement",
    description:
      "Discover Triumphify, a natural sexual health supplement for men. Enhance libido, improve performance, and boost satisfaction with our high-quality herbal formula, free from artificial additives. Start today!",
    images: [
      {
        url: "https://triumphify.com/og.png",
        width: 1200,
        height: 630,
        alt: "Triumphify",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
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
