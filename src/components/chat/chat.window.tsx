import { FC, useContext, useState } from "react";
import ChatSection from "./new.chat.page";
import ChatHomePage from "./home.page";
import { cn } from "@/lib/utils";
import { Socket } from "../provider/socket.provider";
import ChatLoginPage from "./login.page";

const ChatWindow: FC<{ open: boolean; closeFn: VoidFunction }> = ({
  open,
  closeFn,
}) => {
  const [chatSectionOpen, setChatSectionOpen] = useState(false);
  const [chatRoom, setChatRoom] = useState("");
  const { loggedIn, loggedOut, getConversationsList } = useContext(Socket);

  function backToHome() {
    getConversationsList();
    setChatSectionOpen(false);
  }

  function openChat(room: string) {
    if (room) {
      setChatRoom(room);
      setChatSectionOpen(true);
    }
  }

  return (
    <div
      className={cn(
        "max-md:fixed max-md:left-0 max-md:top-0 max-md:min-h-screen",
        "md:absolute md:bottom-0 md:right-16 md:max-h-[30rem] md:min-h-[30rem] md:min-w-[21rem] md:max-w-[21rem]",
        "flex h-full max-h-screen w-full flex-col justify-start overflow-hidden bg-slate-900 transition-all duration-150 ease-in-out md:rounded-md md:border-2 md:border-slate-700",
        !open ? "translate-y-[calc(100%+1.25rem)]" : "",
      )}
    >
      {!loggedIn && loggedOut ? (
        <ChatLoginPage closeFn={closeFn} />
      ) : chatSectionOpen ? (
        <ChatSection
          closeFn={closeFn}
          backToHome={backToHome}
          room={chatRoom}
        />
      ) : (
        <ChatHomePage closeFn={closeFn} openChat={openChat} />
      )}
    </div>
  );
};

export default ChatWindow;
