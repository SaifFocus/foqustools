import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { Dropzone, downloadBlob } from "../Dropzone";
import { callAiImage, fileToDataUrl } from "@/lib/ai-client";
import type { Tool } from "@/lib/tools";

const PROMPT_PLACEHOLDERS: Record<string, string> = {
  "ai-image-generator": "A serene mountain landscape at golden hour, photorealistic…",
  "logo-generator": "A modern minimalist logo for a coffee shop called Brew Lab…",
  "icon-generator": "A flat app icon for a meditation app — calm, blue tones…",
  "remove-object": "Remove the person in the red shirt on the left",
  "add-watermark": "Add the text '© 2025 MySite' in the bottom right corner",
  "meme-generator": "Top: WHEN THE BUILD PASSES · Bottom: ON THE FIRST TRY",
};

export function AiImageRunner({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ url: string } | null>(null);

  const needsImage = tool.inputType === "image";
  const needsPrompt = !needsImage || ["remove-object", "add-watermark", "meme-generator"].includes(tool.slug);

  async function run() {
    if (needsImage && !files[0]) return;
    if (!needsImage && !prompt.trim()) return;
    setBusy(true); setResult(null);
    try {
      const imageDataUrl = needsImage ? await fileToDataUrl(files[0]) : undefined;
      const r = await callAiImage({ tool: tool.slug, prompt: needsPrompt ? prompt : undefined, imageDataUrl });
      setResult({ url: r.url });
      toast.success("Image ready");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-5">
      {needsImage && (
        <Dropzone accept="image/*" files={files} onChange={(f) => { setFiles(f); setResult(null); }} hint="PNG or JPG up to 10MB" />
      )}
      {needsPrompt && (
        <div>
          <Label className="text-xs">{needsImage ? "Instructions" : "Prompt"}</Label>
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={PROMPT_PLACEHOLDERS[tool.slug] ?? "Describe what you want…"} className="min-h-24 mt-1" />
        </div>
      )}
      <Button onClick={run} disabled={busy || (needsImage && !files[0]) || (!needsImage && !prompt.trim())} className="bg-[image:var(--gradient-brand)] text-primary-foreground">
        {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating · this can take 10–30s</> : (tool.cta ?? "Generate")}
      </Button>
      {result && (
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <h3 className="text-sm font-semibold">Result</h3>
          <img src={result.url} className="max-h-96 rounded-lg border mx-auto" alt="Result" />
          <Button variant="outline" onClick={async () => downloadBlob(await (await fetch(result.url)).blob(), `${tool.slug}.png`)}><Download className="w-4 h-4" /> Download PNG</Button>
        </div>
      )}
    </div>
  );
}