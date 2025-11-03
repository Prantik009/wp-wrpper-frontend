"use client";

import { useState, useMemo } from "react";
import ChatLeftSidebar from "./chatLeftSidebar/ChatLeftSidebar";
import ChatMain from "./chatMain/ChatMain";
import ChatRightSidebar from "./chatRightSidebar/ChatRightSidebar";
import { dummyChats } from "@/utils/constants";

export default function ChatContainer() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const selectedUser = useMemo(
    () => dummyChats.find((c) => c.id === activeChat) || null,
    [activeChat]
  );

  return (
    <div className="relative flex h-[calc(100vh-64px)] bg-background border-t border-border overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div
        className={`${
          activeChat ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-[320px] border-r border-border`}
      >
        <ChatLeftSidebar
          activeChat={activeChat}
          onSelectChat={(id) => {
            setActiveChat(id);
            setIsRightOpen(false);
          }}
        />
      </div>

      {/* MAIN CHAT AREA */}
      <div
        className={`flex flex-col flex-1 h-full relative ${
          activeChat ? "flex" : "hidden md:flex"
        }`}
      >
        {activeChat ? (
          <ChatMain
            chatId={activeChat}
            onBack={() => setActiveChat(null)}
            onToggleRight={() => setIsRightOpen((prev) => !prev)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
            Select a chat to start messaging 💬
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      {activeChat && selectedUser && (
        <>
          {/* Desktop view */}
          <div
            className={`hidden md:flex flex-col border-l border-border transition-all duration-300 bg-background ${
              isRightOpen ? "w-[380px]" : "w-[60px]"
            }`}
          >
            <ChatRightSidebar
              selectedUser={selectedUser}
              activeTab={activeTab}
              isCollapsed={!isRightOpen}
              onTabChange={(tab) => setActiveTab(tab)}
              onToggleCollapse={() => setIsRightOpen((prev) => !prev)}
            />
          </div>

          {/* Mobile overlay */}
          {isRightOpen && (
            <div className="fixed inset-0 z-50 bg-background md:hidden">
              <ChatRightSidebar
                selectedUser={selectedUser}
                activeTab={activeTab}
                isCollapsed={false}
                onTabChange={(tab) => setActiveTab(tab)}
                onToggleCollapse={() => setIsRightOpen(false)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
