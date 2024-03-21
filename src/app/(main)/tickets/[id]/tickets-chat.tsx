"use client";

import { cn } from "@/lib/utils";
import { dateFormater } from "@/utils/dateFormater";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Check, PencilLine, Trash2, X } from "lucide-react";
import { ElementRef, FC, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { invalidateTicketChats } from "@/lib/ticket";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

const TicketChat: FC<{ chat: TicketChat; id: string }> = ({ chat, id }) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(chat.content);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<ElementRef<"textarea">>(null);

  function deleteChat(chatId: string) {
    const isUserSure = confirm("Are you sure you want to delete this chat?");

    if (!isUserSure) return;
    axios
      .delete(`${process.env.ENDPOINT}/api/tickets/${id}/chat/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        invalidateTicketChats(id);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
      })
      .catch((err) => {
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  }

  function onUpdate() {
    if (!editContent.trim()) {
      return toast({
        title: "Fill all details",
        variant: "warning",
      });
    }

    setLoading(true);
    axios
      .patch(
        `${process.env.ENDPOINT}/api/tickets/${id}/chat/${chat.id}`,
        {
          content: editContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        setLoading(false);
        invalidateTicketChats(id);
        setEditMode(false);
        toast({
          title: res.data.title,
          description: res.data.description,
          variant: res.data.type,
        });
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: err?.response?.data?.title || "Error",
          description: err?.response?.data?.description,
          variant: err?.response?.data?.type || "error",
        });
      });
  }

  const isUser = chat.type === "user";
  return isUser ? (
    editMode ? (
      <div
        className={cn(
          "flex max-w-md cursor-pointer flex-col rounded-md p-3 transition-all duration-200 ease-in-out md:w-full",
          isUser ? "ml-auto bg-purple-50 text-right" : "bg-slate-50 text-left",
        )}
      >
        <h4 className={cn("text-[14px] font-medium")}>
          {isUser ? chat.user : chat.employee}
        </h4>
        <span className="text-[0.6rem] text-slate-500">
          {dateFormater(new Date(chat.created_at), true, true)}
        </span>

        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="mt-3 h-52 max-h-52 min-h-16 w-full"
        />

        <div className="mt-3 flex justify-end gap-2">
          <button
            disabled={loading}
            type="button"
            onClick={() => {
              inputRef.current?.blur();
              setEditMode(false);
            }}
            className="flex size-6 items-center justify-center rounded-sm border-none text-slate-500 outline-none hover:bg-red-100 hover:text-red-800"
          >
            <X className="size-4" />
          </button>
          <button
            disabled={loading}
            type="submit"
            onClick={onUpdate}
            className="flex size-6 items-center justify-center rounded-sm border-none text-slate-500 outline-none hover:bg-green-100 hover:text-green-800"
          >
            <Check className="size-4" />
          </button>
        </div>
      </div>
    ) : (
      <ContextMenu>
        <ContextMenuTrigger
          className={cn(
            "flex w-fit max-w-md cursor-pointer flex-col rounded-md p-3 transition-all duration-200 ease-in-out",
            isUser
              ? "ml-auto bg-purple-50 text-right"
              : "bg-slate-50 text-left",
          )}
        >
          <h4 className={cn("text-[14px] font-medium")}>
            {isUser ? chat.user : chat.employee}
          </h4>
          <span className="text-[0.6rem] text-slate-500">
            {dateFormater(new Date(chat.created_at), true, true)}
          </span>
          <p className="mt-3 text-sm text-slate-500">{chat.content}</p>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => {
              setEditMode(true);
              setEditContent(chat.content);
            }}
            className="flex gap-3 text-sm text-slate-700"
          >
            <PencilLine className="size-4" />
            <span>Edit</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => deleteChat(chat.id)}
            className="flex gap-3 text-sm text-slate-700"
          >
            <Trash2 className="size-4" />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  ) : (
    <div
      className={cn(
        "flex w-fit max-w-md cursor-pointer flex-col rounded-md p-3 transition-all duration-200 ease-in-out",
        isUser ? "ml-auto bg-purple-50 text-right" : "bg-slate-50 text-left",
      )}
    >
      <h4 className={cn("text-[14px] font-medium")}>
        {isUser ? chat.user : chat.employee}
      </h4>
      <span className="text-[0.6rem] text-slate-500">
        {dateFormater(new Date(chat.created_at), true, true)}
      </span>
      <p className="mt-3 text-sm text-slate-500">{chat.content}</p>
    </div>
  );
};

export default TicketChat;
