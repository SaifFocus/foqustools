import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { categories, tools as allTools } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { resolveRunner, howToFor } from "@/components/tools/registry";

export function ToolPage({ tool }: { tool: Tool }) {
  const cat = categories.find((c) => c.slug === tool.category)!;
  const Icon = tool.icon;
  const related = allTools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);
  const steps = howToFor(tool);
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        <Link to="/tools" className="hover:text-foreground">All Tools</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{cat.name}</span>
      </nav>
      <header className="flex items-start gap-4 mb-8">
        <div className={`w-14 h-14 shrink-0 rounded-2xl grid place-items-center bg-gradient-to-br ${cat.gradient} text-white shadow-[var(--shadow-soft)]`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tool.name}</h1>
          <p className="text-muted-foreground mt-1">{tool.description}</p>
        </div>
      </header>
      <section className="rounded-3xl bg-card border border-border/60 shadow-[var(--shadow-card)] p-6 md:p-8">
        {resolveRunner(tool)}
      </section>
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">How to use it</h2>
        <ol className="grid sm:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <li key={i} className="rounded-2xl border bg-card p-5">
              <div className="text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</div>
              <p className="mt-1 text-sm">{s}</p>
            </li>
          ))}
        </ol>
      </section>
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Related tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>
      )}
    </div>
  );
}