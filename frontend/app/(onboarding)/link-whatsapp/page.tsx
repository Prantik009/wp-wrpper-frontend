// app/(onboarding)/link-whatsapp/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LinkWhatsappPage() {
  const router = useRouter();
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  useEffect(() => {
    // 🔗 Future: call backend to get WhatsApp QR URL
    setQrUrl("https://api.qrserver.com/v1/create-qr-code/?data=whatsapp://send?text=CheenTalk");
  }, []);

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-semibold">Link your WhatsApp</h1>
      <p className="text-sm text-muted-foreground">
        Scan this QR code to connect your WhatsApp number with CheenTalk.
      </p>

      <div className="flex justify-center">
        {qrUrl ? (
          <img
            src={qrUrl}
            alt="WhatsApp QR"
            className="w-56 h-56 border rounded-lg shadow-sm"
          />
        ) : (
          <p className="text-sm text-muted-foreground">Loading QR...</p>
        )}
      </div>

      <Button className="w-full" onClick={() => router.push("/dashboard")}>
        Proceed to Dashboard
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Step 3 of 3 — Link WhatsApp
      </p>
    </div>
  );
}
