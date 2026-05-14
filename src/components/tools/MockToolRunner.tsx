import { useRef, useState, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Download, Loader2, FileCheck2, X } from "lucide-react";
import type { Tool } from "@/lib/tools";

type Status = "idle" | "processing" | "done";

export function MockToolRunner({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const isFileBased = tool.inputType !== "text" && tool.inputType !== "none";
  const cta = tool.cta ?? (tool.inputType === "text" ? "Generate" : "Process File");

  function onDrop(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) setFiles(Array.from(e.dataTransfer.files));
  }

  async function run() {
    setStatus("processing");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("done");
  }

  const canRun = isFileBased ? files.length > 0 : tool.inputType === "none" ? true : text.trim().length > 0;

  return (
    <div className="space-y-5">
      {isFileBased && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-border hover:border-primary/60 hover:bg-accent/30 transition-colors p-10 text-center"
        >
          <div className="mx-auto w-12 h-12 rounded-xl bg-[image:var(--gradient-brand)] grid place-items-center mb-3 shadow-[var(--shadow-soft)]">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <p className="font-medium">Drop your {tool.inputType === "image" ? "image" : tool.inputType === "pdf" ? "PDF" : "file"} here</p>
          <p className="text-sm text-muted-foreground mt-1">or click to browse — max 50MB</p>
          <input ref={inputRef} type="file" accept={tool.accept} multiple className="hidden" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
        </div>
      )}

      {isFileBased && files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between gap-3 p-3 rounded-md border bg-muted/40 text-sm">
              <div className="flex items-center gap-2 truncate"><FileCheck2 className="w-4 h-4 text-primary shrink-0" /><span className="truncate">{f.name}</span><span className="text-muted-foreground text-xs">{(f.size / 1024).toFixed(1)} KB</span></div>
              <button onClick={() => setFiles((arr) => arr.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-foreground p-1"><X className="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
      )}

      {tool.inputType === "text" && (
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your input here…" className="min-h-40" />
      )}

      <div className="rounded-xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold mb-2">Settings</h3>
        <p className="text-xs text-muted-foreground">Tool-specific options will appear here. Connect a backend to unlock full configuration.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={!canRun || status === "processing"} className="bg-[image:var(--gradient-brand)] text-primary-foreground hover:opacity-90 shadow-[var(--shadow-soft)]">
          {status === "processing" ? (<><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>) : cta}
        </Button>
        <Button variant="outline" disabled={status !== "done"}>
          <Download className="w-4 h-4" /> Download
        </Button>
      </div>

      <div className="rounded-xl border bg-card p-5 min-h-32">
        <h3 className="text-sm font-semibold mb-2">Result preview</h3>
        {status === "idle" && <p className="text-sm text-muted-foreground">Your output will appear here once processing is complete.</p>}
        {status === "processing" && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Working on it…</div>}
        {status === "done" && <div className="text-sm">Demo result ready. Backend integration required to deliver real output for this tool.</div>}
      </div>
    </div>
  );
}