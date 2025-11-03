"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalButtonProps {
  link?: string;
  title?: string;
  icon?: React.ReactNode | LucideIcon;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  iconPosition?: "left" | "right";
  className?: string;
}

/* -------------------------------------------------------------
   🌍 GlobalButton — Universal CTA Button Component
------------------------------------------------------------- */
export function GlobalButton({
  link = "#",
  title = "Click",
  icon: Icon,
  variant = "default",
  size = "sm",
  iconPosition = "left",
  className,
}: GlobalButtonProps) {
  const isExternal = /^https?:\/\//.test(link);
  const iconElement =
    typeof Icon === "function" ? <Icon className="size-4" /> : Icon;

  const content = (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium",
        variant === "default" &&
          "bg-foreground text-background hover:bg-foreground/90",
        className
      )}
    >
      {iconPosition === "left" && Icon && iconElement}
      {title && <span className="hidden sm:inline">{title}</span>}
      {iconPosition === "right" && Icon && iconElement}
    </Button>
  );

  if (isExternal) {
    return (
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
      >
        {content}
      </Link>
    );
  }

  return (
    <Link href={link} className="inline-flex">
      {content}
    </Link>
  );
}
