"use client";

import ConfirmDelete from "@/components/misc/confirmDelete";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { invalidateAddresses, useAddresses } from "@/lib/address";
import { cn } from "@/lib/utils";
import axios from "axios";
import { PencilLine, Plus, RotateCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";

const UserAddressPage: FC = () => {
  const { toast } = useToast();
  const { data: addresses, isLoading } = useAddresses();
  const [deleteLoading, setDeleteLoading] = useState(false);

  function deleteAddress(id: string) {
    setDeleteLoading(true);
    axios
      .delete(`${process.env.ENDPOINT}/api/address/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDeleteLoading(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
        invalidateAddresses();
      })
      .catch((err) => {
        setDeleteLoading(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  }

  return (
    <main className="flex w-full max-w-2xl flex-col gap-6 pb-12">
      <div className="flex w-full gap-3">
        <Input placeholder="Search addressess..." className="w-full" />
        <Link
          href="/account/address/add"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "gap-3 border-slate-600 bg-slate-800 hover:bg-slate-700 hover:text-white",
          )}
        >
          <Plus className="w-4" />
          <span>Add Address</span>
        </Link>
      </div>

      {addresses?.map((address) => (
        <div
          key={address.id}
          className="flex flex-col gap-1 rounded-lg border-1 border-slate-600 bg-slate-900 p-6 shadow-sm"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h5 className="text-xl font-medium">{address.name}</h5>
            <div className="flex gap-3">
              <Link
                href={`/account/address/${address.id}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-sky-900/50 hover:text-white"
              >
                <PencilLine className="h-4 w-4" />
              </Link>
              {deleteLoading ? (
                <button
                  disabled
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-red-900/40 hover:text-red-600"
                >
                  <RotateCw className="h-4 w-4 animate-spin" />
                </button>
              ) : (
                <ConfirmDelete
                  confirmText={address.name}
                  deleteFn={() => deleteAddress(address.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-red-900/40 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </ConfirmDelete>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{address.email}</span>
            <span>&#8226;</span>
            <span>{address.tel}</span>
          </div>

          <div className="mt-6 flex flex-col gap-1 text-sm text-slate-400">
            <p>{address.street_address}</p>
            <div className="flex items-center gap-3">
              <span>{address.city}</span>
              <span>&#8226;</span>
              <span>{address.state}</span>
              <span>&#8226;</span>
              <span>{address.country}</span>
              <span>&#8226;</span>
              <span>{address.zip}</span>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default UserAddressPage;
