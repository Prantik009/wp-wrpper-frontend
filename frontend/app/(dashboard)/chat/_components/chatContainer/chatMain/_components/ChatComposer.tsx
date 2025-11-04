"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, CalendarClock, Paperclip, SendHorizonal, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";

export default function ChatComposer({
  text,
  setText,
  selectedPhone,
  setSelectedPhone,
  handleSend,
  phoneAccounts,
  onPoll,
  onSchedule,
  onAttachment,
}: any) {
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close emoji picker
  const handleOutsideClick = (e: MouseEvent) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
      setShowEmoji(false);
    }
  };

  // Close picker on outside click
  useState(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setText((t: string) => t + emojiData.emoji);
  };

  return (
    <div className="border-t border-border bg-background relative">
      {/* Upper: text area */}
      <div className="flex items-end gap-2 px-3 py-2">
        <textarea
          rows={1}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="min-h-[40px] max-h-[120px] resize-none flex-1 rounded-xl text-sm border border-border bg-background px-3 py-2"
        />
        <Button
          size="icon"
          disabled={!selectedPhone || !text.trim()}
          onClick={handleSend}
          className={cn(
            "rounded-full",
            selectedPhone
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </div>

      {/* Lower toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border relative">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onAttachment}>
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Emoji Picker */}
          <div className="relative" ref={emojiRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowEmoji((prev) => !prev);
              }}
            >
              <Smile className="h-4 w-4" />
            </Button>

            {showEmoji && (
              <div className="absolute bottom-10 left-0 z-50">
                <EmojiPicker
                  theme={Theme.LIGHT}
                  onEmojiClick={handleEmojiClick}
                  width={300}
                  height={400}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={onSchedule}>
            <CalendarClock className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPoll}>
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">From:</label>
          <select
            value={selectedPhone}
            onChange={(e) => setSelectedPhone(e.target.value)}
            className="text-xs border border-border rounded-md px-2 py-1 bg-background text-foreground"
          >
            <option value="" disabled>
              Select phone
            </option>
            {phoneAccounts.map((p: any) => (
              <option key={p.id} value={p.number} disabled={p.status !== "Connected"}>
                {p.number} {p.status !== "Connected" ? `(${p.status})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
