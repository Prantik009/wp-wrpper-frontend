"use client";

import { useEffect, useState } from "react";
import { fetchDashboardData, DashboardData } from "./api";
import { DashboardStatsCards } from "./_components/DashboardStatsCards";
import { TeamAndTickets } from "./_components/TeamAndTickets";
import { QuickLinks } from "./_components/QuickLinks";
import { FeatureCards } from "./_components/FeatureCards";
import { PhoneStatus } from "./_components/PhoneStatus";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [orgInfo, setOrgInfo] = useState({
    name: "CheenTalk",
    logo: "",
  });

  useEffect(() => {
    fetchDashboardData().then((res) => {
      setData(res);
      setOrgInfo({
        name: res?.orgName || "CheenTalk",
        logo: res?.orgLogo || "",
      });
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const getInitial = (name: string) => name?.[0]?.toUpperCase() || "C";

  return (
    <div className="flex-1 min-h-screen bg-background text-foreground p-3 md:p-4 overflow-y-auto">
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {orgInfo.logo ? (
            <img
              src={orgInfo.logo}
              alt={orgInfo.name}
              className="h-8 w-8 rounded-md object-cover border border-border"
            />
          ) : (
            <div className="h-8 w-8 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold text-sm">
              {getInitial(orgInfo.name)}
            </div>
          )}
          <h1 className="text-base sm:text-lg font-semibold tracking-tight">
            {orgInfo.name} Dashboard
          </h1>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
        {/* Left Section */}
        <div className="flex flex-col gap-4 lg:w-[65%] w-full">
          <DashboardStatsCards data={data.stats} />
          <TeamAndTickets team={data.team} tickets={data.tickets} />

          {/* Hidden on small devices */}
          <div className="hidden md:block">
            <QuickLinks />
            <FeatureCards data={data.features} />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-[35%] w-full">
          <PhoneStatus data={data.phoneStatus} />
        </div>
      </div>
    </div>
  );
}
