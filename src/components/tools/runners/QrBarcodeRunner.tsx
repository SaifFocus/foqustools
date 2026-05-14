import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { downloadBlob } from "../Dropzone";

export function QrBarcodeRunner({ kind }: { kind: "qr" | "barcode" }) {
  const [text, setText] = useState(kind === "qr" ? "https://foqustools.app" : "012345678905");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const canvas = canvasRef.current; if (!canvas) return;
      try {
        if (kind === "qr") {
          const QR = (await import("qrcode")).default;
          await QR.toCanvas(canvas, text || " ", { width: 320, margin: 2, color: { dark: "#0f172a", light: "#ffffff" } });
        } else {
          const JsBarcode = (await import("jsbarcode")).default;
          JsBarcode(canvas, text || "0", { format: "CODE128", width: 2, height: 100, displayValue: true });
        }
      } catch {
        if (!cancelled && canvas) { const ctx = canvas.getContext("2d"); ctx?.clearRect(0, 0, canvas.width, canvas.height); }
      }
    })();
    return () => { cancelled = true; };
  }, [text, kind]);

  function download() {
    canvasRef.current?.toBlob((b) => b && downloadBlob(b, `${kind}.png`));
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground">{kind === "qr" ? "Text or URL" : "Code value"}</label>
        <Input value={text} onChange={(e) => setText(e.target.value)} className="font-mono mt-1" />
      </div>
      <div className="rounded-xl border bg-card p-6 grid place-items-center">
        <canvas ref={canvasRef} />
      </div>
      <Button variant="outline" onClick={download}><Download className="w-4 h-4" /> Download PNG</Button>
    </div>
  );
}