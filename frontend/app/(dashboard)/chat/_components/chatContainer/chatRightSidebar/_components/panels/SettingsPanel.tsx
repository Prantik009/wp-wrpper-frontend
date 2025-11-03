"use client";

import { useState } from "react";
import { MdExitToApp } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";
import { Switch } from "@/components/ui/switch";

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    allowMessages: true,
    allowEditInfo: false,
    allowAddMembers: false,
    allowAIFlag: true,
    allowAISend: false,
  });

  return (
    <div className="p-4 bg-background h-[78vh] flex flex-col gap-3 text-sm text-foreground border border-border rounded-md">
      <Row label="Chat ID" value="919647378748-1530864966@g.us" />
      <Row label="Created at" value="06 Jul 2018, 13:46" />
      <Row label="Chat Type" value="group" />
      <Row label="Description" value="Unity implies Excellence at Work." multiline />

      {Object.entries(settings).map(([key, val]) => (
        <ToggleRow
          key={key}
          label={key.replace(/([A-Z])/g, " $1")}
          enabled={val}
          setEnabled={() =>
            setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
          }
        />
      ))}

      <div className="mt-auto border-t border-border pt-3 space-y-2">
        <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:bg-muted transition text-foreground w-full">
          <PiExportBold className="size-4" /> Export Chat
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-border text-red-600 hover:bg-red-100 transition w-full">
          <MdExitToApp className="size-4" /> Exit Group
        </button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-2">
      <div className="font-semibold w-1/3 text-sm">{label}</div>
      <div
        className={`w-2/3 text-right text-muted-foreground ${
          multiline ? "whitespace-pre-wrap" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  enabled,
  setEnabled,
}: {
  label: string;
  enabled: boolean;
  setEnabled: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="font-semibold text-sm">{label}</div>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
}
