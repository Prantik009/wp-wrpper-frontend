"use client";

export default function PropertiesPanel() {
  return (
    <div className="flex flex-col justify-center items-center h-[75vh] bg-background text-center text-xs text-muted-foreground gap-2 rounded-md">
      <p>No custom properties</p>
      <p className="px-6">
        Create custom fields like text, date, files, or dropdowns for your chats.
      </p>
      <button className="px-3 py-1.5 rounded-md border border-border shadow-sm hover:bg-muted text-foreground transition">
        Go to Settings
      </button>
    </div>
  );
}
