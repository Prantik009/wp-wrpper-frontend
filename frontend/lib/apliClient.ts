// lib/clientApi.ts
import axios from "axios";
import { z } from "zod";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// generic GET wrapper with zod validation
export async function clientGet<T>(url: string, schema?: z.ZodSchema<T>) {
  const res = await api.get(url);
  const data = res.data;

  if (schema) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      console.warn("❌ Invalid data shape:", parsed.error);
      throw new Error("Invalid API response");
    }
    return parsed.data;
  }

  return data;
}
