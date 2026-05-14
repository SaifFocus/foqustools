import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowRight, Zap, Shield, Sparkles, Wand2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, popularTools, tools } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { GlassDecor, GlassOrb, GlassStar } from "@/components/GlassDecor";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const matches = q.trim()
    ? tools.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()) || t.description.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-soft)]" />
        <div className="absolute -z-10 top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-30 bg-[image:var(--gradient-brand)]" />
        <GlassDecor />
        <div className="container mx-auto max-w-7xl px-4 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur text-xs font-medium text-muted-foreground mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> 90+ tools — and counting
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.05]">
            Every tool you need,{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">in one place.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Edit images, convert files, work with PDFs, generate content, and use developer utilities — instantly from your browser.
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); if (matches[0]) navigate({ to: "/tool/$slug", params: { slug: matches[0].slug } }); }}
            className="relative max-w-xl mx-auto mt-10"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for a tool…"
              className="pl-12 pr-32 h-14 rounded-2xl text-base shadow-[var(--shadow-card)] border-border/80 bg-card"
            />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 bg-[image:var(--gradient-brand)] text-primary-foreground">
              Search <ArrowRight className="w-4 h-4" />
            </Button>
            {matches.length > 0 && (
              <div className="absolute z-20 top-full mt-2 left-0 right-0 bg-card rounded-xl border shadow-[var(--shadow-card)] overflow-hidden text-left">
                {matches.map((t) => (
                  <Link key={t.slug} to="/tool/$slug" params={{ slug: t.slug }} className="flex items-center gap-3 px-4 py-3 hover:bg-accent/40">
                    <t.icon className="w-4 h-4 text-primary" />
                    <div><div className="text-sm font-medium">{t.name}</div><div className="text-xs text-muted-foreground">{t.description}</div></div>
                  </Link>
                ))}
              </div>
            )}
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            {popularTools().slice(0, 5).map((t) => (
              <Link key={t.slug} to="/tool/$slug" params={{ slug: t.slug }} className="px-3 py-1 rounded-full border bg-background/60 hover:bg-accent/40 hover:text-foreground transition">{t.name}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Popular tools</h2>
            <p className="text-muted-foreground mt-1">The most-loved utilities, used by thousands every day.</p>
          </div>
          <Button asChild variant="outline"><Link to="/tools">Browse all <ArrowRight className="w-4 h-4" /></Link></Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularTools().map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Explore by category</h2>
        <p className="text-muted-foreground mb-10">Six suites, dozens of tools — pick your workspace.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 hover:shadow-[var(--shadow-card)] hover:border-primary/40 transition-all">
              <div className={`w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br ${c.gradient} text-white shadow-sm mb-4`}>
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Open <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto max-w-7xl px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="text-muted-foreground mt-2">Three steps. No installs. No accounts to start.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Pick a tool", d: "Search or browse 90+ tools across six categories." },
            { n: "02", t: "Drop your file or text", d: "Drag and drop, paste, or type — we handle the rest." },
            { n: "03", t: "Download the result", d: "Process instantly and download your output. Done." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border bg-card p-6">
              <div className="text-sm font-mono text-primary">{s.n}</div>
              <h3 className="text-lg font-semibold mt-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, t: "Lightning fast", d: "Tools are optimized to run in your browser with zero waiting." },
            { icon: Shield, t: "Private by default", d: "Your files are processed securely — never sold, never tracked." },
            { icon: Wand2, t: "AI-powered", d: "From background removal to copywriting, AI works behind the scenes." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border bg-card p-6">
              <div className="w-10 h-10 rounded-xl bg-accent grid place-items-center text-accent-foreground mb-3"><b.icon className="w-5 h-5" /></div>
              <h3 className="font-semibold">{b.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="container mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-brand)] p-12 md:p-16 text-center text-white">
          <GlassOrb tint="pink" size={180} className="-left-10 -top-10" delay={0} />
          <GlassStar size={120} className="right-6 top-6" delay={0.8} />
          <GlassOrb tint="violet" size={110} className="right-1/3 -bottom-10" delay={1.4} />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Unlock everything with Pro</h2>
          <p className="mt-3 text-white/90 max-w-lg mx-auto">Unlimited usage, batch processing, larger files, no watermarks and full AI access.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90"><Link to="/pricing">See pricing</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10"><Link to="/signup">Start free</Link></Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center">Frequently asked questions</h2>
        <div className="mt-10 space-y-3">
          {[
            { q: "Are the tools really free?", a: "Yes — every tool has a free tier with sensible daily limits. Upgrade for unlimited usage." },
            { q: "Do I need to create an account?", a: "No — most tools work without an account. Sign up to save history and unlock more." },
            { q: "Are my files safe?", a: "Files are processed securely and deleted automatically. We never share your data." },
            { q: "Can I use this for commercial work?", a: "Absolutely — Pro and Business plans include commercial licensing." },
          ].map((f, i) => (
            <details key={i} className="group rounded-xl border bg-card p-5 open:shadow-[var(--shadow-card)]">
              <summary className="cursor-pointer flex justify-between items-center font-medium list-none">
                {f.q}<ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
