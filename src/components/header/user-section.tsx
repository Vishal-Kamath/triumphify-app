"use client";

import { useMe } from "@/lib/auth";
import Link from "next/link";
import { FC, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/lib/hooks";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import UserSectionContent from "./user-section-content";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { ChevronDown, ChevronUp } from "lucide-react";

const colors = [
  "bg-red-100 text-red-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-sky-100 text-sky-800",
];
export const AvatarElement: FC<{
  image: string | null;
  username?: string | null;
  className?: string;
}> = ({ image, username, className }) => (
  <Avatar className={className}>
    <AvatarImage src={image || ""} />
    <AvatarFallback
      className={cn(colors[(username?.length || 5) % 5], "font-semibold")}
    >
      {username
        ?.split(" ")
        .map((val) => val[0])
        .slice(0, 2)
        .join("")}
    </AvatarFallback>
  </Avatar>
);

const UserSection: FC<{ showRounded?: boolean }> = ({ showRounded }) => {
  const { data, isLoading, isError } = useMe();
  const { isMobile } = useMediaQuery();

  const pathname = usePathname();
  const redirect =
    pathname === "/" ? "" : `?redirect=${encodeURIComponent(pathname)}`;

  const [open, setOpen] = useState(false);

  if (isLoading) return <Skeleton className="h-10 w-10 rounded-full" />;
  return !data || data.type !== "success" ? (
    <>
      <Link
        className={cn(buttonVariants({ variant: "link" }), "text-white")}
        href={`/auth/login${redirect}`}
      >
        Sign in
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: "default" }),
          "rounded-full bg-purple-800 text-white hover:bg-purple-600",
        )}
        href={`/auth/signup${redirect}`}
      >
        Get started
      </Link>
    </>
  ) : isMobile ? (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger className="relative outline-none">
        <AvatarElement image={data.data.image} username={data?.data.username} />
        <div className="absolute bottom-0 right-0 flex size-5 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border-2 border-slate-950 bg-purple-300 text-slate-800">
          <ChevronUp
            strokeWidth={3.5}
            className={cn(
              "size-3 transition-all duration-150 ease-in-out",
              open ? "rotate-180" : "",
            )}
          />
        </div>
      </DrawerTrigger>
      <DrawerContent className="border-slate-700 bg-slate-900">
        <UserSectionContent
          username={data?.data.username}
          email={data?.data.email}
          closeMenu={() => setOpen(false)}
        />
      </DrawerContent>
    </Drawer>
  ) : (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger className="relative outline-none">
        <AvatarElement image={data.data.image} username={data?.data.username} />
        <div className="absolute bottom-0 right-0 flex size-5 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border-2 border-slate-950 bg-purple-300 text-slate-800">
          <ChevronDown
            strokeWidth={3.5}
            className={cn(
              "size-3 transition-all duration-150 ease-in-out",
              open ? "rotate-180" : "",
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "z-[995] max-w-[15rem] translate-y-16 border-slate-700 bg-slate-900 shadow-slate-600/40 md:translate-y-3",
          !!showRounded ? "" : "rounded-t-none",
        )}
        align="end"
      >
        <UserSectionContent
          username={data?.data.username}
          email={data?.data.email}
          closeMenu={() => setOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserSection;
