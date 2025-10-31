// frontend/components/OTP.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Otp = () => {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isVerifying, setIsVerifying] = useState(false);
    const [timer, setTimer] = useState(30);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) inputsRef.current[index + 1]?.focus();
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            toast.warning("Please enter all 6 digits");
            return;
        }

        const email = new URLSearchParams(window.location.search).get("email");
        if (!email) {
            toast.error("Email missing from URL");
            return;
        }

        try {
            setIsVerifying(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/verify-otp`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp: enteredOtp }),
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("OTP verified successfully");
                // saveUser(data.user);
                router.push(data.redirect || "/organisation/dashboard");
            } else {
                toast.error(data.message || "Invalid OTP");
            }
        } catch (err) {
            console.error("Verify error:", err);
            toast.error("Something went wrong");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0) return;
        const email = new URLSearchParams(window.location.search).get("email");
        if (!email) return;

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
                toast.info("OTP resent successfully");
                setOtp(Array(6).fill(""));
                setTimer(30);
            } else {
                toast.error(data.message || "Failed to resend OTP");
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div className="space-y-2 text-center">
                <div className="flex justify-center mb-6">
                    <img
                        src="/logo_com.png"
                        alt="Cheentak"
                        className="w-12 h-auto"
                        draggable={false}
                    />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Check your email
                </h1>
                <p className="text-sm text-muted-foreground">
                    We sent a verification code to your email
                </p>
            </div>

            {/* OTP Inputs */}
            <div className="space-y-6">
                <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputsRef.current[index] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={cn(
                                "size-12 text-center text-lg font-semibold rounded-md border border-input bg-background",
                                "focus:ring-2 focus:ring-ring focus:border-primary outline-none transition-colors"
                            )}
                        />
                    ))}
                </div>

                <Button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="w-full h-11"
                >
                    {isVerifying ? "Verifying..." : "Verify Code"}
                </Button>
            </div>

            {/* Resend OTP */}
            <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                    Didn't receive the code?{" "}
                    <button
                        onClick={handleResendOtp}
                        disabled={timer > 0}
                        className={cn(
                            "font-medium text-primary hover:text-primary/90 transition-colors",
                            timer > 0 && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        Resend {timer > 0 && `(${timer}s)`}
                    </button>
                </p>
            </div>
        </div>
    );
};