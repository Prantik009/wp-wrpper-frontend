"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizonal, X } from "lucide-react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";

interface PollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePoll: (poll: { question: string; options: string[]; multipleVotes: boolean }) => void;
}

export default function PollModal({ isOpen, onClose, onCreatePoll }: PollModalProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [multipleVotes, setMultipleVotes] = useState(false);
  const [showEmojiIndex, setShowEmojiIndex] = useState<number | null>(null);

  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // prevent background scroll when modal open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // auto-scroll to new option
  const addOption = () => {
    if (options.length < 10) {
      setOptions((prev) => [...prev, ""]);
      setTimeout(() => {
        optionsContainerRef.current?.scrollTo({
          top: optionsContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== index);
      setOptions(updated);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData, index: number) => {
    const updated = [...options];
    updated[index] += emojiData.emoji;
    setOptions(updated);
  };

  const handleCreatePoll = () => {
    const validOptions = options.filter((opt) => opt.trim() !== "");
    if (question.trim() && validOptions.length >= 2) {
      onCreatePoll({
        question: question.trim(),
        options: validOptions,
        multipleVotes,
      });
      onClose();
      setQuestion("");
      setOptions(["", ""]);
      setMultipleVotes(false);
    }
  };

  const canCreatePoll = question.trim() && options.filter((opt) => opt.trim()).length >= 2;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative bg-background border border-border rounded-xl shadow-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h2 className="text-sm font-semibold">Create Poll</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Question */}
          <div>
            <label className="text-sm font-medium block mb-1">Question</label>
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Options */}
          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold">Poll Options</h3>
              <button
                onClick={addOption}
                className="text-xs border border-border px-2 py-1 rounded-md hover:bg-muted transition-colors"
              >
                + Add Option
              </button>
            </div>

            <div ref={optionsContainerRef} className="max-h-48 overflow-y-auto space-y-3 pr-2">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-2 relative">
                  {/* Input with emoji */}
                  <div className="flex-1 border border-border rounded-md bg-background flex items-center px-2 py-1 relative">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                    <span
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() =>
                        setShowEmojiIndex(showEmojiIndex === index ? null : index)
                      }
                    >
                      <BsEmojiSmile />
                    </span>

                    {/* Emoji Picker */}
                    {showEmojiIndex === index && (
                      <div
                        ref={emojiPickerRef}
                        className="absolute bottom-full right-0 mb-2 z-50 shadow-md"
                      >
                        <EmojiPicker
                          onEmojiClick={(emojiData) =>
                            handleEmojiClick(emojiData, index)
                          }
                          theme={Theme.LIGHT}
                          searchDisabled
                          previewConfig={{ showPreview: false }}
                          height={350}
                          width={300}
                        />
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 2}
                    className={`text-destructive ${
                      options.length <= 2 ? "opacity-30 cursor-not-allowed" : "hover:opacity-80"
                    }`}
                  >
                    <IoIosRemoveCircleOutline className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Multiple Votes */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Allow multiple votes</label>
            <button
              onClick={() => setMultipleVotes(!multipleVotes)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                multipleVotes ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  multipleVotes ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border bg-muted/30 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePoll}
            disabled={!canCreatePoll}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition ${
              canCreatePoll
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <SendHorizonal className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
