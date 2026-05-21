import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, tools } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";

export const Route = createFileRoute("/search")({
  head: () => {
    const title = "Search Tools — Find the Right Utility | FoqusTools";
    const description =
      "Search 90+ free online tools across image, PDF, AI, conversion, design and developer categories. Instant browser-based utilities.";
    const url = "https://foqustools.lovable.app/search";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term)
    );
  }, [q]);

  const groupedResults = useMemo(() => {
    return categories.map((c) => ({
      category: c,
      tools: results.filter((t) => t.category === c.slug),
    })).filter((g) => g.tools.length > 0);
  }, [results]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground mt-2">
          Find the right tool from 90+ free online utilities.
        </p>
      </header>

      <div className="relative max-w-xl mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tools, categories, keywords…"
          className="pl-12 h-14 rounded-2xl text-base shadow-[var(--shadow-card)] border-border/80 bg-card"
          autoFocus
        />
      </div>

      {q.trim() === "" ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Type a keyword above to search all tools.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((c) => (
              <Button
                key={c.slug}
                variant="outline"
                size="sm"
                asChild
              >
                <Link to="/category/$slug" params={{ slug: c.slug }}>
                  <c.icon className="w-3.5 h-3.5" /> {c.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-2xl">
          <p className="text-muted-foreground">
            No tools match "{q}". Try a different keyword.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((c) => (
              <Button
                key={c.slug}
                variant="outline"
                size="sm"
                asChild
              >
                <Link to="/category/$slug" params={{ slug: c.slug }}>
                  <c.icon className="w-3.5 h-3.5" /> {c.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedResults.map((g) => (
            <section key={g.category.slug}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <g.category.icon className="w-5 h-5 text-primary" />
                {g.category.name}
                <span className="text-sm font-normal text-muted-foreground">
                  ({g.tools.length})
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {g.tools.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
