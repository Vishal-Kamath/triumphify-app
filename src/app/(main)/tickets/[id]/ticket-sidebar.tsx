"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, useState } from "react";
import TicketDetails from "./ticket-details";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

const TicketSidebar: FC = () => {
  const [open, setOpen] = useState(false);
  const redirect = useSearchParams().get("redirect") || "";

  return (
    <div className="fixed top-16 z-10 flex w-full flex-col gap-5 bg-white px-6 pt-6 max-md:left-0 max-md:border-b-1 max-md:border-slate-300 max-md:pb-3 max-md:pt-2 max-md:shadow-sm md:sticky md:top-0 md:max-w-sm">
      <div className="flex w-full items-center gap-6">
        <Link
          href={redirect ? redirect : "/tickets"}
          className={cn(
            buttonVariants({ variant: "link" }),
            "w-fit p-0 leading-none text-slate-500 hover:text-slate-900",
          )}
        >
          Back
        </Link>
        <button
          onClick={() => setOpen((open) => !open)}
          className="ml-auto flex size-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-50 hover:text-slate-700 md:hidden"
        >
          <ChevronDown
            className={cn(
              "size-4 transition-all duration-200 ease-in-out",
              open ? "-rotate-180" : "",
            )}
          />
        </button>
      </div>

      <div className={cn("flex flex-col gap-5", !open ? "max-md:hidden" : "")}>
        <TicketDetails />
      </div>
    </div>
  );
};

export default TicketSidebar;
