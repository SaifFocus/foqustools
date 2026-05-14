import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Wrench } from "lucide-react";
import tortoise from "@/assets/mascot-tortoise.png";
import elephant from "@/assets/mascot-elephant.png";
import owl from "@/assets/mascot-owl.png";

export const Route = createFileRoute("/about")({
  head: () => {
    const title = "About FoqusTools — Why we built it";
    const description =
      "FoqusTools is the every-day toolbox we kept wishing existed: image, PDF, AI and developer utilities, in one place, instantly, in the browser. Meet the team behind it.";
    const url = "https://foqustools.lovable.app/about";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
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
              { "@type": "ListItem", position: 2, name: "About", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: AboutPage,
});

const team = [
  {
    name: "Sheldon",
    role: "Head of Reliability",
    img: tortoise,
    bio: "Slow, steady and impossible to outlast. Sheldon makes sure every tool keeps working — long after the trend has moved on.",
  },
  {
    name: "Ellis",
    role: "Head of Memory",
    img: elephant,
    bio: "Remembers every format, every edge case, every annoying setting you'd rather not configure twice.",
  },
  {
    name: "Otis",
    role: "Head of Insight",
    img: owl,
    bio: "Reads the spec so you don't have to — and quietly picks the smartest defaults so the result just looks right.",
  },
];

function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      {/* Hero */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur text-xs text-muted-foreground mb-6 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            About{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">FoqusTools</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            One small toolbox with a big ambition: give everyone the tiny tools they need every day, without the tabs, the trackers, or the upsells.
          </p>
        </div>
      </section>

      {/* Why we built this */}
      <section className="relative px-6 py-12 md:py-20 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 text-xs text-muted-foreground mb-5">
            <Wrench className="w-3 h-3" /> Why we built this
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            The internet had ten tabs open for one tiny job.
          </h2>
          <div className="space-y-5 text-foreground/85 text-lg leading-relaxed">
            <p>
              Resize an image. Compress a PDF. Generate a QR code. Clean up some JSON. Each of those takes
              about thirty seconds — but finding a tool that doesn't watermark, paywall, upload your file to
              who-knows-where or bury the result under five ads can take twenty minutes.
            </p>
            <p>
              FoqusTools is our answer to that. Every tool runs in your browser, every tool is free, and
              the file you drop in never leaves your device unless an AI model genuinely needs to see it.
              Same look, same feel, same place — whether you're cropping a profile picture or testing a
              regex at 2am.
            </p>
            <p>
              FoqusTools is built and operated by{" "}
              <a
                href="https://focusbranding.se"
                rel="noopener"
                title="FOQUS — Swedish branding agency"
                className="font-medium underline decoration-dotted underline-offset-4 hover:text-foreground transition-colors"
              >
                FOQUS
              </a>
              , a Swedish branding agency that also runs a dedicated{" "}
              <a
                href="https://focusbranding.se/production"
                rel="noopener"
                title="FOQUS video production studio"
                className="font-medium underline decoration-dotted underline-offset-4 hover:text-foreground transition-colors"
              >
                video production studio
              </a>{" "}
              and an in-house SEO team. FoqusTools is the toolbox we kept wishing existed for our own
              clients — so we built it, and opened it up to everyone else too.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_50%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_70%)]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              The team behind{" "}
              <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">FoqusTools</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A patient builder, a flawless memory, and a sharp pair of eyes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur shadow-[var(--shadow-card)] p-6 text-center flex flex-col items-center hover:-translate-y-1 transition-transform"
              >
                <div className="w-40 h-40 mb-4 grid place-items-center">
                  <img
                    src={m.img}
                    alt={`${m.name} the ${m.role.toLowerCase()} mascot`}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-contain drop-shadow-[0_20px_30px_color-mix(in_oklab,var(--primary)_25%,transparent)]"
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-1">{m.name}</h3>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{m.role}</div>
                <p className="text-sm text-foreground/75 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-20 md:py-28 overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 text-xs text-muted-foreground mb-6">
            <Sparkles className="w-3 h-3" />
            Free, fast and private
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-5">
            Ready when you are.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Browse the full toolbox and pick whatever the day throws at you.
          </p>
          <Link
            to="/tools"
            className="inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground px-7 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] hover:scale-[1.02] transition-transform"
          >
            Explore all tools
          </Link>
        </div>
      </section>
    </main>
  );
}