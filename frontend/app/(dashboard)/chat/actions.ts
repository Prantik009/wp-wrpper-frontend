// app/(dashboard)/chat/actions.ts
import axios from "axios";
import { z } from "zod";

// 🧩 Schema Validation with Zod
const ChatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  sender: z.enum(["user", "contact"]),
  timestamp: z.string(),
});

const ChatUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  lastMessage: z.string().optional(),
  date: z.string().optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatUser = z.infer<typeof ChatUserSchema>;

// Dummy fallback data
const dummyChats: ChatUser[] = [
  { id: "1", name: "Ruthvik", phone: "+91 98765 43210", lastMessage: "Hey! How are you?", date: "Today" },
  { id: "2", name: "Pragya", phone: "+91 98311 12345", lastMessage: "Let's meet tomorrow.", date: "Yesterday" },
  { id: "3", name: "Arjun", phone: "+91 98200 87654", lastMessage: "Got the project files?", date: "Today" },
  { id: "4", name: "Sneha", phone: "+91 98111 65432", lastMessage: "Don’t forget the meeting at 5.", date: "2 days ago" },
  { id: "5", name: "Vikram", phone: "+91 99000 12121", lastMessage: "Sure, will check and let you know.", date: "3 days ago" },
  { id: "6", name: "Ananya", phone: "+91 98760 55443", lastMessage: "That movie was great!", date: "Today" },
  { id: "7", name: "Rohan", phone: "+91 99123 99887", lastMessage: "Let's plan a trip soon.", date: "Yesterday" },
  { id: "8", name: "Kavya", phone: "+91 98234 55678", lastMessage: "Call me when you’re free.", date: "Today" },
  { id: "9", name: "Amit", phone: "+91 99987 22119", lastMessage: "Good night!", date: "Yesterday" },
  { id: "10", name: "Meera", phone: "+91 98123 77711", lastMessage: "Thanks for your help!", date: "3 days ago" },
  { id: "11", name: "Sarthak", phone: "+91 98011 56432", lastMessage: "Did you complete the assignment?", date: "Today" },
  { id: "12", name: "Neha", phone: "+91 98200 22190", lastMessage: "I'll join the call in 5 mins.", date: "Yesterday" },
  { id: "13", name: "Aditi", phone: "+91 99977 12367", lastMessage: "I loved your new post!", date: "4 days ago" },
  { id: "14", name: "Manish", phone: "+91 99331 88990", lastMessage: "Let’s catch up this weekend.", date: "Today" },
  { id: "15", name: "Priya", phone: "+91 98111 55667", lastMessage: "I sent you the notes.", date: "Yesterday" },
  { id: "16", name: "Rahul", phone: "+91 99444 77733", lastMessage: "Are you coming to the party?", date: "Today" },
  { id: "17", name: "Isha", phone: "+91 98666 22211", lastMessage: "I'll call you later.", date: "2 days ago" },
  { id: "18", name: "Nikhil", phone: "+91 98221 44550", lastMessage: "That sounds good!", date: "Yesterday" },
  { id: "19", name: "Divya", phone: "+91 99771 98233", lastMessage: "See you in class tomorrow.", date: "Today" },
  { id: "20", name: "Aarav", phone: "+91 98345 90877", lastMessage: "Let’s play cricket tomorrow.", date: "2 days ago" },
  { id: "21", name: "Simran", phone: "+91 98456 11223", lastMessage: "Good morning!", date: "Today" },
  { id: "22", name: "Deepak", phone: "+91 98100 98989", lastMessage: "Will ping you after lunch.", date: "Yesterday" },
  { id: "23", name: "Tanvi", phone: "+91 99900 76543", lastMessage: "That’s hilarious 😂", date: "Today" },
  { id: "24", name: "Harsh", phone: "+91 98321 55678", lastMessage: "Meeting was productive.", date: "2 days ago" },
  { id: "25", name: "Ishaan", phone: "+91 99200 88776", lastMessage: "Did you talk to him?", date: "Yesterday" },
  { id: "26", name: "Ritika", phone: "+91 98400 34343", lastMessage: "I'll send the link shortly.", date: "Today" },
  { id: "27", name: "Aditya", phone: "+91 98980 88877", lastMessage: "Done with the edits.", date: "Yesterday" },
  { id: "28", name: "Komal", phone: "+91 98210 44321", lastMessage: "See you at the cafe!", date: "Today" },
  { id: "29", name: "Varun", phone: "+91 99119 55221", lastMessage: "Can you share the doc?", date: "3 days ago" },
  { id: "30", name: "Tanya", phone: "+91 98289 66754", lastMessage: "Loved the new update!", date: "Yesterday" },
  { id: "31", name: "Yash", phone: "+91 99455 22100", lastMessage: "Let's play BGMI tonight!", date: "Today" },
  { id: "32", name: "Mira", phone: "+91 98123 55590", lastMessage: "Dinner was awesome!", date: "Yesterday" },
  { id: "33", name: "Saanvi", phone: "+91 98887 12121", lastMessage: "Please send me the file.", date: "Today" },
  { id: "34", name: "Kunal", phone: "+91 98009 90876", lastMessage: "Heading out now.", date: "Yesterday" },
  { id: "35", name: "Trisha", phone: "+91 98989 33456", lastMessage: "Will be there in 10 mins.", date: "2 days ago" },
  { id: "36", name: "Gaurav", phone: "+91 98233 77890", lastMessage: "Cool, thanks!", date: "Today" },
  { id: "37", name: "Nisha", phone: "+91 98777 22334", lastMessage: "Take care 😊", date: "Yesterday" },
  { id: "38", name: "Ravi", phone: "+91 99666 11223", lastMessage: "Let's code tomorrow.", date: "3 days ago" },
  { id: "39", name: "Pooja", phone: "+91 98155 88900", lastMessage: "Thanks for reminding me!", date: "Today" },
  { id: "40", name: "Jay", phone: "+91 98221 33455", lastMessage: "Catch you later!", date: "Yesterday" },
];


const dummyMessages: ChatMessage[] = [
  { id: "1", content: "Hello there 👋", sender: "contact", timestamp: new Date().toISOString() },
  { id: "2", content: "Hi! How are you?", sender: "user", timestamp: new Date().toISOString() },
];

// 🧠 Utility to check backend availability
async function backendAvailable() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/ping`);
    return res.ok;
  } catch {
    return false;
  }
}

// 🧩 Fetch Chat List
export async function fetchChatList(): Promise<ChatUser[]> {
  const hasBackend = await backendAvailable();
  if (!hasBackend) return dummyChats;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chats`);
    return z.array(ChatUserSchema).parse(res.data);
  } catch (error) {
    console.warn("Chat list fallback → using dummy data");
    return dummyChats;
  }
}

// 🧩 Fetch Messages for a Chat
export async function fetchMessages(chatId: string): Promise<ChatMessage[]> {
  const hasBackend = await backendAvailable();
  if (!hasBackend) return dummyMessages;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}/messages`);
    return z.array(ChatMessageSchema).parse(res.data);
  } catch (error) {
    console.warn("Message fetch fallback → using dummy data");
    return dummyMessages;
  }
}
