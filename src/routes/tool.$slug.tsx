import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getTool } from "@/lib/tools";
import { ToolPage } from "@/components/tools/ToolPage";

export const Route = createFileRoute("/tool/$slug")({
  head: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) return { meta: [{ title: "Tool not found — FoqusTools" }] };
    const title = `${tool.name} — Free Online Tool | FoqusTools`.slice(0, 60);
    const url = `https://foqustools.lovable.app/tool/${tool.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: tool.description },
        { property: "og:title", content: title },
        { property: "og:description", content: tool.description },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: tool.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://foqustools.lovable.app/" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "https://foqustools.lovable.app/tools" },
              { "@type": "ListItem", position: 3, name: tool.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  component: ToolRoute,
  notFoundComponent: () => (
    <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Tool not found</h1>
      <p className="text-muted-foreground mt-2">That tool doesn't exist.</p>
      <Button asChild className="mt-6"><Link to="/tools">Browse all tools</Link></Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mt-2">{error.message}</p>
    </div>
  ),
});

function ToolRoute() {
  const { tool } = Route.useLoaderData();
  return <ToolPage tool={tool} />;
}