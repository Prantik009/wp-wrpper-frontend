// app/(marketing)/layout.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b transition-colors">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold text-lg tracking-tight hover:text-primary transition-colors"
          >
            CheenTalk
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              ["Features", "/features"],
              ["Pricing", "/pricing"],
              ["FAQ", "/faq"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href="/auth">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth">Start free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t mt-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3 text-sm">
          <div>
            <div className="font-semibold text-base">CheenTalk</div>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              WhatsApp at scale for teams and campaigns.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-medium mb-2">Product</div>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/integrations">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-2">Company</div>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/security">Security</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-muted-foreground md:text-right">
            © {new Date().getFullYear()} CheenTalk. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
