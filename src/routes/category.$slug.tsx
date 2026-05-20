import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { categories, tools, type CategorySlug } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    const cat = loaderData?.category;
    const name = cat?.name ?? "Category";
    const desc = cat?.description ?? "Browse tools by category.";
    const title = `${name} — Free Online ${cat?.short ?? ""} Tools | FoqusTools`;
    const url = `https://foqustools.lovable.app/category/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Category not found</h1>
      <p className="text-muted-foreground mt-2">That category doesn't exist.</p>
      <Link to="/tools" className="text-primary underline mt-4 inline-block">Browse all tools</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const slug = category.slug as CategorySlug;
  const items = tools.filter((t) => t.category === slug);
  const Icon = category.icon;
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        <Link to="/tools" className="hover:text-foreground">All Tools</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{category.name}</span>
      </nav>
      <header className="flex items-start gap-4 mb-10">
        <div className={`w-14 h-14 shrink-0 rounded-2xl grid place-items-center bg-gradient-to-br ${category.gradient} text-white shadow-[var(--shadow-soft)]`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">{category.description}</p>
          <p className="text-xs text-muted-foreground mt-2">{items.length} tools</p>
        </div>
      </header>
      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-2xl">
          <p className="text-muted-foreground">No tools in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      )}
    </div>
  );
}