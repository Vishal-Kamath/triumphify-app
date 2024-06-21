"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const navElements: {
  name: string;
  children: {
    name: string;
    href: string;
  }[];
}[] = [
  {
    name: "Orders",
    children: [
      {
        name: "history",
        href: "/orders/history",
      },
      {
        name: "cancelled",
        href: "/orders/cancelled",
      },
      {
        name: "returned",
        href: "/orders/returned",
      },
    ],
  },
  {
    name: "Subscription",
    children: [],
  },
];
const OrderNav: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 md:w-[15rem]">
      {
        <Accordion
          type="multiple"
          defaultValue={navElements.map((element) => element.name)}
        >
          {navElements
            .filter((element) => element.children.length)
            .map((element, index) => (
              <AccordionItem
                className="border-slate-700"
                key={element.name + index}
                value={element.name}
              >
                <AccordionTrigger>{element.name}</AccordionTrigger>
                <AccordionContent className="flex flex-col">
                  {element.children.map((child, index) => (
                    <Link
                      key={child.name + index}
                      id={child.name + index}
                      href={child.href}
                      className={cn(
                        "flex h-10 w-full items-center justify-center px-4 text-slate-300 md:justify-start",
                        pathname.startsWith(child.href)
                          ? "rounded-sm bg-slate-900 hover:bg-slate-800"
                          : "underline-offset-2 hover:underline",
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      }
    </nav>
  );
};

export default OrderNav;
