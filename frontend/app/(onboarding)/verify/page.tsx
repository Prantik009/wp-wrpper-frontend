// app/(onboarding)/verify/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔗 Future: verify OTP API
    router.push("/link-whatsapp");
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-semibold">Verify your email</h1>
      <p className="text-sm text-muted-foreground">
        We sent a 6-digit verification code to your registered email.
      </p>

      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          className="tracking-widest text-center text-lg font-semibold"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
        />

        <Button type="submit" className="w-full">
          Verify & Continue
        </Button>
      </form>

      <Button
        variant="ghost"
        onClick={() => router.push("/organization")}
        className="text-xs text-muted-foreground"
      >
        ← Back to Organization Setup
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Step 2 of 3 — Verify Account
      </p>
    </div>
  );
}
