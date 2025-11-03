"use client";

import { Card, CardContent } from "@/components/ui/card";

export const DashboardStatsCards = ({ data }: { data: any[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {data.map((card) => (
      <Card key={card.id} className="shadow-sm border border-border">
        <CardContent className="px-2 py-0 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-primary">{card.icon}</span>
              <span className="text-xs font-medium">{card.title}</span>
            </div>
            <div className="flex gap-1.5 text-muted-foreground">
              {card.actionIcons?.map((a: any, i: number) => (
                <span key={i}>{a.icon}</span>
              ))}
            </div>
          </div>
          <div className="ml-1 mt-1 text-xl font-semibold text-foreground">
            {card.count}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
