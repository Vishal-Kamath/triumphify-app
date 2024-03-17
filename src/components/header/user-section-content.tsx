"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserRound, LogOut, ShoppingCart, NotepadText } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { invalidateUserData } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { useWishlists } from "@/lib/wishlist";
import { useAllCart } from "@/lib/cart";

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

  const { data: carts } = useAllCart();
  const cartCount = Array.isArray(carts)
    ? carts?.reduce((acc, cart) => acc + cart.quantity, 0)
    : 0;

  return (
    <div className="w-full flex-col p-2 text-sm">
      <div className="flex flex-col p-2">
        <h2 className="font-medium text-black">{username}</h2>
        <p className="font-light text-gray-600">{email}</p>
      </div>
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start gap-4 px-2 font-light",
        )}
        href="/account/profile"
        onClick={() => closeMenu()}
      >
        <UserRound className="h-4 w-4" />
        <span>Account</span>
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start gap-4 px-2 font-light",
        )}
        href="/wishlist"
        onClick={() => closeMenu()}
      >
        <FaRegHeart className="h-4 w-4" />
        <span>Wishlist</span>
        {!!wishlistLength ? (
          <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
            {wishlistLength}
          </div>
        ) : null}
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start gap-4 px-2 font-light",
        )}
        href="/cart"
        onClick={() => closeMenu()}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>Cart</span>
        {!!cartCount ? (
          <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
            {cartCount}
          </div>
        ) : null}
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start gap-4 px-2 font-light",
        )}
        href="/orders/history"
        onClick={() => closeMenu()}
      >
        <NotepadText className="h-4 w-4" />
        <span>Orders</span>
      </Link>
      <Button
        variant="ghost"
        className="w-full justify-start gap-4 px-2 font-light hover:bg-red-50 hover:text-red-600"
        onClick={onSignOut}
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default UserSectionContent;
