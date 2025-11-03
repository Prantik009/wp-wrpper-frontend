"use client";
import { Button } from "@/components/ui/button";
import { BarChart3, CalendarClock, Paperclip, SendHorizonal, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatComposer({
  text,
  setText,
  selectedPhone,
  handleSend,
  phoneAccounts,
  onPoll,
  onSchedule,
  onAttachment,
}: any) {
  return (
    <div className="border-t border-border bg-background">
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
      <div className="flex items-center justify-between px-3 py-2 border-t border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onAttachment}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setText((t: string) => t + "😊")}>
            <Smile className="h-4 w-4" />
          </Button>
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
            onChange={(e) => handleSend.setSelectedPhone(e.target.value)}
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
