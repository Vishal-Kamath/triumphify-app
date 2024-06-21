import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/provider/reactquery.provider";
import { cn } from "@/lib/utils";
import FloatingActionButtons from "@/components/misc/floating-action-bottons";

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
        <body
          className={cn(
            inter.className,
            "flex h-full min-h-screen w-full flex-col bg-slate-950 text-white scrollbar-none",
          )}
        >
          {children}
          <Toaster />
          <FloatingActionButtons />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
