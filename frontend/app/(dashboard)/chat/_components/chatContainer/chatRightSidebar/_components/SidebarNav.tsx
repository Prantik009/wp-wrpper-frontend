"use client";
import { CgMenuLeft } from "react-icons/cg";
import { RiListCheck2, RiTeamFill, RiFolderImageFill, RiListSettingsLine } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

const navs = [
  { id: 1, icon: <CgMenuLeft className="size-4.5" />, label: "Overview" },
  { id: 2, icon: <RiListCheck2 className="size-4.5" />, label: "Properties" },
  { id: 3, icon: <RiTeamFill className="size-4.5" />, label: "Members" },
  { id: 4, icon: <MdAlternateEmail className="size-4.5" />, label: "Mentions" },
  { id: 5, icon: <RiFolderImageFill className="size-4.5" />, label: "Media" },
  { id: 6, icon: <FaChartLine className="size-4.5" />, label: "Analytics" },
  { id: 7, icon: <RiListSettingsLine className="size-4.5" />, label: "Settings" },
];

export default function SidebarNav({
  activeTab,
  onTabChange,
  isCollapsed,
  onExpand,
}: {
  activeTab: number;
  onTabChange: (tab: number) => void;
  isCollapsed: boolean;
  onExpand: () => void;
}) {
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-5 py-5 border-r border-border">
        <button title="Expand" onClick={onExpand} className="text-muted-foreground hover:text-foreground transition">
          <TbLayoutSidebarRightCollapseFilled className="size-5" />
        </button>

        <button title="Refresh" onClick={() => window.location.reload()} className="text-muted-foreground hover:text-foreground transition">
          <TfiReload className="size-5" />
        </button>

        {navs.map((item) => (
          <button
            key={item.id}
            title={item.label}
            className={`transition ${
              activeTab === item.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              onTabChange(item.id);
              onExpand();
            }}
          >
            {item.icon}
          </button>
        ))}
      </div>
    );
  }

  return (
    <nav className="border-t border-border pt-2">
      <ul className="flex items-center justify-between px-3">
        {navs.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-1 cursor-pointer transition ${
              activeTab === item.id
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onTabChange(item.id)}
          >
            {item.icon}
            {activeTab === item.id && (
              <span className="text-xs">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
