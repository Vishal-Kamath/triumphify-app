"use client";

import { FC, useEffect, useState } from "react";
import SidebarEmmiter from "./sidebar-event";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const sidebarManager = new SidebarEmmiter();
export const toggleSidebar = (open: boolean) => {
  sidebarManager.sidebarEvent(open);
};

interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export const SidebarButton: FC<SidebarButtonProps> = ({
  className,
  children,
  open: defaulOpenState = false,
  onOpenChange,
  ...props
}) => {
  const [open, setOpen] = useState(defaulOpenState);
  const [exist, setExist] = useState(false);

  sidebarManager.on("sidebar-event", (newState: boolean) => {
    setOpen(newState);
    onOpenChange && onOpenChange(newState);
  });

  sidebarManager.on("sidebar-exist", (newState: boolean) => {
    setExist(newState);
  });

  return exist ? (
    <button
      className={className}
      onClick={() => {
        toggleSidebar(!open);
      }}
    >
      {children}
    </button>
  ) : null;
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Sidebar: FC<SidebarProps> = ({
  className,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  sidebarManager.on("sidebar-event", (newState: boolean) => {
    setOpen(newState);
  });

  useEffect(() => {
    sidebarManager.sidebarExist(true);
    return () => {
      sidebarManager.sidebarExist(false);
    };
  }, []);

  return (
    <>
      <div className="max-md:hidden">{children}</div>
      <div
        onClick={() => toggleSidebar(false)}
        className={cn(
          "fixed left-0 top-0 z-40 h-full min-h-screen w-full bg-slate-950/20 backdrop-blur-sm md:hidden",
          open ? "max-lg:block" : "hidden",
        )}
      ></div>
      <nav
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full max-h-screen w-full max-w-[15rem] flex-shrink-0 flex-col overflow-y-auto bg-white pb-24 pt-[7.75rem] transition-all duration-200 ease-in-out scrollbar-none md:hidden md:pt-[4.5rem]",
          open ? "" : "max-lg:-translate-x-full",
        )}
      >
        <Separator />
        {children}
      </nav>
    </>
  );
};
