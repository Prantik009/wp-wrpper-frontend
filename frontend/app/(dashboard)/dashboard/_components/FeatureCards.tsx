"use client";

import { Card } from "@/components/ui/card";
import { GlobalButton } from "@/components/GlobalLinkButton";
import { FaBookOpen, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

export const FeatureCards = ({ data }: { data: any[] }) => (
  <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-3">
    {data.map((card, i) => (
      <Card
        key={i}
        className="border border-border px-3 py-2 sm:p-4 rounded-md shadow-sm hover:shadow transition-all duration-150"
      >
        <Link href="#" className="flex items-center gap-2 mb-0.5">
          <span className="text-primary">{card.icon}</span>
          <span className="text-sm font-medium">{card.title}</span>
          <GoLinkExternal className="size-3 text-muted-foreground" />
        </Link>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          {card.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <GlobalButton
            link="https://docs.cheentak.ai"
            title="Docs"
            icon={<FaBookOpen className="size-4 text-yellow-400" />}
          />
          <GlobalButton
            link="https://youtube.com/@cheenta"
            title="Watch Tutorial"
            icon={<FaYoutube className="size-4 text-red-500" />}
          />
        </div>
      </Card>
    ))}
  </div>
);
