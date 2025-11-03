"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ScheduleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [time, setTime] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Schedule Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
          <Button onClick={onClose} disabled={!time} className="w-full">
            Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
