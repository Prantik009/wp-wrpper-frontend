// frontend/app/(dashboard)/chat/_components/chatContainer/chatMain/_components/(modals)/CreateTicketModal.tsx
"use client";

import { useState } from "react";
import { X, ChevronDown, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import { useTicketStore } from "@/store/useTicketStore";
import { Button } from "@/components/ui/button";

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName: string;
  senderPhone: string;
  messageContent: string;
}

export default function CreateTicketModal({
  isOpen,
  onClose,
  senderName,
  senderPhone,
  messageContent,
}: CreateTicketModalProps) {
  const addTicket = useTicketStore((s: any) => s.addTicket);

  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState<"open" | "closed">("open");
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [dueDate, setDueDate] = useState<string | null>(null);

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const USERS = ["Unassigned", "Taniya Das", "Arjun Singh", "Riya Patel"];
  const PRIORITIES = ["Low", "Medium", "High"];

  const handleCreate = () => {
    if (!assignedTo || assignedTo === "Unassigned") {
      toast.error("Please assign the ticket before creating it.");
      return;
    }

    addTicket({
      id: Date.now().toString(),
      subject,
      senderName,
      senderPhone,
      message: messageContent,
      status,
      assignedTo,
      priority,
      dueDate,
      timestamp: new Date().toISOString(),
    });
    onClose();
    toast.success("Ticket created successfully!");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background border border-border rounded-xl shadow-lg w-full max-w-lg p-6 space-y-6"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-base font-semibold">{senderName}</h2>
          <button
            onClick={onClose}
            className="hover:bg-muted rounded-full p-1 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* subject */}
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Ticket Subject"
          className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-primary"
        />

        {/* message preview */}
        <div className="border-l-4 border-border pl-3 text-sm text-muted-foreground">
          <p className="font-semibold">{senderPhone}</p>
          <p>{messageContent}</p>
        </div>

        {/* quick controls */}
        <div className="flex flex-wrap gap-3 text-sm">
          {/* status toggle */}
          <button
            onClick={() => setStatus(status === "open" ? "closed" : "open")}
            className="flex items-center gap-2"
          >
            <span
              className={`h-3.5 w-3.5 rounded-full border-2 ${
                status === "open" ? "border-destructive" : "border-green-500"
              }`}
            />
            {status === "open" ? "Pending" : "Resolved"}
          </button>

          {/* assign */}
          <div className="relative">
            <button
              onClick={() => {
                setIsAssignOpen((p) => !p);
                setIsPriorityOpen(false);
              }}
              className="border border-border rounded-md px-2 py-1 flex items-center gap-1"
            >
              <ChevronDown className="h-3 w-3" />
              {assignedTo || "Unassigned"}
            </button>
            {isAssignOpen && (
              <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-md z-10">
                {USERS.map((u) => (
                  <div
                    key={u}
                    className="px-3 py-1.5 hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setAssignedTo(u);
                      setIsAssignOpen(false);
                    }}
                  >
                    {u}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* priority */}
          <div className="relative">
            <button
              onClick={() => {
                setIsPriorityOpen((p) => !p);
                setIsAssignOpen(false);
              }}
              className="border border-border rounded-md px-2 py-1 flex items-center gap-1"
            >
              <ChevronDown className="h-3 w-3" />
              {priority}
            </button>
            {isPriorityOpen && (
              <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-md z-10">
                {PRIORITIES.map((p) => (
                  <div
                    key={p}
                    onClick={() => {
                      setPriority(p as any);
                      setIsPriorityOpen(false);
                    }}
                    className="px-3 py-1.5 hover:bg-muted cursor-pointer"
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* due date (hidden for now) */}
          <div className="hidden items-center gap-1">
            <Calendar className="h-4 w-4 text-primary" />
            {dueDate && (
              <span className="text-xs">
                {moment(dueDate).format("DD-MMM-YYYY")}
              </span>
            )}
          </div>
        </div>

        {/* footer */}
        <div className="flex justify-end pt-3 border-t border-border">
          <Button
            onClick={handleCreate}
            disabled={
              !subject.trim() || !assignedTo || assignedTo === "Unassigned"
            }
            className={`${
              !subject.trim() || !assignedTo || assignedTo === "Unassigned"
                ? "opacity-60 cursor-not-allowed"
                : "bg-primary text-primary-foreground"
            }`}
          >
            Create Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
