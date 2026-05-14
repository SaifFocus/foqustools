import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dropzone } from "../Dropzone";

export function PaletteExtractorRunner() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [palette, setPalette] = useState<string[]>([]);

  async function run() {
    if (!files[0]) return;
    setBusy(true);
    try {
      const url = URL.createObjectURL(files[0]);
      const img = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
      const c = document.createElement("canvas");
      const W = 120; c.width = W; c.height = Math.round((img.naturalHeight / img.naturalWidth) * W);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      const data = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
      const buckets = new Map<string, number>();
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i] >> 5 << 5, g = data[i + 1] >> 5 << 5, b = data[i + 2] >> 5 << 5;
        const k = `${r},${g},${b}`;
        buckets.set(k, (buckets.get(k) ?? 0) + 1);
      }
      const top = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k]) => {
        const [r, g, b] = k.split(",").map(Number);
        return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
      });
      setPalette(top);
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error("Failed to read image");
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-5">
      <Dropzone accept="image/*" files={files} onChange={(f) => { setFiles(f); setPalette([]); }} />
      <Button onClick={run} disabled={!files[0] || busy} className="bg-[image:var(--gradient-brand)] text-primary-foreground">
        {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Extracting</> : "Extract palette"}
      </Button>
      {palette.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {palette.map((c) => (
            <button key={c} onClick={() => { navigator.clipboard.writeText(c); toast.success(`Copied ${c}`); }} className="group rounded-xl overflow-hidden border bg-card hover:shadow-[var(--shadow-card)] transition">
              <div className="h-20" style={{ background: c }} />
              <div className="p-2 text-center font-mono text-xs">{c}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}