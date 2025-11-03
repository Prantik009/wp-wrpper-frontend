"use client";

import { useRef, useState } from "react";
// import { emojiConfig } from "./data/emojiConfig";
// import { ChatInputButton } from "@/components/chat/ChatInputButton"; // FIXED PATH
// import { ScheduleModal } from "./modals/ScheduleModal";
// import { PollModal } from "@/components/modals/PollModal";          // FIXED PATH
// import { useOutsideClick } from "./hooks/useOutsideClick";
import { EmojiClickData } from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  onEmojiSelect?: (emoji: string) => void;
}

export default function ChatInputItems({ onEmojiSelect }: ChatInputProps) {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [isScheduleOpen, setScheduleOpen] = useState(false);
  const [isPollOpen, setPollOpen] = useState(false);

  const emojiWrapperRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

//   useOutsideClick(emojiWrapperRef, (event) => {
//     if (emojiPickerRef.current?.contains(event.target as Node)) return;
//     setActiveModal(null);
//   });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect?.(emojiData.emoji);
  };

  const handleSchedule = (date: Date) => {
    console.log("Scheduled for:", date);
    setScheduleOpen(false);
  };

  const handleModalClose = () => setActiveModal(null);

  return (
    // <div ref={emojiWrapperRef} className="flex items-center gap-2 relative text-foreground">
    //   {emojiConfig.map((item) => (
    //     <ChatInputButton
    //       key={item.id}
    //       item={item}
    //       isActive={activeModal === item.id}
    //       onToggle={() =>
    //         setActiveModal(activeModal === item.id ? null : item.id)
    //       }
    //       onAction={() => {
    //         if (item.action === "schedule") setScheduleOpen(true);
    //         if (item.action === "poll") setPollOpen(true);
    //       }}
    //       onClose={handleModalClose}
    //     />
    //   ))}

    //   {/* Popups for Attachment / Emoji (from emojiConfig) */}
    //   <AnimatePresence>
    //     {activeModal && (
    //       <motion.div
    //         initial={{ opacity: 0, y: 8 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         exit={{ opacity: 0, y: 8 }}
    //         transition={{ duration: 0.2 }}
    //         className="absolute bottom-12 left-0 z-50"
    //       >
    //         {(() => {
    //           const activeItem = emojiConfig.find((i) => i.id === activeModal);
    //           if (!activeItem) return null;
    //           const ModalComponent = activeItem.Modal as any;
    //           // Only Emoji modal needs onEmojiClick
    //           return (
    //             <ModalComponent
    //               ref={emojiPickerRef}
    //               onEmojiClick={activeItem.action === "emoji" ? handleEmojiClick : undefined}
    //             />
    //           );
    //         })()}
    //       </motion.div>
    //     )}
    //   </AnimatePresence>

    //   {/* Dialogs */}
    //   <ScheduleModal
    //     isOpen={isScheduleOpen}
    //     onClose={() => setScheduleOpen(false)}
    //     onSchedule={(dt) => handleSchedule(dt)}
    //   />
    //   <PollModal
    //     isOpen={isPollOpen}
    //     onClose={() => setPollOpen(false)}
    //     onCreatePoll={(poll) => console.log("Poll created:", poll)}
    //   />
    // </div>
    <>
        <h1>Chat Input items</h1>
    </>
  );
}
