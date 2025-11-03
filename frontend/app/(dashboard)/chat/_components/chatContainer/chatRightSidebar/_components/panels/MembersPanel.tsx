"use client";

import { motion } from "framer-motion";
import { RiUserAddLine } from "react-icons/ri";
import { FiLink, FiMoreVertical } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";

interface Member {
  phone: string;
  name?: string | null;
  photo?: string | null;
}

const members: Member[] = [
  { phone: "+91 98745 77682", name: "Swapan Sarkar" },
  { phone: "+91 98833 01080", name: "Aindrila Paul" },
  { phone: "+91 99324 17245", name: "Megha Roy" },
];

export default function MembersPanel() {
  return (
    <div className="flex flex-col h-[78vh] bg-background border border-border rounded-md overflow-hidden">
      {/* Top actions */}
      <div className="border-b border-border p-3 space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-primary text-primary-foreground rounded-full">
            <RiUserAddLine className="size-4" />
          </span>
          <span className="text-sm text-foreground">Add members</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="p-2 bg-primary text-primary-foreground rounded-full">
            <FiLink className="size-4" />
          </span>
          <span className="text-sm text-foreground">Invite via link</span>
        </div>
      </div>

      {/* Member list */}
      <div className="overflow-y-auto flex-1 p-2">
        {members.map((m, i) => (
          <motion.div
            key={m.phone}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-muted transition"
          >
            <div className="flex items-center gap-3">
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name || m.phone}
                  className="size-8 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="size-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                  <FaUser className="size-3" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{m.phone}</p>
                <p className="text-xs text-muted-foreground">{m.name ?? "~"}</p>
              </div>
            </div>
            <button className="p-2 rounded-md hover:bg-muted transition">
              <FiMoreVertical className="size-4 text-muted-foreground" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
