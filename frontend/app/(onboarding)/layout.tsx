// app/(onboarding)/layout.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 px-4">
      {/* Header */}
      <header className="absolute top-4 left-4 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo_com.png" alt="CheenTalk" className="w-8 h-auto" />
          <span className="font-semibold text-foreground">CheenTalk</span>
        </Link>
      </header>

      {/* Animated wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "w-full max-w-md bg-card border border-border shadow-lg rounded-xl p-8",
          "flex flex-col items-center text-center"
        )}
      >
        {children}
      </motion.div>

      {/* Footer */}
      <footer className="mt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} CheenTalk. All rights reserved.
      </footer>
    </div>
  );
}
