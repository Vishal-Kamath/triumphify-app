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
          {navElements.map((element, index) => (
            <AccordionItem key={element.name + index} value={element.name}>
              <AccordionTrigger>{element.name}</AccordionTrigger>
              <AccordionContent className="flex flex-col">
                {element.children.map((child, index) => (
                  <Link
                    key={child.name + index}
                    id={child.name + index}
                    href={child.href}
                    className={cn(
                      buttonVariants({
                        variant: pathname.startsWith(child.href)
                          ? "secondary"
                          : "link",
                      }),
                      "md:justify-start",
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
