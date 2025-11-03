

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Message as ChatMessage, Chat as ChatUser } from "@/components/layouts/chat/types";

export interface TicketFormData {
  subject: string;
  senderName?: string;
  senderPhone?: string;
  priority: "low" | "medium" | "high";
  messageContent: string;
}

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: ChatMessage;
  sender?: ChatUser;
  onCreateTicket?: (data: TicketFormData) => void;
}

export default function CreateTicketModal({
  isOpen,
  onClose,
  message,
  sender,
  onCreateTicket,
}: CreateTicketModalProps) {
  const [formData, setFormData] = React.useState<TicketFormData>({
    subject: "",
    senderName: "",
    senderPhone: "",
    priority: "medium",
    messageContent: "",
  });

  React.useEffect(() => {
    if (isOpen && message && sender) {
      setFormData({
        subject: message.content.length > 40 ? message.content.slice(0, 40) + "..." : message.content,
        senderName: sender.name || "",
        senderPhone: sender.phone || "",
        priority: "medium",
        messageContent: message.content,
      });
    }
  }, [isOpen, message, sender]);

  const handleChange = (field: keyof TicketFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.subject.trim()) return;
    onCreateTicket?.(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md bg-background text-foreground border-border shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Create Ticket</DialogTitle>
            </DialogHeader>

            <motion.div
              key="ticketForm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 mt-2"
            >
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter subject..."
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    placeholder="Name"
                    value={formData.senderName}
                    onChange={(e) => handleChange("senderName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderPhone">Phone</Label>
                  <Input
                    id="senderPhone"
                    placeholder="+91..."
                    value={formData.senderPhone}
                    onChange={(e) => handleChange("senderPhone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(v: "low" | "medium" | "high") => handleChange("priority", v)}
                >
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="messageContent">Message</Label>
                <Textarea
                  id="messageContent"
                  rows={4}
                  placeholder="Message content..."
                  value={formData.messageContent}
                  onChange={(e) => handleChange("messageContent", e.target.value)}
                />
              </div>
            </motion.div>

            <DialogFooter className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={onClose} className="border-border">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-primary text-primary-foreground">
                Create Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
