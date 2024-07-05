"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, SendHorizonal, X } from "lucide-react";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import AutoResizingTextarea from "../ui/auto-resize-textarea";
import { Socket } from "../provider/socket.provider";

const NewChatPage: FC<{
  room: string;
  closeFn: VoidFunction;
  backToHome: VoidFunction;
}> = ({ room: defaultRoom, closeFn, backToHome }) => {
  const { messages, conversations, newChat, chatUpdate } = useContext(Socket);

  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    setRoom(defaultRoom);
    chatUpdate(defaultRoom);
  }, [defaultRoom]);

  const conversation = conversations.find((con) => con.room === room);
  const terminated = conversation?.status === "closed";

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full justify-between bg-purple-800 px-4 py-3">
        <button
          onClick={backToHome}
          className="border-none bg-transparent text-slate-200 outline-none hover:text-white"
        >
          <ArrowLeft className="size-6" />
        </button>
        <button
          onClick={closeFn}
          className="border-none bg-transparent text-slate-300 outline-none hover:text-white"
        >
          <X className="size-6" />
        </button>
      </div>
      {/* Chats */}
      <div className="flex h-full max-h-full grow flex-col-reverse gap-4 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
        {terminated ? (
          <div className="w-full px-4 py-3 text-center text-slate-400">
            This conversation has been terminated
          </div>
        ) : null}
        {formatData(messages)
          .reverse()
          .map((chat, index) =>
            chat.type === "dateSeprator" ? (
              <div
                key={index + "cavdnvd"}
                className="relative mx-auto my-4 w-full max-w-sm border-b-1 border-slate-500"
              >
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-slate-800 px-2 text-xs text-slate-400">
                  {formatDate(chat.date)}
                </span>
              </div>
            ) : (
              <ChatMsg key={index + chat.msg} {...chat} />
            ),
          )}
      </div>

      {!terminated ? (
        <div className="flex h-fit w-full items-center gap-4 border-t-2 border-slate-800 bg-slate-700 px-4 py-2">
          <AutoResizingTextarea
            value={msg}
            onChange={(e) => setMsg(String.raw`${e.target.value}`)}
            className="w-full border-none bg-transparent text-slate-200 outline-none"
            placeholder="Message us here..."
          />
          <button
            onClick={() =>
              newChat(msg, room, (updatedRoom: string) => {
                setRoom(updatedRoom);
                setMsg("");
                chatUpdate(updatedRoom);
              })
            }
            className="flex size-7 flex-shrink-0 items-center justify-center rounded-sm bg-purple-600 text-purple-300 hover:text-white"
          >
            <SendHorizonal className="size-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

const ChatMsg: FC<Message> = ({ sender, msg, created_at }) => {
  return (
    <div
      className={cn(
        "relative flex w-fit max-w-sm flex-col items-end gap-[0.35rem] rounded-md px-3 py-2 text-white",
        sender === "operator"
          ? "mr-auto bg-purple-700"
          : "ml-auto bg-slate-700",
      )}
    >
      <div
        className={cn(
          "h-0 w-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent",
          sender === "operator"
            ? "absolute left-0 top-0 -translate-x-1/2 border-t-purple-700"
            : "absolute right-0 top-0 translate-x-1/2 border-t-slate-700",
        )}
      ></div>
      <span className="text-wrap break-words text-left leading-5 md:text-xs">
        {formatText(msg)}
      </span>
      <span className="ml-auto text-xs text-slate-300 md:text-[0.6rem]">
        {formatTime(new Date(created_at))}
      </span>
    </div>
  );
};

interface SerializedMessage extends Message {
  type: "message";
}
interface DateSeprator {
  date: Date;
  type: "dateSeprator";
}
function formatData(data: Message[]) {
  const newDataArray: (SerializedMessage | DateSeprator)[] = [];

  let previousDate: Date | null = null;
  data.forEach((entry) => {
    if (
      previousDate === null ||
      new Date(entry.created_at).getDate() !== previousDate.getDate() ||
      new Date(entry.created_at).getMonth() !== previousDate.getMonth() ||
      new Date(entry.created_at).getFullYear() !== previousDate.getFullYear()
    ) {
      newDataArray.push({
        type: "dateSeprator",
        date: new Date(entry.created_at),
      });
    }

    newDataArray.push({ ...entry, type: "message" });
    previousDate = new Date(entry.created_at);
  });

  return newDataArray;
}

function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedHours = String(hours).padStart(2, "0");

  return `${formattedHours}:${minutes} ${ampm}`;
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const formatText = (inputText: string) => {
  return inputText.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
};

export default NewChatPage;
