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
import Logo from "../misc/logo";

const Header: FC = () => {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/auth");
  const isArtHidden =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/wishlist");

  const isSearchHidden =
    pathname.startsWith("/auth") || pathname.startsWith("/tickets/");
  const isDark =
    pathname === "/" ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/account");

  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const [open, setOpen] = useState(false);

  // search
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="h-[7.25rem] md:h-[4.5rem]"></div>
      <div
        className={cn(
          "padding-x fixed left-0 top-0 z-[995] w-full",
          isHidden && "hidden",
          isDark ? "bg-slate-950 text-white" : "bg-white",
          !top && "border-b-1 border-slate-700 shadow-sm",
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
              <Logo className="aspect-auto h-8 w-full fill-white object-contain object-left" />
            </div>

            <SearchBar
              value={search}
              onValueChange={setSearch}
              className="max-md:hidden"
            />
            <div className="flex gap-3">
              <CartButton />
              <UserSection />
            </div>
          </div>
          <SearchBar
            value={search}
            onValueChange={setSearch}
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
