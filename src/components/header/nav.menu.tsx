"use client";

import { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useProducts } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

const HeaderNavMenu: FC<{ className?: string }> = ({ className }) => {
  const { data: products } = useProducts();

  return (
    <div className={className}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent to-slate-300 hover:bg-transparent hover:text-white">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex max-h-96 flex-col overflow-y-auto">
              {products?.map((product, index) => (
                <NavigationMenuLink
                  key={product.id + index}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-fit w-96 rounded-none border-b-1 border-slate-700 p-2 last:border-none",
                  )}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex w-full items-center gap-3 p-2 text-slate-300 hover:text-white"
                  >
                    <Image
                      src={product.product_images[0]}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="h-full w-20 flex-shrink-0 rounded-md object-contain"
                    />

                    <div className="w-full flex-col">
                      <h5>{product.name}</h5>
                      <span className="text-xs text-slate-400">
                        {product.description.length > 100
                          ? product.description.slice(0, 100) + "..."
                          : product.description}
                      </span>
                    </div>
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/blogs" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "bg-slate-950")}
              >
                Blogs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default HeaderNavMenu;
