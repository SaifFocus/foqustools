import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { categories } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const cat = categories.find((c) => c.slug === tool.category)!;
  const Icon = tool.icon;
  return (
    <Link
      to="/tool/$slug"
      params={{ slug: tool.slug }}
      className="group relative flex flex-col gap-3 p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all"
    >
      <div className={`w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br ${cat.gradient} text-white shadow-sm`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight">{tool.name}</h3>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
      </div>
    </Link>
  );
}