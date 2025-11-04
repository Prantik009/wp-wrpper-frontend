import { create } from "zustand";

export interface Ticket {
  id: string;
  subject: string;
  senderName: string;
  senderPhone: string;
  message: string;
  status: "open" | "closed";
  assignedTo?: string | null;
  priority: "Low" | "Medium" | "High";
  dueDate?: string | null;
  label?: string | null;
  timestamp: string;
}

interface TicketStore {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  setSelectedTicket: (t: Ticket | null) => void;
  addTicket: (t: Ticket) => void;
  updateTicket: (id: string, data: Partial<Ticket>) => void;
  removeTicket: (id: string) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  selectedTicket: null,
  setSelectedTicket: (t) => set({ selectedTicket: t }),
  addTicket: (t) => set((s) => ({ tickets: [t, ...s.tickets] })),
  updateTicket: (id, data) =>
    set((s) => ({
      tickets: s.tickets.map((t) => (t.id === id ? { ...t, ...data } : t)),
    })),
  removeTicket: (id) =>
    set((s) => ({ tickets: s.tickets.filter((t) => t.id !== id) })),
}));
