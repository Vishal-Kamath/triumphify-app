"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import UserSection from "./user-section";
import Image from "next/image";
import SearchBar from "./search";
import CartButton from "./cart-button";

const Header: FC = () => {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/auth");
  const isArtHidden =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/wishlist");

  return (
    <div className={cn("padding-x w-full", isHidden && "hidden")}>
      <header className="relative flex flex-col gap-3 py-4">
        {/* <div
          className={cn(
            "absolute left-0 top-0 -z-30 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-50/25 via-purple-200/25 to-purple-400/75",
            isArtHidden ? "hidden" : "",
          )}
        ></div> */}
        <div className="flex w-full items-center justify-between gap-3">
          <Link href="/" className="text-xl">
            <Image
              src="/logo.svg"
              alt="triumphify"
              width={500}
              height={200}
              className="aspect-auto h-8 w-full object-contain"
            />
          </Link>

          <SearchBar className="max-md:hidden" />
          <div className="flex gap-3">
            <CartButton />
            <UserSection />
          </div>
        </div>
        <SearchBar className="max-w-full md:hidden" />
      </header>
    </div>
  );
};

export default Header;
