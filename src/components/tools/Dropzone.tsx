import { useRef, useState, type DragEvent } from "react";
import { Upload, FileCheck2, X } from "lucide-react";

interface Props {
  accept?: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  hint?: string;
}

export function Dropzone({ accept, multiple, files, onChange, hint }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);
  function onDrop(e: DragEvent) {
    e.preventDefault();
    setHover(false);
    const list = Array.from(e.dataTransfer.files ?? []);
    if (list.length) onChange(multiple ? [...files, ...list] : [list[0]]);
  }
  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setHover(true); }}
        onDragLeave={() => setHover(false)}
        onDrop={onDrop}
        onClick={() => ref.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${hover ? "border-primary bg-primary/5" : "border-border hover:border-primary/60 hover:bg-accent/30"}`}
      >
        <div className="mx-auto w-12 h-12 rounded-xl bg-[image:var(--gradient-brand)] grid place-items-center mb-3 shadow-[var(--shadow-soft)]">
          <Upload className="w-5 h-5 text-white" />
        </div>
        <p className="font-medium">Drop your file{multiple ? "s" : ""} here</p>
        <p className="text-sm text-muted-foreground mt-1">{hint ?? "or click to browse"}</p>
        <input
          ref={ref}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            const list = Array.from(e.target.files ?? []);
            if (list.length) onChange(multiple ? [...files, ...list] : [list[0]]);
            e.target.value = "";
          }}
        />
      </div>
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between gap-3 p-3 rounded-md border bg-muted/40 text-sm">
              <div className="flex items-center gap-2 truncate min-w-0">
                <FileCheck2 className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate">{f.name}</span>
                <span className="text-muted-foreground text-xs shrink-0">{(f.size / 1024).toFixed(1)} KB</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); onChange(files.filter((_, j) => j !== i)); }} className="text-muted-foreground hover:text-foreground p-1">
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export async function dataUrlToBlob(url: string): Promise<Blob> {
  const r = await fetch(url);
  return r.blob();
}