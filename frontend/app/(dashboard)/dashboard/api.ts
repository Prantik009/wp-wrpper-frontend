// app/(dashboard)/dashboard/api.ts

// app/(dashboard)/dashboard/api.ts
import { z } from "zod";
import { clientGet } from "@/lib/apliClient";
import {
  dashboardCardData,
  cardData,
  phoneStatusData,
} from "./_components/data";

// ---- Schema for validation (when backend ready) ----
const DashboardSchema = z.object({
  stats: z.array(z.any()),
  features: z.array(z.any()),
  phoneStatus: z.array(z.any()),
  team: z.object({
    online: z.number(),
    total: z.number(),
  }),
  tickets: z.object({
    open: z.number(),
    closed: z.number(),
  }),
});

export type DashboardData = z.infer<typeof DashboardSchema>;

// ---- Main Fetch Function ----
export async function fetchDashboardData(): Promise<DashboardData> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

  // ✅ If backend is not configured, use dummy data
  if (!BACKEND_URL) {
    console.warn("⚠️ No backend configured, using dummy data.");
    return {
      stats: dashboardCardData,
      features: cardData,
      phoneStatus: phoneStatusData,
      team: { online: 2, total: 6 },
      tickets: { open: 30, closed: 0 },
    };
  }

  try {
    const data = await clientGet("/api/dashboard", DashboardSchema);
    return data;
  } catch (err) {
    console.warn("⚠️ Using dummy data due to API failure:", err);
    return {
      stats: dashboardCardData,
      features: cardData,
      phoneStatus: phoneStatusData,
      team: { online: 2, total: 6 },
      tickets: { open: 30, closed: 0 },
    };
  }
}
