"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Search } from "lucide-react";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

export default function ChatHeader({
  name,
  phone,
  avatar,
  onBack,        // closes main + sidebar
  onToggleRight, // opens right sidebar on mobile
}: {
  name?: string;
  phone?: string;
  avatar?: string;
  onBack: () => void;
  onToggleRight?: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-background sticky top-0 z-10">
      {/* ---------- LEFT: back button (all devices) ---------- */}
      < div className=" flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          title="Back to chat list"
          className="rounded-full place-items-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>


        <div className="flex items-center gap-2 min-w-0">
          <img
            src={avatar || "/placeholder-avatar.png"}
            alt={name || phone || "contact"}
            className="h-8 w-8 rounded-full border border-border object-cover"
          />
          <div className="min-w-0 text-left">
            <div className="text-sm font-semibold truncate max-w-[140px] sm:max-w-[200px]">
              {name || "Unknown"}
            </div>
            <div className="text-[11px] text-muted-foreground truncate max-w-[140px] sm:max-w-[200px]">
              {phone || ""}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- RIGHT: search (always) + expand (mobile only) ---------- */}
      <div className="flex items-center gap-1">
        {/* Search button — visible everywhere */}
        <Button variant="ghost" size="icon" title="Search in chat">
          <Search className="h-4 w-4" />
        </Button>

        {/* Expand right sidebar — only mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleRight}
          title="Open chat details"
          className="block md:hidden rounded-full "
        >
          <TbLayoutSidebarRightCollapseFilled className="h-5 w-5 ml-2.5" />
        </Button>
      </div>
    </div>
  );
}
