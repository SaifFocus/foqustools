import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "foqustools.cookie-consent";

type Choice = "accepted" | "rejected";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (!v) {
        const t = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  function decide(choice: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: new Date().toISOString() }));
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-6 animate-in slide-in-from-bottom-6 fade-in duration-500"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-card/95 backdrop-blur shadow-[var(--shadow-card)] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 shrink-0 rounded-xl grid place-items-center bg-[image:var(--gradient-brand)] text-primary-foreground">
          <Cookie className="w-5 h-5" />
        </div>
        <p className="text-sm text-foreground/90 flex-1">
          We use cookies to improve your experience and measure traffic. You can change your mind at any time.
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="ghost" size="sm" onClick={() => decide("rejected")}>Reject</Button>
          <Button size="sm" onClick={() => decide("accepted")} className="bg-[image:var(--gradient-brand)] text-primary-foreground rounded-full px-5">
            Accept
          </Button>
          <button
            onClick={() => decide("rejected")}
            aria-label="Dismiss"
            className="sm:hidden p-1.5 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}