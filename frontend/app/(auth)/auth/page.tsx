// app/(auth)/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Login } from "@/components/auth/Login";
import { Otp } from "@/components/auth/Otp";

const subtitle =
  "Setup Cheentak AI agent to respond to customers on WhatsApp groups and chats. Train it on your knowledge base, and set rules for ticket creation & seamless handoffs.";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* LEFT PANEL */}
      <div className="flex flex-1 items-center justify-center px-6 py-8 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {/* Back Button (OTP only) */}
          {tab === "otp" && (
            <Button
              variant="ghost"
              onClick={() => router.push("/auth")}
              className="flex items-center gap-2 px-0 text-muted-foreground hover:text-foreground mb-4"
            >
              <ChevronLeft className="size-4" />
              Back to login
            </Button>
          )}

          {/* Dynamic Section */}
          <div className="w-full">{tab === "otp" ? <Otp /> : <Login />}</div>
        </div>
      </div>

      {/* RIGHT PANEL (Marketing / Visual Side) */}
      <div className="hidden lg:flex flex-1 bg-muted/50 border-l border-border">
        <div className="flex flex-col justify-center w-full max-w-2xl mx-auto px-12 space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <div className="size-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-primary">AI Customer Support</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Intelligent Customer Conversations
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "90% Faster", sub: "Response times" },
              { label: "24/7 Support", sub: "Always available" },
              { label: "Secure", sub: "Enterprise grade" },
              { label: "100+ Teams", sub: "Trusted by many" },
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.label}</h3>
                <p className="text-xs text-muted-foreground">{f.sub}</p>
              </div>
            ))}
          </div>

          {/* Demo Chat Preview */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-3 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-foreground">
                Live Demo Preview
              </span>
            </div>

            <div className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                  <p className="text-sm">How can I track my order?</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 max-w-md">
                  <p className="text-sm text-foreground">
                    I can help you track your order! Please provide your order ID and I’ll get the latest status.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => window.open("https://docs.cheentak.ai", "_blank")}
            className="w-fit"
          >
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
