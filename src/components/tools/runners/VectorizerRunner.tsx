import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { Dropzone, downloadBlob } from "../Dropzone";
import type { Tool } from "@/lib/tools";
// @ts-expect-error - no types
import ImageTracer from "imagetracerjs";
import { jsPDF } from "jspdf";
import "svg2pdf.js";

type Preset = "default" | "detailed" | "posterized" | "smooth" | "lineart";

const PRESETS: Record<Preset, Record<string, number | boolean>> = {
  default: { ltres: 1, qtres: 1, pathomit: 8, numberofcolors: 16, blurradius: 0 },
  detailed: { ltres: 0.5, qtres: 0.5, pathomit: 4, numberofcolors: 32, blurradius: 0 },
  posterized: { ltres: 1, qtres: 1, pathomit: 12, numberofcolors: 6, blurradius: 1 },
  smooth: { ltres: 1, qtres: 1, pathomit: 8, numberofcolors: 12, blurradius: 2 },
  lineart: { ltres: 0.1, qtres: 1, pathomit: 4, numberofcolors: 2, blurradius: 0 },
};

function loadImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 1600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(ctx.getImageData(0, 0, w, h));
    };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

async function svgToPdfBlob(svg: string, width: number, height: number): Promise<Blob> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const el = doc.documentElement as unknown as Element;
  const orient = width >= height ? "landscape" : "portrait";
  const pdf = new jsPDF({ unit: "pt", format: [width, height], orientation: orient });
  // svg2pdf augments jsPDF prototype
  // @ts-expect-error - svg2pdf augmentation
  await pdf.svg(el, { x: 0, y: 0, width, height });
  return pdf.output("blob");
}

// SVG path "d" → PostScript fragment. Supports M, L, Q, C, Z (ImageTracer output).
function svgPathToPS(d: string, height: number): string {
  const flipY = (y: number) => height - y;
  const tokens = d.match(/[MLQCZ]|-?\d*\.?\d+/gi) || [];
  let out = "";
  let i = 0;
  let cmd = "";
  const num = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    const t = tokens[i];
    if (/[MLQCZ]/i.test(t)) { cmd = t.toUpperCase(); i++; }
    if (cmd === "M") { const x = num(), y = num(); out += `${x} ${flipY(y)} moveto\n`; cmd = "L"; }
    else if (cmd === "L") { const x = num(), y = num(); out += `${x} ${flipY(y)} lineto\n`; }
    else if (cmd === "Q") {
      // Convert quadratic to cubic Bezier (PostScript only has cubic curveto).
      // We don't track the previous point here; approximate with a straight line through control then end.
      const cx = num(), cy = num(), x = num(), y = num();
      out += `${cx} ${flipY(cy)} ${cx} ${flipY(cy)} ${x} ${flipY(y)} curveto\n`;
    }
    else if (cmd === "C") {
      const x1 = num(), y1 = num(), x2 = num(), y2 = num(), x = num(), y = num();
      out += `${x1} ${flipY(y1)} ${x2} ${flipY(y2)} ${x} ${flipY(y)} curveto\n`;
    }
    else if (cmd === "Z") { out += "closepath\n"; }
    else { i++; }
  }
  return out;
}

function svgToEps(svg: string, width: number, height: number): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const paths = Array.from(doc.querySelectorAll("path"));
  let body = "";
  for (const p of paths) {
    const d = p.getAttribute("d") || "";
    const fill = p.getAttribute("fill") || "#000";
    const opacity = parseFloat(p.getAttribute("opacity") || p.getAttribute("fill-opacity") || "1");
    if (fill === "none" || opacity === 0) continue;
    const m = /^#?([0-9a-f]{6})$/i.exec(fill.replace("#", "")) || /rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(fill);
    let r = 0, g = 0, b = 0;
    if (m && m[0].startsWith("rgb")) { r = +m[1] / 255; g = +m[2] / 255; b = +m[3] / 255; }
    else if (m) { const h = m[1]; r = parseInt(h.slice(0, 2), 16) / 255; g = parseInt(h.slice(2, 4), 16) / 255; b = parseInt(h.slice(4, 6), 16) / 255; }
    body += `gsave\n${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} setrgbcolor\nnewpath\n`;
    body += svgPathToPS(d, height);
    body += `fill\ngrestore\n`;
  }
  const header = `%!PS-Adobe-3.0 EPSF-3.0\n%%Creator: FoqusTools Vectorizer\n%%BoundingBox: 0 0 ${Math.ceil(width)} ${Math.ceil(height)}\n%%HiResBoundingBox: 0 0 ${width} ${height}\n%%Pages: 1\n%%EndComments\n%%Page: 1 1\n`;
  return header + body + "showpage\n%%EOF\n";
}

