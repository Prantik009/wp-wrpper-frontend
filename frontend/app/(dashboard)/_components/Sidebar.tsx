// frontend/app/(dashboard)/_components/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  BarChart3,
  Settings,
  LayoutDashboard,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Navigation Data
const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

const settingsNav = [{ name: "Settings", href: "/settings", icon: Settings }];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // 🧭 Desktop Sidebar Content
  const SidebarContent = () => (
    <aside
      className={cn(
        "h-screen border-r bg-card flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <Link href="/" className="font-semibold text-lg tracking-tight">
            CheenTalk
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {mainNav.map(({ name, href, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={name}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t p-3">
        {settingsNav.map(({ name, href, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={name}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );

  // 🧭 Mobile Bottom Navigation Bar
  const BottomNav = () => (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-card flex justify-around items-center h-14 shadow-sm z-50">
      {[...mainNav, ...settingsNav].map(({ name, href, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={name}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors",
              active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{name}</span>
          </Link>
        );
      })}
    </nav>
  );

  // 🧭 Mobile Drawer (optional menu button for mobile if needed)
  const MobileDrawer = () => (
    <div className="lg:hidden fixed top-3 left-3 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hidden lg:block rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <>
      {/* Mobile: optional menu + bottom bar */}
      <MobileDrawer />
      <BottomNav />

      {/* Desktop: sidebar */}
      <div className="hidden lg:flex">
        <SidebarContent />
      </div>
    </>
  );
}
