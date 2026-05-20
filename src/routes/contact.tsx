import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => {
    const title = "Contact — Get in Touch | FoqusTools";
    const description =
      "Questions, feedback, partnership ideas? Reach the FoqusTools team — we usually respond within one business day.";
    const url = "https://foqustools.lovable.app/contact";
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
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`[FoqusTools] ${data.get("subject") ?? "Hello"}`);
    const body = encodeURIComponent(
      `From: ${data.get("name")} <${data.get("email")}>\n\n${data.get("message")}`
    );
    setSending(true);
    window.location.href = `mailto:hello@foqustools.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
    }, 500);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <header className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in touch</h1>
        <p className="text-muted-foreground mt-3">
          Have a question, request a tool, or want to partner with us? We'd love to hear from you.
        </p>
      </header>
      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-7 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Jane Doe" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" required placeholder="How can we help?" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required rows={6} placeholder="Tell us what's on your mind…" />
          </div>
          <Button type="submit" disabled={sending} className="bg-[image:var(--gradient-brand)] text-primary-foreground">
            <Send className="w-4 h-4" /> {sending ? "Sending…" : "Send message"}
          </Button>
        </form>
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold"><Mail className="w-4 h-4 text-primary" /> Email</div>
            <a href="mailto:hello@foqustools.com" className="text-sm text-muted-foreground hover:text-foreground block mt-1">hello@foqustools.com</a>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold"><MessageSquare className="w-4 h-4 text-primary" /> Support</div>
            <p className="text-sm text-muted-foreground mt-1">We respond within one business day.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}