"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Chat, Message, PhoneAccount } from "@/components/layouts/chat/types";
import { dummyChats } from "@/utils/constants";
import ChatHeader from "./_components/ChatHeader";
import MessageList from "./_components/MessageList";
import ChatComposer from "./_components/ChatComposer";
import CreateTicketModal from "./_components/(modals)/CreateTicketModal";
import PollModal from "./_components/(modals)/PollModal";
import ScheduleModal from "./_components/(modals)/ScheduleModal";
import AttachmentModal from "./_components/(modals)/AttchmentModal";
export default function ChatMain({
  chatId,
  onBack,
  onToggleRight,
}: {
  chatId: string;
  onBack: () => void;
  onToggleRight?: () => void; // <-- add this
}) {
  const selectedChat: Chat | undefined = useMemo(
    () => dummyChats.find((c) => c.id === chatId),
    [chatId]
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [selectedMsgForTicket, setSelectedMsgForTicket] = useState<Message | null>(null);
  const [selectedPhone, setSelectedPhone] = useState<string>("");

  const [showPollModal, setShowPollModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const phoneAccounts: PhoneAccount[] = [
    { id: 1, number: "+91 76050 19991", status: "Restart" },
    { id: 2, number: "+91 76050 19993", status: "Connected" },
    { id: 3, number: "+91 98311 12345", status: "Disconnected" },
  ];

  // Load demo messages
  useEffect(() => {
    const now = new Date();
    const earlier = new Date(now.getTime() - 1000 * 60 * 60 * 3);
    setMessages([
      {
        id: "m1",
        content: "Hello! 👋",
        sender: "agent",
        timestamp: earlier.toISOString(),
        status: "seen",
        fromAccount: phoneAccounts[1].number,
      },
      {
        id: "m2",
        content: "Hi, I wanted to check my session timing.",
        sender: "user",
        timestamp: new Date(earlier.getTime() + 1000 * 60 * 2).toISOString(),
      },
    ]);
    setSelectedPhone(phoneAccounts.find((p) => p.status === "Connected")?.number || "");
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    const sc = scrollRef.current;
    if (sc) sc.scrollTo({ top: sc.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Group messages by date
  const grouped = useMemo(() => {
    const groups: Record<string, Message[]> = {};
    for (const m of messages) {
      const d = new Date(m.timestamp).toDateString();
      if (!groups[d]) groups[d] = [];
      groups[d].push(m);
    }
    return groups;
  }, [messages]);

  /** ---------------- HANDLERS ---------------- */
  const handleSend = () => {
    if (!text.trim() || !selectedPhone) return;
    const now = new Date().toISOString();
    const newMsg: Message = {
      id: Date.now().toString(),
      content: text.trim(),
      sender: "agent",
      timestamp: now,
      status: "sent",
      fromAccount: selectedPhone,
    };
    setMessages((prev) => [...prev, newMsg]);
    setText("");

    // simulate delivery and seen
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: "delivered" } : m))
      );
    }, 800);
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: "seen" } : m))
      );
    }, 1600);
  };

  const handleReply = (m: Message) =>
    setText((t) => (t ? t + "\n" : "") + `↩️ ${m.content}\n`);

  const handleCopy = (m: Message) => navigator.clipboard.writeText(m.content);

  const handleDelete = (m: Message) =>
    setMessages((prev) => prev.filter((x) => x.id !== m.id));

  const handleCreateTicket = (m: Message) => setSelectedMsgForTicket(m);

  /** ---------------- RENDER ---------------- */
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <ChatHeader
        name={selectedChat?.name}
        phone={selectedChat?.phone}
        avatar={selectedChat?.avatar}
        onBack={onBack}
      />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <MessageList
          grouped={grouped}
          onReply={handleReply}
          onCopy={handleCopy}
          onDelete={handleDelete}
          onCreateTicket={handleCreateTicket}
        />
      </div>

      {/* Composer */}
      <ChatComposer
        text={text}
        setText={setText}
        selectedPhone={selectedPhone}
        setSelectedPhone={setSelectedPhone}
        handleSend={handleSend}
        phoneAccounts={phoneAccounts}
        onPoll={() => setShowPollModal(true)}
        onSchedule={() => setShowScheduleModal(true)}
        onAttachment={() => setShowAttachmentModal(true)}
      />

      {/* Modals */}
      {selectedMsgForTicket && selectedChat && (
        <CreateTicketModal
          isOpen={!!selectedMsgForTicket}
          onClose={() => setSelectedMsgForTicket(null)}
          message={selectedMsgForTicket}
          sender={selectedChat}
        />
      )}

      {showPollModal && <PollModal isOpen onClose={() => setShowPollModal(false)} />}
      {showScheduleModal && <ScheduleModal isOpen onClose={() => setShowScheduleModal(false)} />}
      {showAttachmentModal && <AttachmentModal isOpen onClose={() => setShowAttachmentModal(false)} />}
    </div>
  );
}
