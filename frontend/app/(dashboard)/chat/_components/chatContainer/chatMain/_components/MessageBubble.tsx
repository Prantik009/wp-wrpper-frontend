"use client";
import { Copy, MessageSquarePlus, MoreHorizontal, Reply, Trash2, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, TickStatus } from "@/components/layouts/chat/types";
import { useState } from "react";

function TickInline({ status }: { status?: TickStatus }) {
  if (status === "seen") return <CheckCheck className="h-3.5 w-3.5 text-sky-500" />;
  if (status === "delivered") return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />;
  if (status === "sent") return <Check className="h-3.5 w-3.5 text-muted-foreground" />;
  return null;
}

export default function MessageBubble({
  msg,
  isAgent,
  onReply,
  onCopy,
  onDelete,
  onCreateTicket,
}: {
  msg: Message;
  isAgent: boolean;
  onReply: (m: Message) => void;
  onCopy: (m: Message) => void;
  onDelete: (m: Message) => void;
  onCreateTicket: (m: Message) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
      <div
        className={cn(
          "relative max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow-sm group",
          isAgent
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted rounded-bl-none"
        )}
      >
        <p className="leading-relaxed break-words">{msg.content}</p>
        <div
          className={cn(
            "flex items-center gap-1 justify-end text-[10px] mt-1",
            isAgent ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          <span>
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {isAgent && <TickInline status={msg.status} />}
        </div>

        {!isAgent && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        {open && (
          <div className="absolute right-6 top-0 bg-popover border border-border rounded-md shadow-md text-xs w-36 z-20">
            <button onClick={() => onReply(msg)} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 w-full">
              <Reply className="h-3.5 w-3.5" /> Reply
            </button>
            <button onClick={() => onCopy(msg)} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 w-full">
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
            <button onClick={() => onDelete(msg)} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 text-destructive w-full">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
            <button onClick={() => onCreateTicket(msg)} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 w-full">
              <MessageSquarePlus className="h-3.5 w-3.5" /> Create Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
