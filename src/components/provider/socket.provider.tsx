"use client";

import { isServer } from "@tanstack/react-query";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface ConversationWithLastMessage extends Conversation {
  lastMessage: Message;
}

interface SocketContextType {
  messages: Message[];
  conversations: ConversationWithLastMessage[];
  loggedIn: boolean;
  loggedOut: boolean;
  unauthorized: boolean;

  login: VoidFunction;
  logout: VoidFunction;
  newChat: (msg: string, room: string, cb: Function) => void;
  chatUpdate: (room: string) => void;
  getConversationsList: VoidFunction;
}
export const Socket = createContext<SocketContextType>({
  messages: [],
  conversations: [],
  loggedIn: false,
  loggedOut: true,
  unauthorized: false,

  login: () => {},
  logout: () => {},

  newChat: (msg: string, room: string) => {},
  chatUpdate: (room: string) => {},
  getConversationsList: () => {},
});

const socket = io(process.env.WS_WEBSITE as string, {
  withCredentials: true,
});

const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [pingCount, setPingCount] = useState(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<
    ConversationWithLastMessage[]
  >([]);

  useEffect(() => {
    if (isServer) return;

    if (!loggedIn && !unauthorized) {
      socket.emit("login");
    }

    socket.on("loggedIn", () => {
      setLoggedIn(true);
      setLoggedOut(false);
      setUnauthorized(false);

      getConversationsList();
    });
    socket.on("loggedOut", () => {
      setLoggedIn(false);
      setLoggedOut(true);
      setUnauthorized(true);

      setMessages([]);
      setConversations([]);
    });
    socket.on("unauthorized", () => {
      if (pingCount > 10) {
        setUnauthorized(true);
        return;
      }
      socket.disconnect();
      socket.connect();

      setTimeout(() => {
        socket.emit("login");
        setPingCount((count) => count + 1);
      }, 1000);
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

      setLoggedIn(false);
    };
  }, [isServer]);

  async function login() {
    socket.disconnect();
    socket.connect();
    setUnauthorized(false);
    setLoggedIn(false);
    socket.emit("login");
  }

  function logout() {
    if (!loggedOut) {
      setPingCount(0);
      socket.emit("logout");
    }
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
        loggedIn,
        loggedOut,
        unauthorized,

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