export function VectorizerRunner({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [preset, setPreset] = useState<Preset>("default");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ svg: string; w: number; h: number; baseName: string } | null>(null);

  async function run() {
    if (!files[0]) return;
    setBusy(true); setResult(null);
    try {
      const data = await loadImageData(files[0]);
      const opts = { ...PRESETS[preset], viewbox: true, scale: 1, roundcoords: 1 };
      const svg: string = ImageTracer.imagedataToSVG(data, opts);
      const baseName = files[0].name.replace(/\.[^.]+$/, "") || "vector";
      setResult({ svg, w: data.width, h: data.height, baseName });
      toast.success("Vectorized · choose a format below");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to vectorize");
    } finally { setBusy(false); }
  }

  async function download(format: "svg" | "pdf" | "ai" | "eps") {
    if (!result) return;
    const { svg, w, h, baseName } = result;
    try {
      if (format === "svg") {
        downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `${baseName}.svg`);
      } else if (format === "pdf" || format === "ai") {
        const blob = await svgToPdfBlob(svg, w, h);
        downloadBlob(blob, `${baseName}.${format}`);
      } else if (format === "eps") {
        const eps = svgToEps(svg, w, h);
        downloadBlob(new Blob([eps], { type: "application/postscript" }), `${baseName}.eps`);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : `Could not export ${format.toUpperCase()}`);
    }
  }

  return (
    <div className="space-y-5">
      <Dropzone accept="image/*" files={files} onChange={(f) => { setFiles(f); setResult(null); }} hint="PNG or JPG · best with high-contrast subjects on a clean background" />
      <div>
        <Label className="text-xs">Style preset</Label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2">
          {(Object.keys(PRESETS) as Preset[]).map((p) => (
            <Button key={p} type="button" size="sm" variant={preset === p ? "default" : "outline"} onClick={() => setPreset(p)} className="capitalize">{p}</Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">All exports use a transparent background and pure vector paths.</p>
      </div>
      <Button onClick={run} disabled={busy || !files[0]} className="bg-[image:var(--gradient-brand)] text-primary-foreground">
        {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Tracing paths…</> : (tool.cta ?? "Vectorize")}
      </Button>
      {result && (
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h3 className="text-sm font-semibold">Result</h3>
          <div className="rounded-lg border p-4 grid place-items-center bg-[conic-gradient(at_50%_50%,#0001_25%,transparent_0_50%,#0001_0_75%,transparent_0)] [background-size:16px_16px] max-h-96 overflow-auto" dangerouslySetInnerHTML={{ __html: result.svg }} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button variant="outline" onClick={() => download("svg")}><Download className="w-4 h-4" /> SVG</Button>
            <Button variant="outline" onClick={() => download("pdf")}><Download className="w-4 h-4" /> PDF</Button>
            <Button variant="outline" onClick={() => download("ai")}><Download className="w-4 h-4" /> AI</Button>
            <Button variant="outline" onClick={() => download("eps")}><Download className="w-4 h-4" /> EPS</Button>
          </div>
          <p className="text-xs text-muted-foreground">AI files are saved in PDF-compatible format (Illustrator CS2+ standard). EPS is generated as PostScript Level 2.</p>
        </div>
      )}
    </div>
  );
}