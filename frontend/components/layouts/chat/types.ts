// frontend/components/layouts/chat/types.ts
export type TickStatus = "sent" | "delivered" | "seen";

export interface Message {
  id: string;
  content: string;
  sender: "agent" | "user";
  timestamp: string;
  status?: TickStatus;
  fromAccount?: string;
  type?: "text" | "poll"; // 👈 add
  pollData?: {            // 👈 add
    options: string[];
    multipleVotes: boolean;
    votes: number[];
  };
}

export interface Chat {
  id: string;
  userId: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  tickStatus?: TickStatus; // last outgoing message status
  accounts?: string[]; // numbers used in this chat (badges in list)
}

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}

export interface PhoneAccount {
  id: number;
  number: string;
  status: "Connected" | "Disconnected" | "Restart";
}
