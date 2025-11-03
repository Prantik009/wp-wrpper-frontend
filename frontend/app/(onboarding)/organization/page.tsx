// app/(onboarding)/organization/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrganizationFormPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", website: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔗 Future: call backend create org endpoint
    router.push("/verify");
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-semibold">Create your Organization</h1>
      <p className="text-sm text-muted-foreground">
        Let’s set up your workspace. You can edit details later.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-2">
          <Label htmlFor="name">Organization Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="CheenTalk"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            name="website"
            placeholder="https://example.com"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center">
        Step 1 of 3 — Organization Details
      </p>
    </div>
  );
}
