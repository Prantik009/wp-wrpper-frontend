"use client";

import dynamic from "next/dynamic";
import { Chat } from "@/components/layouts/chat/types";
import SidebarHeader from "./_components/SidebarHeader";
import SidebarNav from "./_components/SidebarNav";
import { cn } from "@/lib/utils";

/* Lazy imports for each panel */
const OverviewPanel = dynamic(() => import("./_components/panels/OverviewPanel"), { ssr: false });
const PropertiesPanel = dynamic(() => import("./_components/panels/PropertiesPanel"), { ssr: false });
const MembersPanel = dynamic(() => import("./_components/panels/MembersPanel"), { ssr: false });
const MentionsPanel = dynamic(() => import("./_components/panels/MentionsPanel"), { ssr: false });
const MediaPanel = dynamic(() => import("./_components/panels/MediaPanel"), { ssr: false });
const AnalyticsPanel = dynamic(() => import("./_components/panels/AnalyticsPanel"), { ssr: false });
const SettingsPanel = dynamic(() => import("./_components/panels/SettingsPanel"), { ssr: false });

export default function ChatRightSidebar({
  selectedUser,
  activeTab,
  isCollapsed,
  onTabChange,
  onToggleCollapse,
}: {
  selectedUser: Chat;
  activeTab: number;
  isCollapsed: boolean;
  onTabChange: (tab: number) => void;
  onToggleCollapse: () => void;
}) {
  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <OverviewPanel />;
      case 2:
        return <PropertiesPanel />;
      case 3:
        return <MembersPanel />;
      case 4:
        return <MentionsPanel />;
      case 5:
        return <MediaPanel />;
      case 6:
        return <AnalyticsPanel />;
      case 7:
        return <SettingsPanel />;
      default:
        return (
          <div className="flex items-center justify-center text-sm text-muted-foreground h-full">
            👉 Select a tab
          </div>
        );
    }
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-l border-border bg-background transition-all duration-300",
        isCollapsed ? "w-14" : "w-full md:w-[380px]"
      )}
    >
      {/* Header only visible when expanded */}
      {!isCollapsed && (
        <SidebarHeader
          selectedUser={selectedUser}
          onToggleCollapse={onToggleCollapse}
        />
      )}

      {/* Navigation */}
      <SidebarNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        isCollapsed={isCollapsed}
        onExpand={onToggleCollapse}
      />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && <div className="animate-fadeIn p-2">{renderContent()}</div>}
      </div>
    </aside>
  );
}
