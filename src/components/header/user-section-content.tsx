"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  UserRound,
  LogOut,
  ShoppingCart,
  NotepadText,
  Mailbox,
  LucideIcon,
} from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { invalidateUserData } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { useWishlists } from "@/lib/wishlist";
import { useAllCart } from "@/lib/cart";
import { IconType } from "react-icons/lib";

interface Nav {
  name: string;
  floatingRight?: string | number;
  icon: IconType | LucideIcon;
  className?: string;
}
interface NavLink extends Nav {
  type: "link";
  href: string;
}

interface NavButton extends Nav {
  type: "button";
  action: () => void;
}

const UserSectionContent: FC<{
  username?: string | null;
  email?: string | null;
  closeMenu: () => void;
}> = ({ username, email, closeMenu }) => {
  const { toast } = useToast();
  const router = useRouter();

  function onSignOut() {
    const areYouSureYouWantTosignOut = window.confirm(
      "Are you sure you want to sign out?",
    );
    if (!areYouSureYouWantTosignOut) return;
    axios
      .get(`${process.env.ENDPOINT}/api/auth/signout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateUserData();
        closeMenu();
        router.replace("/auth/login");
      })
      .catch((err) => {
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  }

  // wishlist
  const { data: wishlist } = useWishlists();
  const wishlistLength =
    wishlist && Array.isArray(wishlist)
      ? wishlist?.length > 99
        ? "+99"
        : wishlist?.length
      : 0;

  // cart
  const { data: carts } = useAllCart();
  const cartCount = Array.isArray(carts)
    ? carts?.reduce((acc, cart) => acc + cart.quantity, 0)
    : 0;

  // nav
  const navElements: (NavLink | NavButton)[] = [
    {
      name: "Account",
      type: "link",
      href: "/account/profile",
      icon: UserRound,
    },
    {
      name: "Wishlist",
      type: "link",
      href: "/wishlist",
      floatingRight: wishlistLength,
      icon: FaRegHeart,
    },
    {
      name: "Cart",
      type: "link",
      href: "/cart",
      floatingRight: cartCount,
      icon: ShoppingCart,
    },
    {
      name: "Orders",
      type: "link",
      href: "/orders/history",
      icon: NotepadText,
    },
    {
      name: "Tickets",
      type: "link",
      href: "/tickets",
      icon: Mailbox,
    },
    {
      name: "Logout",
      type: "button",
      className: "hover:bg-red-900/30 hover:text-red-600",
      action: onSignOut,
      icon: LogOut,
    },
  ];

  return (
    <div className="w-full flex-col p-2 text-sm">
      <div className="flex flex-col p-2">
        <h2 className="font-medium text-white">{username}</h2>
        <p className="font-light text-gray-400">{email}</p>
      </div>

      {navElements.map((nav, index) =>
        nav.type === "link" ? (
          <Link
            key={index}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start gap-4 px-2 font-light text-slate-400 hover:bg-slate-800 hover:text-white",
              nav.className,
            )}
            href={nav.href}
            onClick={() => closeMenu()}
          >
            <nav.icon className="h-4 w-4" />
            <span>{nav.name}</span>
            {!!nav.floatingRight ? (
              <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                {nav.floatingRight}
              </div>
            ) : null}
          </Link>
        ) : (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-4 px-2 font-light text-slate-400 hover:bg-slate-800 hover:text-white",
              nav.className,
            )}
            onClick={nav.action}
          >
            <nav.icon className="h-4 w-4" />
            <span>{nav.name}</span>
            {!!nav.floatingRight ? (
              <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                {nav.floatingRight}
              </div>
            ) : null}
          </Button>
        ),
      )}
    </div>
  );
};

export default UserSectionContent;
