import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative w-8 h-8 rounded-xl bg-[image:var(--gradient-brand)] grid place-items-center shadow-[var(--shadow-soft)] transition-transform group-hover:scale-105">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <span className="font-bold text-lg tracking-tight">
        Foqus<span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">Tools</span>
      </span>
    </Link>
  );
}