import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, Check, Download, Square } from "lucide-react";
import { toast } from "sonner";
import { streamAiText } from "@/lib/ai-client";
import { downloadBlob } from "../Dropzone";
import type { Tool } from "@/lib/tools";

const PLACEHOLDERS: Record<string, string> = {
  "email-writer": "Write an email asking my landlord to fix the leaking sink…",
  "blog-writer": "Topic: How AI is transforming small businesses (~800 words)",
  "product-description": "Wireless noise-cancelling headphones, 40h battery, premium leather",
  "resume-builder": "Senior Frontend Engineer · 6 years React/TS · led design system at Acme · …",
  "cover-letter": "Applying for Product Designer at Linear. My background: 5 years SaaS, design systems…",
  "summarizer": "Paste any long text here…",
  "grammar-fixer": "Paste your text — we'll fix grammar and clarity.",
  "translation": "Paste the text to translate…",
  "social-caption": "Topic: launching our new running shoe — energetic, gen-z tone",
  "ad-copy": "Product: meal-prep delivery for busy parents. Audience: 30-45, urban.",
};

export function AiTextRunner({ tool }: { tool: Tool }) {
  const [input, setInput] = useState("");
  const [target, setTarget] = useState("English");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function run() {
    if (!input.trim()) return;
    setBusy(true); setOutput("");
    const ctrl = new AbortController(); abortRef.current = ctrl;
    try {
      await streamAiText({
        tool: tool.slug,
        input,
        options: tool.slug === "translation" ? { targetLanguage: target } : undefined,
        onDelta: (d) => setOutput((p) => p + d),
        signal: ctrl.signal,
      });
    } catch (e) {
      if ((e as Error).name !== "AbortError") toast.error((e as Error).message);
    } finally { setBusy(false); abortRef.current = null; }
  }

  return (
    <div className="space-y-4">
      {tool.slug === "translation" && (
        <div><Label className="text-xs">Target language</Label><Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. French, Japanese, Spanish" /></div>
      )}
      <div>
        <Label className="text-xs">Your input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={PLACEHOLDERS[tool.slug] ?? "Type or paste your input here…"} className="min-h-32 mt-1" />
      </div>
      <div className="flex gap-2">
        <Button onClick={run} disabled={!input.trim() || busy} className="bg-[image:var(--gradient-brand)] text-primary-foreground">
          {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating</> : (tool.cta ?? "Generate")}
        </Button>
        {busy && <Button variant="outline" onClick={() => abortRef.current?.abort()}><Square className="w-4 h-4" /> Stop</Button>}
      </div>
      {output && (
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <div className="flex items-center justify-between"><h3 className="text-sm font-semibold">Result</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
                {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </Button>
              <Button size="sm" variant="outline" onClick={() => downloadBlob(new Blob([output], { type: "text/markdown" }), `${tool.slug}.md`)}>
                <Download className="w-3.5 h-3.5" /> Download
              </Button>
            </div>
          </div>
          <pre className="text-sm whitespace-pre-wrap font-sans">{output}</pre>
        </div>
      )}
    </div>
  );
}