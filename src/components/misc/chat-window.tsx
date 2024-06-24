"use client";

import { useMe } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { MessageCircleQuestion, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatWindow: FC = () => {
  const { data: me, isLoading } = useMe();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (isLoading) return <Skeleton className="size-12 rounded-full" />;
  if (!me || me.type === "error") return null;

  const isHidden =
    pathname.startsWith("/help/create") ||
    pathname.startsWith("/tickets") ||
    pathname.startsWith("/cart");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex size-12 items-center justify-center rounded-full border-none bg-slate-700 text-slate-300 outline-none transition-all duration-500 ease-in-out hover:bg-slate-600 hover:text-white",
          isHidden ? "hidden" : "",
        )}
      >
        {open ? (
          <X className="size-6" />
        ) : (
          <MessageCircleQuestion className="size-6" />
        )}
      </button>
      {open ? (
        <div className="absolute bottom-0 right-0 h-[25rem] w-full min-w-80 max-w-80 -translate-x-14 rounded-lg border-1 border-slate-600 bg-slate-800"></div>
      ) : null}
    </div>
  );
};

export default ChatWindow;
