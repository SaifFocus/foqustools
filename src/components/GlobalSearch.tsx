"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Command } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { categories, tools } from "@/lib/tools";
import type { CategorySlug } from "@/lib/tools";

const grouped = categories.map((c) => ({
  category: c,
  tools: tools.filter((t) => t.category === c.slug),
}));

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/80 bg-background/80 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-sm"
        aria-label="Open search"
      >
        <Search className="w-4 h-4" />
        <span className="hidden xl:inline">Search tools…</span>
        <kbd className="hidden xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border bg-muted text-[10px] font-mono font-medium">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-md hover:bg-accent/40"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tools, categories, keywords…" />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>
          {grouped.map((g) => (
            <CommandGroup key={g.category.slug} heading={g.category.name}>
              {g.tools.map((t) => (
                <CommandItem
                  key={t.slug}
                  value={`${t.name} ${t.description}`}
                  onSelect={() => {
                    setOpen(false);
                    navigate({ to: "/tool/$slug", params: { slug: t.slug } });
                  }}
                >
                  <t.icon className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate font-medium">{t.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{t.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
