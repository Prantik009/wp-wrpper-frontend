"use client";

import { useMemo } from "react";

/* -------------------------------------------------------------
   🔹 ActiveButton – Avatar-style presence indicator
------------------------------------------------------------- */
const colors = [
  "bg-purple-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-pink-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-indigo-600",
];

interface ActiveButtonProps {
  name?: string;
  size?: number; // optional override
  isOnline?: boolean;
}

export default function ActiveButton({
  name = "",
  size = 24,
  isOnline = true,
}: ActiveButtonProps) {
  // deterministic color based on name (avoids color flicker)
  const colorClass = useMemo(() => {
    if (!name) return colors[0];
    const hash = Array.from(name).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return colors[hash % colors.length];
  }, [name]);

  const getInitialsFirst = (n: string) =>
    n?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      className={`relative flex items-center justify-center rounded-full ${colorClass} text-white font-semibold select-none transition-transform duration-200 hover:scale-105`}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(size * 0.45, 10),
      }}
      aria-label={`${name || "User"} ${isOnline ? "online" : "offline"}`}
      title={name}
    >
      <span>{getInitialsFirst(name)}</span>

      {/* Status dot */}
      <span
        className={`absolute rounded-full border border-background transition-colors duration-300 ${
          isOnline ? "bg-green-500" : "bg-gray-400"
        }`}
        style={{
          width: size * 0.25,
          height: size * 0.25,
          bottom: 0,
          right: 0,
        }}
      />
    </div>
  );
}
