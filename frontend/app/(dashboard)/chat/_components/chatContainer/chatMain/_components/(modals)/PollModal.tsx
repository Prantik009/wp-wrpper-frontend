"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PollModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Poll</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Poll question" value={question} onChange={(e) => setQuestion(e.target.value)} />
          {options.map((opt, i) => (
            <Input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />
          ))}
          <Button variant="outline" onClick={() => setOptions([...options, ""])} className="w-full">
            + Add Option
          </Button>
          <Button onClick={onClose} disabled={!question.trim()} className="w-full">
            Create Poll
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
