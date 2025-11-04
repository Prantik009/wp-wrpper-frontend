// frontend/app/(dashboard)/tickets/page.tsx

"use client";

import { useTicketStore } from "@/store/useTicketStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { Trash2, Search, Plus, CheckCircle, XCircle } from "lucide-react";

export default function TicketsPage() {
  const { tickets, updateTicket, removeTicket } = useTicketStore();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return tickets;
    return tickets.filter((t: any) =>
      t.subject.toLowerCase().includes(search.toLowerCase())
    );
  }, [tickets, search]);

  if (tickets.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-3">
        <div className="text-5xl">🎟️</div>
        <h2 className="text-lg font-semibold">No tickets yet</h2>
        <p className="text-muted-foreground">Create your first ticket to get started</p>
      </div>
    );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tickets</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Ticket
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t: any) => (
          <div
            key={t.id}
            className="border border-border rounded-lg p-4 bg-background shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-base line-clamp-1">{t.subject}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {t.senderName} • {t.senderPhone}
            </p>
            <p className="text-sm line-clamp-2 mb-3">{t.message}</p>

            <div className="flex gap-2 flex-wrap">
              <Badge
                variant={t.status === "open" ? "destructive" : "default"}
                className={t.status !== "open" ? "bg-green-500 text-white" : ""}
              >
                {t.status}
              </Badge>
              <Badge>{t.priority}</Badge>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-border">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  updateTicket(t.id, {
                    status: t.status === "open" ? "closed" : "open",
                  })
                }
              >
                {t.status === "open" ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1" />
                )}
                {t.status === "open" ? "Close" : "Reopen"}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeTicket(t.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
