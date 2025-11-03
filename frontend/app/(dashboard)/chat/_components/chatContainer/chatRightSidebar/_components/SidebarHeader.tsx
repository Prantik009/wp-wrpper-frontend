"use client";
import { Button } from "@/components/ui/button";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";
import { Chat } from "@/components/layouts/chat/types";

export default function SidebarHeader({
  selectedUser,
  onToggleCollapse,
}: {
  selectedUser: Chat;
  onToggleCollapse: () => void;
}) {
  return (
    <div className="border-b border-border bg-background px-3 pt-3 pb-2 relative">
      {/* Collapse button for mobile */}
      <div className="md:hidden absolute top-2 right-2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          title="Collapse"
          className="rounded-full"
        >
          <TbLayoutSidebarLeftCollapseFilled className="size-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={selectedUser?.avatar || "/placeholder-avatar.png"}
            alt={selectedUser?.name || selectedUser?.phone || "User"}
            className="size-12 object-cover rounded-full border border-border"
          />
          <div>
            <p className="font-semibold text-sm text-foreground truncate">
              {selectedUser?.name || selectedUser?.phone || "Unknown"}
            </p>
            <div className="border border-dashed border-border rounded-sm text-xs text-muted-foreground px-2 py-px w-fit mt-1">
              + Label
            </div>
          </div>
        </div>

        <div className="hidden md:flex gap-2 text-muted-foreground">
          <FaCircleUser className="size-4 hover:text-foreground cursor-pointer" title="View Profile" />
          <LuPencilLine className="size-4 hover:text-foreground cursor-pointer" title="Edit" />
          <TfiReload className="size-4 hover:text-foreground cursor-pointer" title="Refresh" />
          <TbLayoutSidebarLeftCollapseFilled
            onClick={onToggleCollapse}
            className="size-4 hover:text-foreground cursor-pointer"
            title="Collapse"
          />
        </div>
      </div>
    </div>
  );
}
