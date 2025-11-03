"use client";

import { useMemo, useState } from "react";
import { RiFolderDownloadFill } from "react-icons/ri";
import { IoSearchOutline, IoFilterOutline, IoClose } from "react-icons/io5";
import { MdOutlinePause, MdOutlineSettingsPhone } from "react-icons/md";
import { Check, CheckCheck } from "lucide-react";
import { dummyChats } from "@/utils/constants";
import { Chat } from "@/components/layouts/chat/types";

function formatLastAt(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();

  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return d.toLocaleDateString([], { day: "2-digit", month: "short" });
  }
}

function Tick({ status }: { status?: string }) {
  if (!status) return null;

  if (status === "sent")
    return <Check className="w-3.5 h-3.5 text-muted-foreground" />;

  if (status === "delivered")
    return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />;

  if (status === "seen")
    return <CheckCheck className="w-3.5 h-3.5 text-sky-500" />;

  return null;
}

export default function ChatLeftSidebar({
  activeChat,
  onSelectChat,
}: {
  activeChat: string | null;
  onSelectChat: (id: string) => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const chats = useMemo<Chat[]>(
    () =>
      dummyChats
        .slice()
        .sort(
          (a, b) =>
            new Date(b.lastMessageAt || 0).getTime() -
            new Date(a.lastMessageAt || 0).getTime()
        ),
    []
  );

  const filtered = useMemo(
    () =>
      chats.filter(
        (c) =>
          c.name?.toLowerCase().includes(search.toLowerCase()) ||
          c.phone?.includes(search)
      ),
    [chats, search]
  );

  return (
    <div className="relative flex h-full flex-col border-r border-border bg-background">
      {/* Header */}
      <div className="flex h-12 items-center justify-between gap-x-2 border-b border-border px-3 py-2 sticky top-0 bg-background z-10">
        <div className="p-1 rounded-full flex items-center justify-center bg-muted shadow-sm border border-border/40">
          <MdOutlineSettingsPhone className="size-4 text-muted-foreground" />
        </div>

        {!searchOpen ? (
          <div className="flex w-full items-center justify-between gap-x-2 text-foreground">
            <div className="relative flex items-center gap-2">
              <RiFolderDownloadFill className="size-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Inbox</span>
            </div>
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="px-2.5 py-1.5 border border-border rounded-sm bg-background hover:bg-muted transition-all"
              >
                <IoSearchOutline className="size-4 text-muted-foreground" />
              </button>
              <button className="px-2.5 py-1.5 border border-border rounded-sm bg-background hover:bg-muted transition-all">
                <MdOutlinePause className="size-4 text-muted-foreground" />
              </button>
              <button className="px-2.5 py-1.5 border border-border rounded-sm bg-background hover:bg-muted transition-all">
                <IoFilterOutline className="size-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between gap-x-2 text-foreground transition-all duration-300">
            <div className="flex items-center w-full gap-2 border border-border rounded-sm bg-muted py-0.5 px-2">
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearch("");
                }}
                className="p-0 rounded-sm hover:bg-muted-foreground/10"
              >
                <IoClose className="size-4 text-muted-foreground" />
              </button>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full focus:outline-none text-xs bg-muted text-foreground placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="flex items-center gap-x-2">
              <button className="px-2.5 py-1.5 border border-border rounded-sm bg-background hover:bg-muted transition-all">
                <MdOutlinePause className="size-4 text-muted-foreground" />
              </button>
              <button className="px-2.5 py-1.5 border border-border rounded-sm bg-background hover:bg-muted transition-all">
                <IoFilterOutline className="size-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat List */}
      <div className="flex flex-col overflow-y-auto flex-1 bg-background">
        {filtered.length > 0 ? (
          filtered.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center gap-3 px-3 py-2 border-b border-border text-left transition-colors ${
                activeChat === chat.id
                  ? "bg-primary/10 border-l-2 border-l-primary"
                  : "hover:bg-muted/60"
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name || chat.phone || "contact"}
                    className="h-10 w-10 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border border-border">
                    <span className="text-sm font-medium text-foreground">
                      {(chat.name || chat.phone || "?").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-foreground truncate">
                    {chat.name || chat.phone || "Unknown"}
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">
                    {formatLastAt(chat.lastMessageAt)}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-0.5 text-muted-foreground">
                  <Tick status={chat.tickStatus} />
                  <span className="text-xs truncate">{chat.lastMessage}</span>
                </div>

                {chat.accounts?.length ? (
                  <div className="flex items-center mt-0.5">
                    <span className="text-[10px] text-muted-foreground">
                      From: {chat.accounts[0]}
                    </span>
                  </div>
                ) : null}
              </div>
            </button>
          ))
        ) : (
          <div className="text-xs text-muted-foreground p-4 text-center">
            No conversations yet.
          </div>
        )}
      </div>
    </div>
  );
}
