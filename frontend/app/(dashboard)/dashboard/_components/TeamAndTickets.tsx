"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import ActiveButton from "@/components/GlobalActiveButton";
import { RiTeamFill } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import { Clock3 } from "lucide-react";

export const TeamAndTickets = ({
  team,
  tickets,
}: {
  team: { online: number; total: number };
  tickets: { open: number; closed: number };
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    {/* Team Card */}
    <Card className="shadow-sm border border-border">
      <CardHeader className="py-0.5 border-b border-border flex items-center gap-2">
        <RiTeamFill className="text-primary" />
        <CardTitle className="text-sm font-medium text-foreground">
          Team
        </CardTitle>
      </CardHeader>
      <CardContent className="py-1">
        <p className="text-xs text-muted-foreground mb-2">
          {team.online} of {team.total} online
        </p>
        <div className="flex -space-x-1">
          <ActiveButton name="Ayeshee" />
          <ActiveButton name="Bidisha" />
        </div>
      </CardContent>
    </Card>

    {/* Tickets Card */}
    <Card className="col-span-2 shadow-sm border border-border">
      <CardHeader className="py-0.5 border-b border-border flex items-center gap-2">
        <IoTicket className="text-primary" />
        <CardTitle className="text-sm font-medium text-foreground">
          Tickets
        </CardTitle>
      </CardHeader>
      <CardContent className="py-1 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="size-2 border-2 border-destructive rounded-full" />
            Open
          </span>
          <span className="text-lg font-semibold mt-1">{tickets.open}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock3 className="size-3 text-green-500" />
            Closed
          </span>
          <span className="text-lg font-semibold mt-1">{tickets.closed}</span>
        </div>
      </CardContent>
    </Card>
  </div>
);
