import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const title = "Privacy Policy | FoqusTools";
    const description =
      "How FoqusTools handles your data. Most tools process files in your browser — your content does not leave your device unless explicitly stated.";
    const url = "https://foqustools.lovable.app/privacy";
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
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <h2 className="text-xl font-semibold mt-10">1. Who we are</h2>
      <p className="text-muted-foreground">
        FoqusTools ("we", "us", "our") provides a suite of free online utilities at
        foqustools.lovable.app. This policy explains what we collect, why, and how to control it.
      </p>

      <h2 className="text-xl font-semibold mt-8">2. What we collect</h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li><strong>Account data</strong>: email and authentication metadata when you sign up.</li>
        <li><strong>Usage analytics</strong>: anonymized page views, tool usage and device type.</li>
        <li><strong>Cookies</strong>: only after you accept them via our cookie banner. See section 5.</li>
        <li><strong>Files you upload</strong>: most tools run entirely in your browser; nothing leaves your device. AI tools send the minimum required data to our AI provider and are not retained.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">3. How we use your data</h2>
      <p className="text-muted-foreground">To operate the service, prevent abuse, improve features, and respond to support requests. We do not sell personal data.</p>

      <h2 className="text-xl font-semibold mt-8">4. Sharing</h2>
      <p className="text-muted-foreground">We share data only with processors required to run the service (hosting, authentication, AI inference). Each is bound by confidentiality and data-protection terms.</p>

      <h2 className="text-xl font-semibold mt-8">5. Cookies</h2>
      <p className="text-muted-foreground">We use essential cookies for authentication and, with your consent, analytics cookies to understand usage. You can change your choice anytime by clearing site data.</p>

      <h2 className="text-xl font-semibold mt-8">6. Your rights</h2>
      <p className="text-muted-foreground">Under GDPR/CCPA you may request access, correction, deletion or export of your data. Email <a href="mailto:privacy@foqustools.com" className="underline">privacy@foqustools.com</a>.</p>

      <h2 className="text-xl font-semibold mt-8">7. Retention</h2>
      <p className="text-muted-foreground">Account data is kept while your account is active. Uploaded files used by AI tools are deleted immediately after the request completes.</p>

      <h2 className="text-xl font-semibold mt-8">8. Children</h2>
      <p className="text-muted-foreground">FoqusTools is not directed to children under 13. We do not knowingly collect their data.</p>

      <h2 className="text-xl font-semibold mt-8">9. Changes</h2>
      <p className="text-muted-foreground">We may update this policy. Material changes will be announced on this page.</p>

      <h2 className="text-xl font-semibold mt-8">10. Contact</h2>
      <p className="text-muted-foreground">Questions? Visit our <Link to="/contact" className="underline">contact page</Link> or email <a href="mailto:privacy@foqustools.com" className="underline">privacy@foqustools.com</a>.</p>
    </article>
  );
}