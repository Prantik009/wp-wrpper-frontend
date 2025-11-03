"use client";

import { FiRefreshCw } from "react-icons/fi";
import { FaRegCommentDots, FaRegHeart, FaUserPlus, FaUserMinus } from "react-icons/fa";

export default function AnalyticsPanel() {
  return (
    <div className="p-4 bg-background h-[78vh] flex flex-col border border-border rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          Group Analytics
          <button className="p-1 border border-border rounded hover:bg-muted transition">
            <FiRefreshCw className="size-3 text-muted-foreground" />
          </button>
        </h2>
        <button className="px-2 py-1 border border-border rounded text-xs hover:bg-muted transition text-muted-foreground">
          25 Sep → 26 Sep
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Stat icon={<FaRegCommentDots />} label="Messages" />
        <Stat icon={<FaRegHeart />} label="Reactions" />
        <Stat icon={<FaUserPlus />} label="Members Joined" />
        <Stat icon={<FaUserMinus />} label="Members Exited" />
      </div>

      <p className="text-xs text-center text-muted-foreground mt-auto">
        No analytics data available yet
      </p>
    </div>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="border border-border rounded-md p-3 flex flex-col items-center bg-muted/30">
      <span className="text-foreground text-lg">{icon}</span>
      <span className="font-semibold text-sm mt-1 text-foreground">0</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
