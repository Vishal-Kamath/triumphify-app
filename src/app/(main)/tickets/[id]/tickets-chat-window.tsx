"use client";

import { FC } from "react";
import TicketsChatTextArea from "./tickets-chat-textarea";
import { useParams } from "next/navigation";
import { useTicketChats } from "@/lib/ticket";
import { AiOutlineLoading } from "react-icons/ai";
import TicketChat from "./tickets-chat";

const TicketChatWindow: FC = () => {
  const id = useParams()["id"] as string;
  const { data: chats, isLoading } = useTicketChats(id);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <AiOutlineLoading className="size-12 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col gap-4">
      <div className="flex h-full max-h-full flex-col-reverse justify-end gap-3 overflow-y-auto">
        {chats?.map((chat, index) => (
          <TicketChat key={chat.id} chat={chat} id={id} />
        ))}
      </div>
      <TicketsChatTextArea />
    </div>
  );
};

export default TicketChatWindow;
