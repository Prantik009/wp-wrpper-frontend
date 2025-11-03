// app/(dashboard)/chat/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Chat Page Error:", error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center space-y-4">
      <h2 className="text-lg font-semibold text-destructive">
        Something went wrong in Chat 💬
      </h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        We couldn’t load the chat right now. Try reloading or check your network
        connection.
      </p>
      <Button onClick={reset} variant="default">
        Retry
      </Button>
    </div>
  );
}
