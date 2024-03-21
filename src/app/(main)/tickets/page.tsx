"use client";

import AuthProvider from "@/components/provider/auth.provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTickets } from "@/lib/ticket";
import { dateFormater } from "@/utils/dateFormater";
import { MessageCircleQuestion, RefreshCw } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";

const TicketsPage: FC = () => {
  const { data: tickets, refetch } = useTickets();
  const [search, setSearch] = useState("");

  const filteredTickets = tickets?.filter((ticket) =>
    ticket.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AuthProvider>
      <div className="padding-x flex flex-col gap-6 pb-24 pt-9">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Tickets</h2>
          <p className="text-sm text-gray-500">Manage your tickets.</p>
        </div>
        <Separator />
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-9">
          <div className="flex gap-3">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
            />
            <Button
              variant="secondary"
              className="group flex size-10 flex-shrink-0 items-center justify-center p-0 active:bg-purple-100"
              onClick={() => refetch()}
            >
              <RefreshCw className="size-4 group-active:animate-spin " />
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {filteredTickets?.map((ticket) => (
              <Link
                href={`/tickets/${ticket.id}`}
                className="flex flex-col gap-4 border-b-1 border-slate-200 px-3 py-6 hover:bg-slate-50/50"
              >
                <div className="flex gap-4">
                  <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <MessageCircleQuestion className="size-6" />
                  </div>
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex justify-between gap-6">
                      <div className="flex flex-col">
                        <h4 className="text-lg font-medium text-slate-700">
                          {ticket.title}
                        </h4>
                        <span className="text-xs text-slate-400">
                          on{" "}
                          {dateFormater(
                            new Date(ticket.created_at),
                            true,
                            true,
                          )}
                        </span>
                      </div>
                    </div>

                    <p className="text-justify text-sm text-slate-600 max-md:hidden">
                      {ticket.description.length > 500
                        ? ticket.description.slice(0, 500) + "..."
                        : ticket.description}
                    </p>
                  </div>
                </div>
                <p className="text-justify text-sm text-slate-600 md:hidden">
                  {ticket.description.length > 500
                    ? ticket.description.slice(0, 500) + "..."
                    : ticket.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default TicketsPage;
