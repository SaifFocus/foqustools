import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => {
    const title = "Pricing — Free & Pro Plans | FoqusTools";
    const description =
      "Use 90+ online tools free, forever. Upgrade to Pro for higher AI limits, batch processing and priority speed.";
    const url = "https://foqustools.lovable.app/pricing";
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
  component: PricingPage,
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need for everyday tasks.",
    features: [
      "Access to all 90+ tools",
      "Unlimited browser-based conversions",
      "Basic AI generations",
      "No signup required",
    ],
    cta: "Get started",
    to: "/tools" as const,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For creators, teams and power users.",
    features: [
      "Higher AI generation limits",
      "Batch processing",
      "Priority queue & faster results",
      "No ads, ever",
      "Email support",
    ],
    cta: "Start Pro",
    to: "/signup" as const,
    highlight: true,
  },
  {
    name: "Team",
    price: "Custom",
    period: "contact us",
    description: "Shared workspaces and SSO for organizations.",
    features: [
      "Everything in Pro",
      "Shared workspace & team billing",
      "SSO / SAML",
      "Dedicated account manager",
    ],
    cta: "Talk to us",
    to: "/contact" as const,
    highlight: false,
  },
];

function PricingPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <header className="text-center max-w-2xl mx-auto mb-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Simple, honest pricing</h1>
        <p className="text-muted-foreground mt-3">Start free. Upgrade when you need more power. Cancel anytime.</p>
      </header>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-3xl p-7 border bg-card flex flex-col ${
              p.highlight ? "border-primary/60 shadow-[var(--shadow-card)] ring-1 ring-primary/30" : "border-border/60"
            }`}
          >
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
            <ul className="mt-6 space-y-2.5 text-sm flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 items-start">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={`mt-7 ${p.highlight ? "bg-[image:var(--gradient-brand)] text-primary-foreground" : ""}`}
              variant={p.highlight ? "default" : "outline"}
            >
              <Link to={p.to}>{p.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-10">
        Prices shown in USD. Taxes may apply. Need an invoice? <Link to="/contact" className="underline">Contact us</Link>.
      </p>
    </div>
  );
}