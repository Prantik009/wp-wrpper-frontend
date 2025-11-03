// app/(dashboard)/layout.tsx
"use client";

import { Sidebar } from "./_components/Sidebar";
import { Topbar } from "./_components/Topbar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main
          className={cn(
            "flex-1 overflow-y-auto p-0",
            "bg-muted/10 transition-colors"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
