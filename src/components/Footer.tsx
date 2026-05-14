import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { categories, popularTools } from "@/lib/tools";

export function Footer() {
  return (
   <footer className="border-t border-border/60 bg-background/40 backdrop-blur-sm mt-24">
      <div className="container mx-auto max-w-7xl px-4 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">Every tool you need to edit, convert, generate and build — all in one place.</p>
          <div className="flex gap-3 mt-4">
            <a aria-label="Twitter" href="#" className="p-2 rounded-md hover:bg-accent/40 text-muted-foreground hover:text-foreground"><Twitter className="w-4 h-4" /></a>
            <a aria-label="GitHub" href="#" className="p-2 rounded-md hover:bg-accent/40 text-muted-foreground hover:text-foreground"><Github className="w-4 h-4" /></a>
            <a aria-label="LinkedIn" href="#" className="p-2 rounded-md hover:bg-accent/40 text-muted-foreground hover:text-foreground"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Categories</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}><Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-foreground">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Popular</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {popularTools().slice(0, 6).map((t) => (
              <li key={t.slug}><Link to="/tool/$slug" params={{ slug: t.slug }} className="hover:text-foreground">{t.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} OmniTools. All rights reserved.</p>
          <p>Made with ❤️ for creators, teams and developers.</p>
        </div>
      </div>
    </footer>
  );
}