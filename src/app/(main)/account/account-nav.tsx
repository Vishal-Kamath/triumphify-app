"use client";

import { buttonVariants } from "@/components/ui/button";
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
            buttonVariants({
              variant: pathname.startsWith(element.href) ? "secondary" : "link",
            }),
            "md:justify-start",
          )}
        >
          {element.name}
        </Link>
      ))}
    </nav>
  );
};

export default AccountNav;
