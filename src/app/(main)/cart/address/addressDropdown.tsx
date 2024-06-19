"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";

interface Props {
  main: { title: string; content: string };
  title: string;
  className?: string;
  options:
    | {
        id: string;
        title: string;
        content: string;
      }[]
    | undefined;
  setAddress: (id: string) => void;
  openAndClose: (action: "open" | "close") => void;
  open: boolean;
}
const AddressDropdown: FC<Props> = ({
  main,
  title,
  className,
  options,
  setAddress,
  open,
  openAndClose,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="font-semibold">{title}</div>
      <div className={cn("relative w-full bg-slate-900", className)}>
        {/* Main */}
        <button
          onClick={() => (open ? openAndClose("close") : openAndClose("open"))}
          className="flex w-full items-center justify-between rounded-md border-[1px] border-slate-700 px-3 py-2 outline-none outline-offset-0 hover:outline-4 hover:outline-purple-900/50 focus:border-slate-500"
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-left text-[14px] font-medium">{main.title}</h3>
            <p className="text-left text-xs text-gray-500">
              {main.content.length > 35
                ? `${main.content.slice(0, 35)}...`
                : main.content}
            </p>
          </div>
          <FaAngleDown className={cn(open && "rotate-180")} />
        </button>

        {/* Options */}
        <div
          className={cn(
            "absolute bottom-0 z-10 w-full translate-y-full pt-1 max-lg:hidden",
            !open && "hidden",
          )}
        >
          <div className="flex max-h-[20rem] w-full flex-col overflow-y-auto rounded-md border-[1px] border-slate-600 bg-slate-900 shadow-lg">
            {options && !!options.length ? (
              options.map((option, index) => (
                <button
                  key={option.title + index + title}
                  onClick={() => {
                    setAddress(option.id);
                    openAndClose("close");
                  }}
                  className="flex flex-col gap-1 px-2 py-1 outline-none hover:bg-slate-800"
                >
                  <h3 className="text-left text-[14px] font-medium">
                    {option.title}
                  </h3>
                  <p className="text-left text-xs text-gray-500">
                    {option.content.length > 35
                      ? `${option.content.slice(0, 35)}...`
                      : option.content}
                  </p>
                </button>
              ))
            ) : (
              <Link
                href={`/account/address/add?redirect=${encodeURIComponent(
                  "/cart/address",
                )}`}
                className="flex w-full items-center justify-center gap-2 py-2 text-lg text-gray-600 hover:bg-sky-50 hover:text-black"
              >
                <AiOutlinePlus className="h-5 w-5" />
                Add a new address
              </Link>
            )}
          </div>
        </div>

        {open ? (
          <div className="fixed left-0 top-0 isolate z-40 flex h-full min-h-screen w-full items-center justify-center bg-black/20 backdrop-blur-sm lg:hidden">
            <div
              className={cn(
                "flex w-full max-w-md flex-col gap-2 rounded-md border-1 border-slate-700 bg-slate-900 p-4",
              )}
            >
              <div className="flex justify-between">
                <h5 className="to-slate-400 text-lg">Addresses</h5>
                <button
                  onClick={() => openAndClose("close")}
                  className="text-slate-400 outline-none hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex max-h-[20rem] w-full flex-col overflow-y-auto border-b-1 border-slate-600 bg-slate-950 shadow-lg">
                {options && !!options.length ? (
                  options.map((option, index) => (
                    <button
                      key={option.title + index + title}
                      onClick={() => {
                        setAddress(option.id);
                        openAndClose("close");
                      }}
                      className="flex flex-col gap-1 px-2 py-1 outline-none hover:bg-sky-900/40"
                    >
                      <h3 className="text-left text-[14px] font-medium">
                        {option.title}
                      </h3>
                      <p className="text-left text-xs text-gray-500">
                        {option.content.length > 35
                          ? `${option.content.slice(0, 35)}...`
                          : option.content}
                      </p>
                    </button>
                  ))
                ) : (
                  <Link
                    href={`/account/address/add?redirect=${encodeURIComponent(
                      "/cart/address",
                    )}`}
                    className="flex w-full items-center justify-center gap-2 py-2 text-lg text-gray-600 hover:bg-sky-50 hover:text-black"
                  >
                    <AiOutlinePlus className="h-5 w-5" />
                    Add a new address
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddressDropdown;
