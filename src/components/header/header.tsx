"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import UserSection from "./user-section";
import CartButton from "./cart-button";
import { SidebarButton } from "../sidebar/sidebar";
import { Menu, X } from "lucide-react";
import Logo from "../misc/logo";

const Header: FC = () => {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/auth");

  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-[4.5rem]"></div>
      <div
        className={cn(
          "padding-x fixed left-0 top-0 isolate z-[995] h-[4.5rem] w-full",
          isHidden && "hidden",
          "bg-slate-950 text-white",
          !top && "border-b-1 border-slate-700 shadow-sm",
        )}
      >
        <header className="flex h-full w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SidebarButton
              open={open}
              onOpenChange={setOpen}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md bg-slate-50 text-slate-600 hover:text-slate-800 md:hidden",
              )}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </SidebarButton>
            <Logo className="aspect-auto h-8 w-full fill-white object-contain object-left" />
          </div>

          <div className="ml-auto flex gap-3">
            <CartButton />
            <UserSection showRounded={top} />
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
