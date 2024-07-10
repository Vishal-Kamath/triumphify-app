"use client";

import { isServer } from "@tanstack/react-query";
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

interface ConversationWithLastMessage extends Conversation {
  lastMessage: Message;
}

interface SocketContextType {
  messages: Message[];
  conversations: ConversationWithLastMessage[];
  login: VoidFunction;
  logout: VoidFunction;
  newChat: (msg: string, room: string, cb: Function) => void;
  chatUpdate: (room: string) => void;
  getConversationsList: VoidFunction;
}
export const Socket = createContext<SocketContextType>({
  messages: [],
  conversations: [],

  login: () => {},
  logout: () => {},

  newChat: (msg: string, room: string) => {},
  chatUpdate: (room: string) => {},
  getConversationsList: () => {},
});

const socket = io("http://localhost:5500" as string, {
  withCredentials: true,
});
// const socket = io(process.env.WS_WEBSITE as string, {
//   withCredentials: true,
// });

const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const loggedIn = useRef(false);
  const loggedOut = useRef(true);
  const unauthorized = useRef(false);
  const pingCount = useRef(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<
    ConversationWithLastMessage[]
  >([]);

  useEffect(() => {
    // if (isServer) return;

    if (!loggedIn.current) {
      socket.emit("login");
    }

    socket.on("loggedIn", () => {
      loggedIn.current = true;
      loggedOut.current = false;
      unauthorized.current = false;

      getConversationsList();
    });
    socket.on("loggedOut", () => {
      loggedIn.current = false;
      loggedOut.current = true;
      unauthorized.current = true;

      setMessages([]);
      setConversations([]);
    });
    socket.on("unauthorized", () => {
      console.log("una");
      if (pingCount.current > 10) {
        unauthorized.current = true;
        return;
      }
      socket.disconnect();
      socket.connect();
      socket.emit("login");
      pingCount.current += 1;
    });

    socket.on("chat-updated", (room: string) => {
      chatUpdate(room);
      getConversationsList();
    });

    return () => {
      socket.off("loggedIn");
      socket.off("loggedOut");
      socket.off("unauthorized");
      socket.off("chat-updated");

      loggedIn.current = false;
    };
    // }, [isServer]);
  }, []);

  async function login() {
    console.log("called");
    unauthorized.current = false;
    loggedIn.current = false;
    socket.emit("login");
  }

  function logout() {
    if (!loggedOut.current) socket.emit("logout");
  }

  function newChat(msg: string, room: string, cb: Function) {
    socket.emit("new-chat", msg, room, cb);
  }

  function chatUpdate(room: string) {
    socket.emit("update-chat", room, setMessages);
  }

  function getConversationsList() {
    socket.emit("get-conversations", setConversations);
  }

  return (
    <Socket.Provider
      value={{
        messages,
        conversations,
        login,
        logout,
        newChat,
        chatUpdate,
        getConversationsList,
      }}
    >
      {children}
    </Socket.Provider>
  );
};

export default SocketProvider;
