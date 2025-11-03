"use client";

import { IoInformationCircleSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { firstPhoneOptions, secondPhoneOptions } from "./data";

const PhoneCard = ({ item }: { item: any }) => (
  <Card className="w-full flex flex-row sm:items-center sm:justify-between p-3 rounded-md shadow-sm border border-border hover:shadow transition-all duration-150">
    {/* LEFT SECTION */}
    <div className="flex items-center gap-3 mb-2 sm:mb-0 w-[60%]">
      <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
        {item.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium truncate">{item.number}</span>
        <span className="text-xs text-muted-foreground truncate line-clamp-1">
          {item.name}
        </span>
      </div>
    </div>

    {/* RIGHT SECTION */}
    <div className="flex items-center justify-end sm:justify-end gap-3 flex-wrap w-[40%]">
      <Button
        variant="outline"
        size="sm"
        className="text-xs h-7 px-2 whitespace-nowrap"
      >
        {item.label}
      </Button>

      <div className="flex items-center gap-1">
        <span
          className={`size-2 rounded-full ${
            item.statusColor === "green" ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span
          className={`text-xs font-medium ${
            item.statusColor === "green" ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.status}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <BsThreeDots className="cursor-pointer text-muted-foreground size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[150px]">
          {firstPhoneOptions.map((opt) => (
            <DropdownMenuItem key={opt.id}>
              {opt.icon}
              <span className="ml-2 text-sm">{opt.title}</span>
            </DropdownMenuItem>
          ))}
          {secondPhoneOptions.map((opt) => (
            <DropdownMenuItem
              key={opt.id}
              className="text-destructive focus:text-destructive"
            >
              {opt.icon}
              <span className="ml-2 text-sm">{opt.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </Card>
);

export const PhoneStatus = ({ data }: { data: any[] }) => (
  <section className="w-full">
    {/* HEADER */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm sm:text-base text-foreground">
          Phone Status
        </span>
        <IoInformationCircleSharp className="text-yellow-500 size-4" />
      </div>
      <span className="text-xs text-muted-foreground hidden sm:block">
        {data.length} connected device{data.length > 1 ? "s" : ""}
      </span>
    </div>

    {/* CARDS */}
    <div className="flex flex-col gap-3 w-full">
      {data.map((item) => (
        <PhoneCard key={item.id} item={item} />
      ))}
    </div>
  </section>
);
