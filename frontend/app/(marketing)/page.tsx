// frontend/app/(marketing)/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              WhatsApp at scale — broadcasts, scheduling & a multi-agent inbox
            </h1>
            <p className="mt-4 text-muted-foreground text-base md:text-lg">
              Connect your number, collaborate with your team, and launch reliable campaigns in minutes.
            </p>

            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/auth">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth">Start free</Link>
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              No credit card needed • 2-minute setup
            </p>
          </div>

          {/* Hero Image (Random Cloud Image) */}
          <div className="relative w-full max-w-lg mx-auto">
            <Image
              src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=960&h=640&fit=crop&q=80"
              alt="PaniniEight Dashboard Preview"
              width={960}
              height={640}
              priority
              className="rounded-xl border shadow-sm w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center tracking-tight mb-10">
            Get started in 3 steps
          </h2>
          <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { t: "Google Sign-in", d: "Create your workspace with one click." },
              { t: "Link WhatsApp", d: "Scan the secure QR code to connect." },
              { t: "Start Messaging", d: "Send, schedule, and collaborate instantly." },
            ].map((step, i) => (
              <li
                key={step.t}
                className="rounded-xl border bg-background p-6 hover:shadow-sm transition"
              >
                <div className="h-8 w-8 rounded-full border flex items-center justify-center text-sm font-semibold mb-3 bg-muted">
                  {i + 1}
                </div>
                <div className="font-medium">{step.t}</div>
                <p className="text-sm text-muted-foreground mt-1">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Ready to scale WhatsApp?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start free or sign in to continue where you left off.
          </p>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/auth">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth">Start free</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
