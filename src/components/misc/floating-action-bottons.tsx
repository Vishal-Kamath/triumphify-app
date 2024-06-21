"use client";

import { useMe } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ChevronUp, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";

const FloatingActionButtons: FC = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;
  return (
    <div className="fixed bottom-5 right-5 flex flex-col-reverse items-center gap-3">
      <HelpDeskButton />
      <GoToTopButton />
    </div>
  );
};

export default FloatingActionButtons;

const HelpDeskButton: FC = () => {
  const { data: me, isLoading } = useMe();
  const pathname = usePathname();

  if (isLoading) return <Skeleton className="size-12 rounded-full" />;
  if (!me || me.type === "error") return null;

  const isHidden =
    pathname.startsWith("/help/create") ||
    pathname.startsWith("/tickets") ||
    pathname.startsWith("/cart");
  return (
    <Link
      href={`/help/create?redirect=${encodeURIComponent(pathname)}`}
      className={cn(
        "flex size-12 items-center justify-center rounded-full bg-slate-700 text-slate-300 transition-all duration-500 ease-in-out hover:bg-slate-600 hover:text-white",
        isHidden ? "hidden" : "",
      )}
    >
      <MessageCircleQuestion className="size-6" />
    </Link>
  );
};

const GoToTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const halfScreenHeight = window.innerHeight / 2;
    const scrollY = window.scrollY;

    if (scrollY > halfScreenHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    if (isVisible) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();
  const isHidden =
    pathname.startsWith("/tickets") || pathname.startsWith("/cart");

  return (
    <button
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 outline-none transition-all duration-500 ease-in-out hover:bg-slate-600 hover:text-white",
        !isVisible && "-z-50 cursor-default opacity-0",
        isHidden && "hidden",
      )}
      onClick={scrollToTop}
    >
      <ChevronUp strokeWidth={3} className="size-4" />
    </button>
  );
};
