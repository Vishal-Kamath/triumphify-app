"use client";

import { useMe } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ChevronUp, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";

const FloatingActionButtons: FC = () => {
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

  if (isLoading || !me) return <Skeleton className="size-12 rounded-full" />;
  if (!me || me.type === "error" || pathname.startsWith("/help/create"))
    return null;

  return (
    <Link
      href={`/help/create?redirect=${encodeURIComponent(pathname)}`}
      className="flex size-12 items-center justify-center rounded-full border-1 border-gray-200 bg-white text-slate-500 shadow-md transition-all duration-500 ease-in-out hover:text-slate-800"
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

  return (
    <button
      className={cn(
        "flex size-9 items-center justify-center rounded-full border-1 border-gray-200 bg-white text-slate-500 shadow-md transition-all duration-500 ease-in-out hover:text-slate-800",
        !isVisible && "-z-50 cursor-default opacity-0",
      )}
      onClick={scrollToTop}
    >
      <ChevronUp className="size-4" />
    </button>
  );
};
