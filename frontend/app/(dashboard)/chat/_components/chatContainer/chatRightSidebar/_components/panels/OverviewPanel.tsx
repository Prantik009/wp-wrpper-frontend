"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri";
import { ImTicket } from "react-icons/im";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { LuMessageSquareWarning } from "react-icons/lu";

export default function OverviewPanel() {
  const [open, setOpen] = useState({
    tickets: true,
    flagged: true,
    tasks: true,
  });

  const toggle = (key: keyof typeof open) => setOpen({ ...open, [key]: !open[key] });

  return (
    <div className="flex flex-col h-[78vh] bg-background divide-y divide-border rounded-md overflow-hidden">
      {(["tickets", "flagged", "tasks"] as const).map((section) => (
        <div key={section} className="flex flex-col">
          <button
            onClick={() => toggle(section)}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            {open[section] ? (
              <RiArrowDownSFill className="size-4" />
            ) : (
              <RiArrowRightSFill className="size-4" />
            )}
            <span>
              {section === "tickets"
                ? "Open Tickets"
                : section === "flagged"
                ? "Flagged Messages"
                : "Tasks"}
            </span>
          </button>

          <AnimatePresence>
            {open[section] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center p-6 text-center text-xs text-muted-foreground"
              >
                {section === "tickets" && (
                  <>
                    <ImTicket className="text-lg mb-2 text-muted-foreground" />
                    <p>No open tickets</p>
                    <p>Right-click any message or use 🏷️ to create a ticket</p>
                  </>
                )}
                {section === "flagged" && (
                  <>
                    <LuMessageSquareWarning className="text-lg mb-2 text-muted-foreground" />
                    <p>No flagged messages</p>
                    <p>AI will auto-flag important messages</p>
                  </>
                )}
                {section === "tasks" && (
                  <>
                    <LuMessageSquareWarning className="text-lg mb-2 text-muted-foreground" />
                    <p>No open tasks</p>
                    <p>Use the top-right menu to add a task ➕</p>
                  </>
                )}
                <button className="mt-3 flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border border-border hover:bg-muted transition">
                  <HiMiniVideoCamera className="size-4" /> Watch Tutorial
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
