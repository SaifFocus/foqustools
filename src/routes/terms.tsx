import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => {
    const title = "Terms & Conditions | FoqusTools";
    const description =
      "The terms that govern your use of FoqusTools — acceptable use, intellectual property, disclaimers and liability.";
    const url = "https://foqustools.lovable.app/terms";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Terms &amp; Conditions</h1>
      <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <h2 className="text-xl font-semibold mt-10">1. Acceptance</h2>
      <p className="text-muted-foreground mt-2">By accessing or using FoqusTools, you agree to be bound by these Terms. If you do not agree, do not use the service.</p>

      <h2 className="text-xl font-semibold mt-8">2. The service</h2>
      <p className="text-muted-foreground mt-2">FoqusTools provides browser-based utilities and AI-assisted tools. Features may change, be added or removed at any time.</p>

      <h2 className="text-xl font-semibold mt-8">3. Accounts</h2>
      <p className="text-muted-foreground mt-2">You are responsible for activity under your account and for keeping credentials secure. You must be at least 13 years old to create an account.</p>

      <h2 className="text-xl font-semibold mt-8">4. Acceptable use</h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
        <li>No unlawful, harmful, infringing, defamatory or deceptive content.</li>
        <li>No attempts to disrupt, reverse engineer or overload the service.</li>
        <li>No scraping, resale or rebranding of FoqusTools as your own.</li>
        <li>No generation of content that violates third-party rights or applicable laws.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">5. Your content</h2>
      <p className="text-muted-foreground mt-2">You retain ownership of the files and text you process. You grant us a limited license to process them solely to provide the service.</p>

      <h2 className="text-xl font-semibold mt-8">6. Intellectual property</h2>
      <p className="text-muted-foreground mt-2">The FoqusTools brand, design and software are owned by us or our licensors and are protected by copyright and trademark law.</p>

      <h2 className="text-xl font-semibold mt-8">7. Paid plans</h2>
      <p className="text-muted-foreground mt-2">Paid plans are billed in advance and non-refundable except where required by law. You can cancel at any time; access continues until the end of the billing period.</p>

      <h2 className="text-xl font-semibold mt-8">8. Disclaimer</h2>
      <p className="text-muted-foreground mt-2">The service is provided "as is" without warranty of any kind. AI outputs may be inaccurate — review before using in production.</p>

      <h2 className="text-xl font-semibold mt-8">9. Limitation of liability</h2>
      <p className="text-muted-foreground mt-2">To the maximum extent permitted by law, FoqusTools shall not be liable for any indirect, incidental or consequential damages arising from your use of the service.</p>

      <h2 className="text-xl font-semibold mt-8">10. Termination</h2>
      <p className="text-muted-foreground mt-2">We may suspend or terminate accounts that violate these Terms.</p>

      <h2 className="text-xl font-semibold mt-8">11. Governing law</h2>
      <p className="text-muted-foreground mt-2">These Terms are governed by the laws of Sweden, without regard to conflict-of-law principles.</p>

      <h2 className="text-xl font-semibold mt-8">12. Contact</h2>
      <p className="text-muted-foreground mt-2">Questions about these Terms? Visit our <Link to="/contact" className="underline">contact page</Link>.</p>
    </article>
  );
}