"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import UserSection from "./user-section";
import Image from "next/image";
import SearchBar from "./search";
import CartButton from "./cart-button";
import { SidebarButton } from "../sidebar/sidebar";
import { buttonVariants } from "../ui/button";
import { Menu, X } from "lucide-react";

const Header: FC = () => {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/auth");
  const isArtHidden =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/wishlist");

  const isSearchHidden =
    pathname.startsWith("/auth") || pathname.startsWith("/tickets/");

  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-[7.75rem] md:h-[4.5rem]"></div>
      <div
        className={cn(
          "padding-x fixed left-0 top-0 z-[999] w-full bg-white",
          isHidden && "hidden",
          !top && "border-b-1 border-slate-200 shadow-sm",
        )}
      >
        <header className="relative flex flex-col gap-3 py-4">
          {/* <div
          className={cn(
            "absolute left-0 top-0 -z-30 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-50/25 via-purple-200/25 to-purple-400/75",
            isArtHidden ? "hidden" : "",
          )}
        ></div> */}
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SidebarButton
                open={open}
                onOpenChange={setOpen}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md bg-slate-50 text-slate-600 hover:text-slate-800 md:hidden",
                )}
              >
                {open ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </SidebarButton>
              <Link href="/" className="text-xl">
                <Image
                  src="/logo.svg"
                  alt="triumphify"
                  width={500}
                  height={200}
                  className="aspect-auto h-8 w-full object-contain object-left"
                />
              </Link>
            </div>

            <SearchBar className="max-md:hidden" />
            <div className="flex gap-3">
              <CartButton />
              <UserSection />
            </div>
          </div>
          <SearchBar
            className={cn(
              "max-w-full md:hidden",
              isSearchHidden ? "hidden" : "",
            )}
          />
        </header>
      </div>
    </>
  );
};

export default Header;
