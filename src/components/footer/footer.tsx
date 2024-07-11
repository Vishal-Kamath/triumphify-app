"use client";

import { FC } from "react";
import TriumphifyLogo from "../ui/logo";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useCategories } from "@/lib/categories";
import Link from "next/link";
import useResponsive from "@/lib/hooks/use-responsive";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useProducts } from "@/lib/products";

const Footer: FC = () => {
  const { data: categories } = useCategories();
  const { data: products } = useProducts();
  const { maxLg } = useResponsive();

  return maxLg ? (
    <footer className="padding-x mt-auto flex w-full flex-col gap-6 border-t-1 border-slate-700 bg-slate-950 py-9 text-white">
      <div className="w-full">
        <TriumphifyLogo className="h-fit w-[8rem] fill-white" />
      </div>

      <Accordion type="multiple" className="pr-16">
        <AccordionItem className="border-gray-600" value="Products">
          <AccordionTrigger hideIcon className="text-white">
            Products
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 text-gray-500">
            {products?.map((product) => (
              <Link
                className="w-fit hover:text-gray-200"
                key={product.slug}
                href={`/products/${product.slug}`}
              >
                {product.name}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-gray-600" value="Company">
          <AccordionTrigger hideIcon className="text-white">
            Company
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 text-gray-500">
            <Link className="w-fit hover:text-gray-200" href="/about">
              About
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/contact">
              Contact us
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/blogs">
              Blogs
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/testimonials">
              testimonials
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/faqs">
              FAQs
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-gray-600" value="Policies">
          <AccordionTrigger hideIcon className="text-white">
            Policies
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 text-gray-500">
            <Link
              className="w-fit hover:text-gray-200"
              href="/policies/privacy"
            >
              Privacy Policy
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/policies/terms">
              Terms of Service
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/policies/cookie">
              Cookie Policy
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-3 pt-6">
        <FaInstagram className="size-5 text-gray-500 hover:text-white" />
        <FaFacebook className="size-5 text-gray-500 hover:text-white" />
        <FaTwitter className="size-5 text-gray-500 hover:text-white" />
      </div>
    </footer>
  ) : (
    <footer className="padding-x mt-auto flex w-full flex-col gap-6 border-t-1 border-slate-700 bg-slate-950 py-9 text-white">
      <div className="grid grid-cols-4 gap-4">
        <TriumphifyLogo className="h-fit w-[8rem] fill-white" />
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-white">Products</h3>

          <div className="flex flex-col gap-1 text-gray-500">
            {products?.map((product) => (
              <Link
                className="w-fit hover:text-gray-200"
                key={product.slug}
                href={`/products/${product.slug}`}
              >
                {product.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-white">Company</h3>

          <div className="flex flex-col gap-1 text-gray-500">
            <Link className="w-fit hover:text-gray-200" href="/about">
              About
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/contact">
              Contact us
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/blogs">
              Blogs
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/testimonials">
              testimonials
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/faqs">
              FAQs
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-white">Policies</h3>

          <div className="flex flex-col gap-1 text-gray-500">
            <Link
              className="w-fit hover:text-gray-200"
              href="/policies/privacy"
            >
              Privacy Policy
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/policies/terms">
              Terms of Service
            </Link>
            <Link className="w-fit hover:text-gray-200" href="/policies/cookie">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <FaInstagram className="size-5 text-gray-500 hover:text-white" />
        <FaFacebook className="size-5 text-gray-500 hover:text-white" />
        <FaTwitter className="size-5 text-gray-500 hover:text-white" />
      </div>
    </footer>
  );
};

export default Footer;
