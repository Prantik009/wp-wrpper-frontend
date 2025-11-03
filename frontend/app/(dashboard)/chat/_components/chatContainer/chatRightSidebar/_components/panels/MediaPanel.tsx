"use client";

import { useState } from "react";
import { RiChatUploadFill } from "react-icons/ri";

export default function MediaPanel() {
  const [images] = useState(
    Array.from({ length: 9 }).map(
      (_, i) => `https://picsum.photos/300/200?random=${i}`
    )
  );

  return (
    <div className="p-4 bg-background h-[78vh] overflow-y-auto rounded-md border border-border">
      <h2 className="text-sm font-semibold mb-3 text-foreground">Recent Media</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative group rounded-md overflow-hidden border border-border"
          >
            <img
              src={src}
              alt="chat media"
              className="w-full h-32 object-cover rounded-md"
              loading="lazy"
            />
            <RiChatUploadFill className="absolute top-1 right-1 text-muted-foreground bg-background/80 rounded-sm p-0.5 size-4 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}
