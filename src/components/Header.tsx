import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const navLinks = [
  { to: "/tools", label: "All Tools" },
  { to: "/category/image", label: "Image" },
  { to: "/category/pdf", label: "PDF" },
  { to: "/category/ai", label: "AI" },
  { to: "/category/dev", label: "Developer" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/40 transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground rounded-md bg-accent/40" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button>
          <Button asChild size="sm" className="bg-[image:var(--gradient-brand)] text-primary-foreground hover:opacity-90 shadow-[var(--shadow-soft)]">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="lg:hidden p-2 rounded-md hover:bg-accent/40" aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="container mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent/40">{l.label}</Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" size="sm" className="flex-1"><Link to="/login">Sign in</Link></Button>
              <Button asChild size="sm" className="flex-1 bg-[image:var(--gradient-brand)] text-primary-foreground"><Link to="/signup">Get Started</Link></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}