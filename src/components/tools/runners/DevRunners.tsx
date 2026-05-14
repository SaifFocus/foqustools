import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Loader2 } from "lucide-react";

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false);
  return <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 1500); }}>{c ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</Button>;
}

function formatXml(src: string): string {
  const PADDING = "  ";
  let formatted = "", indent = "";
  const reg = /(>)(<)(\/*)/g;
  src = src.replace(reg, "$1\n$2$3");
  src.split("\n").forEach((line) => {
    if (line.match(/^<\/\w/)) indent = indent.slice(0, -PADDING.length);
    formatted += indent + line + "\n";
    if (line.match(/^<\w[^>]*[^/]>$/) && !line.includes("</")) indent += PADDING;
  });
  return formatted.trim();
}

export function XmlFormatter() {
  const [src, setSrc] = useState('<root><item id="1">hello</item><item id="2">world</item></root>');
  const out = useMemo(() => { try { return formatXml(src); } catch (e) { return `// ${(e as Error).message}`; } }, [src]);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Textarea value={src} onChange={(e) => setSrc(e.target.value)} className="font-mono text-xs h-72" />
      <div className="relative"><pre className="font-mono text-xs h-72 p-3 rounded-md border bg-muted/40 overflow-auto whitespace-pre-wrap">{out}</pre><div className="absolute top-2 right-2"><CopyBtn text={out} /></div></div>
    </div>
  );
}

export function HtmlFormatter() {
  const [src, setSrc] = useState('<div class="card"><h1>Hi</h1><p>OmniTools</p></div>');
  const out = useMemo(() => { try { return formatXml(src); } catch (e) { return `// ${(e as Error).message}`; } }, [src]);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Textarea value={src} onChange={(e) => setSrc(e.target.value)} className="font-mono text-xs h-72" />
      <div className="relative"><pre className="font-mono text-xs h-72 p-3 rounded-md border bg-muted/40 overflow-auto whitespace-pre-wrap">{out}</pre><div className="absolute top-2 right-2"><CopyBtn text={out} /></div></div>
    </div>
  );
}

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Email me at hello@omnitools.app or support@example.com");
  const { matches, error } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      return { matches: [...text.matchAll(flags.includes("g") ? re : new RegExp(pattern, flags + "g"))].map((m) => m[0]), error: null as string | null };
    } catch (e) { return { matches: [], error: (e as Error).message }; }
  }, [pattern, flags, text]);
  return (
    <div className="space-y-3">
      <div className="flex gap-2"><Input value={pattern} onChange={(e) => setPattern(e.target.value)} className="font-mono" placeholder="pattern" /><Input value={flags} onChange={(e) => setFlags(e.target.value)} className="font-mono w-20" placeholder="flags" /></div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-32 font-mono text-xs" />
      <div className="p-3 rounded-md border bg-muted/40">
        {error ? <span className="text-destructive text-sm">{error}</span> : matches.length === 0 ? <span className="text-sm text-muted-foreground">No matches</span> : (
          <div className="space-y-1"><div className="text-xs text-muted-foreground">{matches.length} match{matches.length === 1 ? "" : "es"}</div>
          {matches.map((m, i) => <div key={i} className="font-mono text-xs">{m}</div>)}</div>
        )}
      </div>
    </div>
  );
}

export function ApiTester() {
  const [url, setUrl] = useState("https://api.github.com/repos/tannerlinsley/tanstack");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState('{"Accept":"application/json"}');
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ status: number; text: string; ms: number } | null>(null);

  async function run() {
    setBusy(true);
    const t0 = performance.now();
    try {
      const h = headers.trim() ? JSON.parse(headers) : undefined;
      const r = await fetch(url, { method, headers: h, body: method === "GET" || method === "HEAD" ? undefined : body });
      const text = await r.text();
      let pretty = text;
      try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch { /* not JSON */ }
      setResult({ status: r.status, text: pretty.slice(0, 8000), ms: Math.round(performance.now() - t0) });
    } catch (e) {
      setResult({ status: 0, text: (e as Error).message, ms: Math.round(performance.now() - t0) });
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="border rounded-md px-3 bg-background text-sm">{["GET","POST","PUT","PATCH","DELETE"].map(m => <option key={m}>{m}</option>)}</select>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} className="font-mono" />
        <Button onClick={run} disabled={busy} className="bg-[image:var(--gradient-brand)] text-primary-foreground">{busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div><Label className="text-xs">Headers (JSON)</Label><Textarea value={headers} onChange={(e) => setHeaders(e.target.value)} className="font-mono text-xs h-32 mt-1" /></div>
        <div><Label className="text-xs">Body</Label><Textarea value={body} onChange={(e) => setBody(e.target.value)} className="font-mono text-xs h-32 mt-1" /></div>
      </div>
      {result && (
        <div className="rounded-md border bg-muted/40 p-3 space-y-2">
          <div className="text-xs text-muted-foreground">Status: <span className={result.status >= 200 && result.status < 300 ? "text-primary font-mono" : "text-destructive font-mono"}>{result.status || "ERR"}</span> · {result.ms}ms</div>
          <pre className="font-mono text-xs max-h-80 overflow-auto whitespace-pre-wrap">{result.text}</pre>
        </div>
      )}
    </div>
  );
}

export function SvgEditor() {
  const [src, setSrc] = useState('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#7c3aed"/></svg>');
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Textarea value={src} onChange={(e) => setSrc(e.target.value)} className="font-mono text-xs h-72" />
      <div className="rounded-md border bg-muted/40 p-4 grid place-items-center min-h-72" dangerouslySetInnerHTML={{ __html: src }} />
    </div>
  );
}