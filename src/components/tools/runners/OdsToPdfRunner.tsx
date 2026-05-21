import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { Dropzone, downloadBlob } from "../Dropzone";

export function OdsToPdfRunner() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ url: string; name: string; size: number; blob: Blob } | null>(null);

  async function run() {
    if (!files.length) return;
    setBusy(true);
    try {
      const file = files[0];
      const [{ read, utils }, { default: jsPDF }, autoTableMod] = await Promise.all([
        import("xlsx"),
        import("jspdf"),
        import("jspdf-autotable"),
      ]);
      const autoTable = (autoTableMod as { default: typeof import("jspdf-autotable")["default"] }).default;
      const wb = read(await file.arrayBuffer(), { type: "array" });
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

      wb.SheetNames.forEach((name, i) => {
        const ws = wb.Sheets[name];
        const rows: unknown[][] = utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: "" });
        if (i > 0) pdf.addPage();
        pdf.setFontSize(14);
        pdf.text(name, 40, 36);
        if (rows.length === 0) {
          pdf.setFontSize(10);
          pdf.text("(empty sheet)", 40, 60);
          return;
        }
        const head = [rows[0].map((c) => String(c ?? ""))];
        const body = rows.slice(1).map((r) => r.map((c) => String(c ?? "")));
        autoTable(pdf, {
          head,
          body,
          startY: 50,
          styles: { fontSize: 8, cellPadding: 4, overflow: "linebreak" },
          headStyles: { fillColor: [30, 30, 30], textColor: 255 },
          margin: { left: 40, right: 40, bottom: 40 },
        });
      });

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const outName = file.name.replace(/\.ods$/i, "") + ".pdf";
      setResult({ url, name: outName, size: blob.size, blob });
      toast.success("PDF ready");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to convert");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <Dropzone
        accept=".ods,application/vnd.oasis.opendocument.spreadsheet"
        multiple={false}
        files={files}
        onChange={(f) => { setFiles(f); setResult(null); }}
        hint="Drop a .ods file — each sheet becomes a PDF page"
      />
      <Button onClick={run} disabled={!files.length || busy} className="bg-[image:var(--gradient-brand)] text-primary-foreground">
        {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Converting</> : "Convert to PDF"}
      </Button>
      {result && (
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <h3 className="text-sm font-semibold">Result</h3>
          <embed src={result.url} type="application/pdf" className="w-full h-80 rounded-md border" />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground"><span className="font-mono">{result.name}</span> · {(result.size / 1024).toFixed(1)} KB</p>
            <Button variant="outline" onClick={() => downloadBlob(result.blob, result.name)}>
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}