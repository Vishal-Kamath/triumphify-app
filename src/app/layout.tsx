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
  title: "Create Next App",
  description: "Generated by create next app",
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
