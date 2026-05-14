import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1200); }}>
      <Copy className="w-3.5 h-3.5" /> {done ? "Copied" : "Copy"}
    </Button>
  );
}

export function JsonFormatter() {
  const [input, setInput] = useState('{"hello":"world","items":[1,2,3]}');
  const { output, error } = useMemo(() => {
    try { return { output: JSON.stringify(JSON.parse(input), null, 2), error: null as string | null }; }
    catch (e) { return { output: "", error: (e as Error).message }; }
  }, [input]);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="font-mono text-xs h-72" />
      <div className="relative">
        <pre className="font-mono text-xs h-72 p-3 rounded-md border bg-muted/40 overflow-auto whitespace-pre-wrap">{error ? `// ${error}` : output}</pre>
        {output && <div className="absolute top-2 right-2"><CopyBtn text={output} /></div>}
      </div>
    </div>
  );
}

export function Base64Tool() {
  const [text, setText] = useState("Hello, OmniTools!");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const out = useMemo(() => {
    try { return mode === "encode" ? btoa(unescape(encodeURIComponent(text))) : decodeURIComponent(escape(atob(text))); }
    catch { return "Invalid input"; }
  }, [text, mode]);
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" variant={mode === "encode" ? "default" : "outline"} onClick={() => setMode("encode")}>Encode</Button>
        <Button size="sm" variant={mode === "decode" ? "default" : "outline"} onClick={() => setMode("decode")}>Decode</Button>
      </div>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} className="font-mono text-xs h-40" />
      <div className="relative">
        <pre className="font-mono text-xs p-3 rounded-md border bg-muted/40 break-all whitespace-pre-wrap">{out}</pre>
        <div className="absolute top-2 right-2"><CopyBtn text={out} /></div>
      </div>
    </div>
  );
}

export function UuidTool() {
  const gen = () => crypto.randomUUID();
  const [list, setList] = useState<string[]>([gen()]);
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button onClick={() => setList((l) => [gen(), ...l].slice(0, 20))} className="bg-[image:var(--gradient-brand)] text-primary-foreground"><RefreshCw className="w-4 h-4" /> Generate</Button>
        <Button variant="outline" onClick={() => setList([gen()])}>Reset</Button>
      </div>
      <ul className="space-y-2">
        {list.map((u, i) => (
          <li key={i} className="flex items-center justify-between gap-2 p-3 rounded-md border bg-muted/40 font-mono text-xs">
            <span>{u}</span><CopyBtn text={u} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TimestampTool() {
  const [val, setVal] = useState(String(Math.floor(Date.now() / 1000)));
  const num = Number(val);
  const date = !isNaN(num) ? new Date(num * (val.length > 10 ? 1 : 1000)) : null;
  return (
    <div className="space-y-3">
      <Input value={val} onChange={(e) => setVal(e.target.value)} className="font-mono" placeholder="Unix timestamp" />
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div className="p-3 rounded-md border bg-muted/40"><div className="text-muted-foreground text-xs">ISO</div><div className="font-mono">{date?.toISOString() ?? "—"}</div></div>
        <div className="p-3 rounded-md border bg-muted/40"><div className="text-muted-foreground text-xs">Local</div><div className="font-mono">{date?.toString() ?? "—"}</div></div>
      </div>
      <Button variant="outline" onClick={() => setVal(String(Math.floor(Date.now() / 1000)))}>Now</Button>
    </div>
  );
}

function hexToRgb(h: string) {
  const m = h.replace("#", "").match(/^([a-f\d]{6}|[a-f\d]{3})$/i);
  if (!m) return null;
  let s = m[1];
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  return { r: parseInt(s.slice(0, 2), 16), g: parseInt(s.slice(2, 4), 16), b: parseInt(s.slice(4, 6), 16) };
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}
export function ColorTool() {
  const [hex, setHex] = useState("#7c3aed");
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  return (
    <div className="space-y-3">
      <div className="flex gap-3 items-center">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-16 h-12 rounded-md border cursor-pointer bg-transparent" />
        <Input value={hex} onChange={(e) => setHex(e.target.value)} className="font-mono w-40" />
        <div className="w-12 h-12 rounded-md border" style={{ background: hex }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div className="p-3 rounded-md border bg-muted/40 font-mono">RGB: {rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "—"}</div>
        <div className="p-3 rounded-md border bg-muted/40 font-mono">HSL: {hsl ? `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` : "—"}</div>
      </div>
    </div>
  );
}

export function MarkdownTool() {
  const [md, setMd] = useState("# Hello\n\nWelcome to **OmniTools** — *the* all-in-one toolbox.\n\n- Fast\n- Clean\n- Free");
  const html = useMemo(() => renderMd(md), [md]);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Textarea value={md} onChange={(e) => setMd(e.target.value)} className="font-mono text-xs h-72" />
      <div className="prose prose-sm max-w-none p-4 h-72 overflow-auto rounded-md border bg-muted/40" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
function renderMd(src: string) {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = src.split("\n");
  const out: string[] = []; let inUl = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    const ul = line.match(/^[-*]\s+(.*)/);
    if (ul) { if (!inUl) { out.push("<ul>"); inUl = true; } out.push(`<li>${inline(ul[1])}</li>`); continue; }
    if (inUl) { out.push("</ul>"); inUl = false; }
    const h = line.match(/^(#{1,6})\s+(.*)/);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    if (!line) { out.push(""); continue; }
    out.push(`<p>${inline(line)}</p>`);
  }
  if (inUl) out.push("</ul>");
  function inline(s: string) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  }
  return out.join("\n");
}

function minifyCss(s: string) {
  return s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}").trim();
}
function minifyJs(s: string) {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:\\])\/\/.*$/gm, "$1")
    .replace(/\n\s*/g, "\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}
export function MinifierTool({ kind }: { kind: "css" | "js" }) {
  const [src, setSrc] = useState(kind === "css"
    ? "/* sample */\n.button {\n  color: red;\n  padding: 8px 16px;\n}"
    : "// sample\nfunction add(a, b) {\n  return a + b;\n}");
  const out = useMemo(() => kind === "css" ? minifyCss(src) : minifyJs(src), [src, kind]);
  const ratio = src.length ? Math.round((1 - out.length / src.length) * 100) : 0;
  return (
    <div className="space-y-3">
      <Textarea value={src} onChange={(e) => setSrc(e.target.value)} className="font-mono text-xs h-48" />
      <div className="text-xs text-muted-foreground">Saved {ratio}% — {src.length} → {out.length} bytes</div>
      <div className="relative">
        <pre className="font-mono text-xs p-3 rounded-md border bg-muted/40 whitespace-pre-wrap break-all">{out}</pre>
        <div className="absolute top-2 right-2"><CopyBtn text={out} /></div>
      </div>
    </div>
  );
}

export function getWorkingTool(key: string) {
  switch (key) {
    case "json": return <JsonFormatter />;
    case "base64": return <Base64Tool />;
    case "uuid": return <UuidTool />;
    case "timestamp": return <TimestampTool />;
    case "color": return <ColorTool />;
    case "markdown": return <MarkdownTool />;
    case "css-min": return <MinifierTool kind="css" />;
    case "js-min": return <MinifierTool kind="js" />;
    default: return null;
  }
}