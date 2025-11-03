"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";

// Map paths to readable titles
const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/chat": "Chat",
  "/tickets": "Tickets",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();

  // Find matching title — fallback if none
  const currentTitle =
    routeTitles[pathname] ||
    routeTitles[`/${pathname.split("/")[1]}`] ||
    "Dashboard";

  return (
    <header className="h-14 flex items-center justify-between border-b bg-background px-4">
      {/* Dynamic Title */}
      <h1 className="text-sm font-semibold tracking-tight capitalize">
        {currentTitle}
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
