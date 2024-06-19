"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const navElements: { name: string; href: string }[] = [
  {
    name: "Profile",
    href: "/account/profile",
  },
  {
    name: "Address",
    href: "/account/address",
  },
  {
    name: "Security",
    href: "/account/security",
  },
  {
    name: "Verification",
    href: "/account/verification",
  },
];
const AccountNav: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 md:w-[15rem]">
      {navElements.map((element, index) => (
        <Link
          key={element.name + index}
          id={element.name + index}
          href={element.href}
          className={cn(
            "flex h-10 w-full items-center justify-center px-4 text-slate-300 md:justify-start",
            pathname.startsWith(element.href)
              ? "rounded-sm bg-slate-900 hover:bg-slate-800"
              : "underline-offset-2 hover:underline",
          )}
        >
          {element.name}
        </Link>
      ))}
    </nav>
  );
};

export default AccountNav;
