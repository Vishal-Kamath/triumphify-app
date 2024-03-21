"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTicket } from "@/lib/ticket";
import { dateFormater } from "@/utils/dateFormater";
import { notFound, useParams, usePathname } from "next/navigation";
import { FC } from "react";

const TicketDetails: FC = () => {
  const id = useParams()["id"] as string;
  const { data: ticket, isLoading } = useTicket(id);
  const pathname = usePathname();

  if (isLoading)
    return (
      <>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-9 w-1/2" />
          <Skeleton className="mt-3 h-5 w-1/3" />
          <Skeleton className="h-4 w-[15rem]" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </>
    );
  if (!id) return notFound();
  if (!ticket) return null;
  return (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-medium">{ticket.title}</h3>

        <span className="text-xs text-slate-400">
          on {dateFormater(new Date(ticket.created_at), true, true)}
        </span>
      </div>

      <p className="text-justify text-sm text-slate-600">
        {ticket.description}
      </p>
    </>
  );
};

export default TicketDetails;
