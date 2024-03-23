"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const ThankYouPage: FC = () => {
  const pathname = usePathname();
  const isWebsite = pathname === "/contact/website";
  return (
    <main
      className={cn(
        "padding-x isolate flex h-full w-full flex-col pt-24",
        isWebsite ? "min-h-remaining" : "min-h-screen",
      )}
    >
      <div className="mx-auto flex flex-col items-center justify-center gap-9">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="w-fit bg-gradient-to-br from-purple-700 to-slate-950 bg-clip-text text-3xl font-semibold text-transparent lg:text-5xl">
            Thank you for reaching out!!
          </h1>
          <p className="text-sm text-slate-600 lg:text-lg">
            Our operators will get back to you as soon as possible.
          </p>
        </div>
        <Link
          href="/"
          className="w-fit text-lg font-medium text-slate-600 underline hover:text-slate-900"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default ThankYouPage;
