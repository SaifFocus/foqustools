import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { Dropzone, downloadBlob } from "../Dropzone";

type Mode = "merge" | "split" | "remove-pages" | "extract-pages" | "jpg-to-pdf";

export function PdfRunner({ mode }: { mode: Mode }) {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState("1-3,5");
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);

  async function run() {
    if (!files.length) return;
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      let outBlob: Blob;
      let outName = "result.pdf";
      if (mode === "merge") {
        const out = await PDFDocument.create();
        for (const f of files) {
          const src = await PDFDocument.load(await f.arrayBuffer());
          const copied = await out.copyPages(src, src.getPageIndices());
          copied.forEach((p) => out.addPage(p));
        }
        outBlob = new Blob([await out.save() as BlobPart], { type: "application/pdf" });
        outName = "merged.pdf";
      } else if (mode === "jpg-to-pdf") {
        const out = await PDFDocument.create();
        for (const f of files) {
          const bytes = await f.arrayBuffer();
          const img = f.type.includes("png") ? await out.embedPng(bytes) : await out.embedJpg(bytes);
          const page = out.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
        outBlob = new Blob([await out.save() as BlobPart], { type: "application/pdf" });
        outName = "images.pdf";
      } else {
        const src = await PDFDocument.load(await files[0].arrayBuffer());
        const total = src.getPageCount();
        const wanted = parsePageRange(pages, total);
        const out = await PDFDocument.create();
        const indices = mode === "remove-pages"
          ? src.getPageIndices().filter((i) => !wanted.includes(i))
          : wanted;
        const copied = await out.copyPages(src, indices);
        copied.forEach((p) => out.addPage(p));
        outBlob = new Blob([await out.save() as BlobPart], { type: "application/pdf" });
        outName = files[0].name.replace(/\.pdf$/i, "") + "-" + mode + ".pdf";
      }
      const url = URL.createObjectURL(outBlob);
      setResult({ url, name: outName, size: outBlob.size });
      toast.success("PDF ready");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  const accept = mode === "jpg-to-pdf" ? "image/*" : "application/pdf";
  const multiple = mode === "merge" || mode === "jpg-to-pdf";
  const needsPages = mode === "remove-pages" || mode === "extract-pages";

  return (
    <div className="space-y-5">
      <Dropzone accept={accept} multiple={multiple} files={files} onChange={(f) => { setFiles(f); setResult(null); }} hint={multiple ? "Add multiple files — order matters" : "Single file"} />
      {needsPages && files[0] && (
        <div className="p-4 rounded-xl border bg-muted/30">
          <Label className="text-xs">Pages (e.g. 1-3, 5, 8-10)</Label>
          <Input value={pages} onChange={(e) => setPages(e.target.value)} className="font-mono mt-1" />
        </div>
      )}
      <Button onClick={run} disabled={!files.length || busy} className="bg-[image:var(--gradient-brand)] text-primary-foreground">
        {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Working</> : "Process"}
      </Button>
      {result && (
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <h3 className="text-sm font-semibold">Result</h3>
          <embed src={result.url} type="application/pdf" className="w-full h-80 rounded-md border" />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground"><span className="font-mono">{result.name}</span> · {(result.size / 1024).toFixed(1)} KB</p>
            <Button variant="outline" onClick={async () => downloadBlob(await (await fetch(result.url)).blob(), result.name)}><Download className="w-4 h-4" /> Download</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function parsePageRange(s: string, total: number): number[] {
  const out = new Set<number>();
  for (const part of s.split(/[,\s]+/).filter(Boolean)) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) continue;
    const a = Math.max(1, +m[1]);
    const b = m[2] ? Math.min(total, +m[2]) : a;
    for (let i = a; i <= b; i++) if (i >= 1 && i <= total) out.add(i - 1);
  }
  return [...out].sort((x, y) => x - y);
}