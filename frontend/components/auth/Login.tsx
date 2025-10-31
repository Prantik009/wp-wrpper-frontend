// frontend/components/Login.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("OTP sent to your email");
        router.push(`/auth?tab=otp&email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/google`;
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/logo_com.png"
            alt="Cheentak logo"
            className="w-12 h-auto"
            draggable={false}
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your Cheentak account
        </p>
      </div>

      {/* Google Button */}
      <Button
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className={cn(
          "w-full h-11 flex items-center justify-center gap-3 border-border"
        )}
      >
        <img src="/google.svg" alt="Google" className="w-4 h-4" />
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11"
        >
          {isLoading ? "Sending OTP..." : "Continue with Email"}
        </Button>
      </form>

      {/* Terms */}
      <p className="text-xs text-center text-muted-foreground px-4">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export const Login = () => {
  return (
    <LoginCard />
  );
};