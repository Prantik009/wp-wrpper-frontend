// app/(dashboard)/chat/page.tsx
"use client";

import { Suspense } from "react";
import ChatContainer from "./_components/chatContainer/ChatContainer";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Chat Page
 * --------------------------------------
 * The root of the chat interface.
 * Loads ChatContainer inside a Suspense boundary for smooth loading.
 * Automatically adapts to screen size and backend state.
 */
export default function ChatPage() {
  return (
    <main className="flex-1 min-h-screen bg-background text-foreground overflow-hidden">
      <Suspense
        fallback={
          <div className="p-6 space-y-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        }
      >
        <ChatContainer />
      </Suspense>
    </main>
  );
}
