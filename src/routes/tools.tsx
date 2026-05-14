import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, tools, type CategorySlug } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";

export const Route = createFileRoute("/tools")({
  head: () => {
    const title = "All Tools — Browse 90+ Online Utilities | FoqusTools";
    const description =
      "Browse 90+ free online tools across image, PDF, AI, conversion, design and developer categories. No signup, no upload — works in your browser.";
    const url = "https://foqustools.lovable.app/tools";
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
  component: AllTools,
});

function AllTools() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategorySlug | "all">("all");
  const filtered = useMemo(() => tools.filter((t) =>
    (cat === "all" || t.category === cat) &&
    (!q.trim() || t.name.toLowerCase().includes(q.toLowerCase()) || t.description.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">All Tools</h1>
        <p className="text-muted-foreground mt-2">Find the right tool — fast.</p>
      </header>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools…" className="pl-11 h-12 rounded-xl" />
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant={cat === "all" ? "default" : "outline"} size="sm" onClick={() => setCat("all")} className={cat === "all" ? "bg-[image:var(--gradient-brand)] text-primary-foreground" : ""}>All</Button>
        {categories.map((c) => (
          <Button key={c.slug} variant={cat === c.slug ? "default" : "outline"} size="sm" onClick={() => setCat(c.slug)} className={cat === c.slug ? "bg-[image:var(--gradient-brand)] text-primary-foreground" : ""}>
            <c.icon className="w-3.5 h-3.5" /> {c.short}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-2xl">
          <p className="text-muted-foreground">No tools match "{q}". Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      )}
    </div>
  );
}