"use client";

import { ElementRef, FC, useContext, useEffect, useRef, useState } from "react";
import { MessageCircleQuestion, X } from "lucide-react";
import ChatWindow from "./chat.window";
import { Socket } from "../provider/socket.provider";

const ChatButton: FC = () => {
  const [open, setOpen] = useState(false);
  const chatContainer = useRef<ElementRef<"div">>(null);
  const { getConversationsList } = useContext(Socket);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      chatContainer.current &&
      !chatContainer.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    if (open) {
      getConversationsList();
    }

    // Cleanup function to reset overflow style when the component unmounts
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {open ? (
        <div className="fixed left-0 top-0 h-full min-h-screen w-full bg-slate-950/20 backdrop-blur-sm"></div>
      ) : null}
      <div id="chat-section" ref={chatContainer} className="relative size-14">
        <button
          onClick={() => setOpen((open) => !open)}
          className="relative flex size-14 items-center justify-center rounded-full bg-slate-700 text-slate-300 outline-none transition-all duration-500 ease-in-out hover:bg-slate-600 hover:text-white"
        >
          {open ? (
            <X className="size-7" />
          ) : (
            <MessageCircleQuestion className="size-7" />
          )}
        </button>
        <ChatWindow open={open} closeFn={() => setOpen(false)} />
      </div>
    </>
  );
};

export default ChatButton;
