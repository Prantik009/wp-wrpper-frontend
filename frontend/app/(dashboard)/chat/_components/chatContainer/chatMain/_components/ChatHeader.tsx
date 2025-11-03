"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

export default function ChatHeader({
  name,
  phone,
  avatar,
  onBack,
}: {
  name?: string;
  phone?: string;
  avatar?: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border sticky top-0 bg-background z-10">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 min-w-0">
        <img
          src={avatar || "/placeholder-avatar.png"}
          alt={name || phone || "contact"}
          className="h-8 w-8 rounded-full border border-border object-cover"
        />
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{name || "Unknown"}</div>
          <div className="text-[11px] text-muted-foreground truncate">{phone}</div>
        </div>
      </div>

      <Button variant="ghost" size="icon" title="Search in chat">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
