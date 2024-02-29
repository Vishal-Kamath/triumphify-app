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

const colors = [
  "bg-red-100 text-red-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-sky-100 text-sky-800",
];
const AvatarElement: FC<{ image: string | null; username?: string | null }> = ({
  image,
  username,
}) => (
  <Avatar>
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

const UserSection: FC = () => {
  const { data, isLoading, isError } = useMe();
  const { isMobile } = useMediaQuery();

  const pathname = usePathname();
  const redirect =
    pathname === "/" ? "" : `?redirect=${encodeURIComponent(pathname)}`;

  const [open, setOpen] = useState(false);

  if (isLoading) return <Skeleton className="h-10 w-10 rounded-full" />;
  return !data || data.type !== "success" ? (
    <Link
      className={buttonVariants({ variant: "link" })}
      href={`/auth/login${redirect}`}
    >
      Login
    </Link>
  ) : isMobile ? (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger>
        <AvatarElement image={data.data.image} username={data?.data.username} />
      </DrawerTrigger>
      <DrawerContent>
        <UserSectionContent
          username={data?.data.username}
          email={data?.data.email}
          closeMenu={() => setOpen(false)}
        />
      </DrawerContent>
    </Drawer>
  ) : (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger>
        <AvatarElement image={data.data.image} username={data?.data.username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[15rem]" align="end">
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
