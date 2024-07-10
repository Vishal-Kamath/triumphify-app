"use client";

import { MessageCircle, SendHorizonal, X } from "lucide-react";
import { FC, useContext } from "react";
import { Socket } from "../provider/socket.provider";
import { dateFormater } from "@/utils/dateFormater";

const ChatHomePage: FC<{
  closeFn: VoidFunction;
  openChat: (chatId: string) => void;
}> = ({ closeFn, openChat }) => {
  const { conversations } = useContext(Socket);
  const onGoingConversations = conversations.find(
    (conversation) => conversation.status !== "closed",
  );
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto pb-6 scrollbar-none">
      <div className="relative flex flex-col gap-6 border-b-2 border-slate-700 bg-purple-800 px-4 pb-9 pt-6">
        <h1 className="text-3xl font-medium">Hi there</h1>
        <p>Need help? Start a new conversation with us</p>

        <button
          onClick={closeFn}
          className="absolute right-4 top-4 border-none bg-transparent text-slate-300 outline-none hover:text-white"
        >
          <X className="size-6" />
        </button>
      </div>

      <div className="flex -translate-y-5 flex-col gap-3 px-4">
        {onGoingConversations ? (
          <button
            onClick={() => openChat(onGoingConversations.room)}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-purple-600 text-slate-200 hover:bg-purple-500 hover:text-white"
          >
            <span className="text-nowrap">Continue Conversation</span>
            <SendHorizonal className="size-4" />
          </button>
        ) : (
          <button
            onClick={() => openChat("new-chat")}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-purple-600 text-slate-200 hover:bg-purple-500 hover:text-white"
          >
            <span className="text-nowrap">New Conversation</span>
            <SendHorizonal className="size-4" />
          </button>
        )}
      </div>

      {conversations.length ? (
        <div className="px-4 pt-2">
          <div className="flex flex-col gap-3 rounded-md bg-slate-700/50 p-4 max-md:py-6">
            <h3 className="text-2xl md:text-lg">Conversation History</h3>

            {conversations.map((conversation, index) => (
              <button
                key={index}
                onClick={() => openChat(conversation.room)}
                className="flex w-full items-start justify-start gap-3 rounded-lg bg-slate-600/30 p-2 text-slate-200 hover:bg-slate-600/50 hover:text-white"
              >
                <div className="flex size-12 items-center justify-center rounded-md bg-purple-700 text-purple-300 md:size-9">
                  <MessageCircle className="size-9 md:size-6" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <span className="md:text-xs">
                    {conversation.lastMessage.sender === "customer"
                      ? "You"
                      : "Operator"}
                  </span>
                  <span className="truncate text-nowrap text-slate-400 md:text-xs">
                    {conversation.lastMessage.msg}
                  </span>
                </div>
                <div className="ml-auto text-xs md:text-[0.6rem]">
                  {dateFormater(new Date(conversation.lastMessage.created_at))}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatHomePage;
