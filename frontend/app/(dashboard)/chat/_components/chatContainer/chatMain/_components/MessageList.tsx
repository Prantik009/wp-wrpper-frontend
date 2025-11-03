"use client";
import MessageBubble from "./MessageBubble";
import { Message } from "@/components/layouts/chat/types";

export default function MessageList({
  grouped,
  onReply,
  onCopy,
  onDelete,
  onCreateTicket,
}: {
  grouped: Record<string, Message[]>;
  onReply: (m: Message) => void;
  onCopy: (m: Message) => void;
  onDelete: (m: Message) => void;
  onCreateTicket: (m: Message) => void;
}) {
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const formatDateLabel = (d: string) => {
    const date = new Date(d);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="px-4 py-3 space-y-6">
      {sortedDates.map((dateKey) => (
        <div key={dateKey}>
          <div className="flex justify-center">
            <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          <div className="mt-3 space-y-3">
            {grouped[dateKey].map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isAgent={msg.sender === "agent"}
                onReply={onReply}
                onCopy={onCopy}
                onDelete={onDelete}
                onCreateTicket={onCreateTicket}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
