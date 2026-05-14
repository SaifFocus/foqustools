import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { Dropzone, downloadBlob } from "../Dropzone";
import type { Tool } from "@/lib/tools";

type Mode = "resize" | "crop" | "compress" | "convert" | "image-to-pdf";

function formatFor(slug: string): { type: string; ext: string } {
  if (slug === "convert-png") return { type: "image/png", ext: "png" };
  if (slug === "convert-jpg") return { type: "image/jpeg", ext: "jpg" };
  if (slug === "convert-webp") return { type: "image/webp", ext: "webp" };
  if (slug === "convert-avif") return { type: "image/avif", ext: "avif" };
  if (slug === "image-compressor") return { type: "image/jpeg", ext: "jpg" };
  return { type: "image/png", ext: "png" };
}

export function ImageCanvasRunner({ tool, mode }: { tool: Tool; mode: Mode }) {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [quality, setQuality] = useState(80);

  async function run() {
    if (!files[0]) return;
    setBusy(true);
    try {
      const img = await loadImage(files[0]);
      const canvas = document.createElement("canvas");
      let w = img.naturalWidth, h = img.naturalHeight;
      if (mode === "resize") { w = width; h = height; }
      if (mode === "crop") {
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        canvas.width = side; canvas.height = side;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, side, side);
      } else {
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
      }
      if (mode === "image-to-pdf") {
        const { PDFDocument } = await import("pdf-lib");
        const pdf = await PDFDocument.create();
        const pngBytes = await new Promise<ArrayBuffer>((res) => canvas.toBlob((b) => b!.arrayBuffer().then(res), "image/png"));
        const png = await pdf.embedPng(pngBytes);
        const page = pdf.addPage([png.width, png.height]);
        page.drawImage(png, { x: 0, y: 0, width: png.width, height: png.height });
        const bytes = await pdf.save();
        const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setResult({ url, size: blob.size, name: files[0].name.replace(/\.[^.]+$/, "") + ".pdf" });
      } else {
        const fmt = formatFor(tool.slug);
        const q = mode === "compress" ? quality / 100 : 0.92;
        const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), fmt.type, q));
        const url = URL.createObjectURL(blob);
        setResult({ url, size: blob.size, name: files[0].name.replace(/\.[^.]+$/, "") + "-" + tool.slug + "." + fmt.ext });
      }
      toast.success("Ready to download");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to process image");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <Dropzone accept="image/*" files={files} onChange={(f) => { setFiles(f); setResult(null); }} hint="PNG, JPG, WEBP up to 20MB" />
      {(mode === "resize" || mode === "compress") && files.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-3 p-4 rounded-xl border bg-muted/30">
          {mode === "resize" && (
            <>
              <div><Label className="text-xs">Width (px)</Label><Input type="number" value={width} onChange={(e) => setWidth(+e.target.value)} /></div>
              <div><Label className="text-xs">Height (px)</Label><Input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} /></div>
            </>
          )}
          {mode === "compress" && (
            <div className="sm:col-span-3"><Label className="text-xs">Quality: {quality}%</Label><input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full" /></div>
          )}
        </div>
      )}
      <Button onClick={run} disabled={!files[0] || busy} className="bg-[image:var(--gradient-brand)] text-primary-foreground">
        {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing</> : "Process"}
      </Button>
      {result && (
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <h3 className="text-sm font-semibold">Result</h3>
          {result.name.endsWith(".pdf") ? (
            <embed src={result.url} type="application/pdf" className="w-full h-72 rounded-md border" />
          ) : (
            <img src={result.url} className="max-h-80 rounded-lg border mx-auto" alt="Result" />
          )}
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground"><span className="font-mono">{result.name}</span> · {(result.size / 1024).toFixed(1)} KB</p>
            <Button variant="outline" onClick={async () => downloadBlob(await (await fetch(result.url)).blob(), result.name)}><Download className="w-4 h-4" /> Download</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); res(img); };
    img.onerror = rej;
    img.src = url;
  });
}