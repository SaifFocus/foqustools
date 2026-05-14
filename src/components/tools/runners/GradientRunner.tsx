import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";

export function GradientRunner() {
  const [c1, setC1] = useState("#7c3aed");
  const [c2, setC2] = useState("#ec4899");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);
  const css = `background: linear-gradient(${angle}deg, ${c1}, ${c2});`;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <div><label className="text-xs">Color 1</label><div className="flex gap-2 items-center mt-1"><input type="color" value={c1} onChange={(e) => setC1(e.target.value)} className="w-12 h-10 rounded-md border" /><Input value={c1} onChange={(e) => setC1(e.target.value)} className="font-mono" /></div></div>
        <div><label className="text-xs">Color 2</label><div className="flex gap-2 items-center mt-1"><input type="color" value={c2} onChange={(e) => setC2(e.target.value)} className="w-12 h-10 rounded-md border" /><Input value={c2} onChange={(e) => setC2(e.target.value)} className="font-mono" /></div></div>
        <div><label className="text-xs">Angle: {angle}°</label><input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full mt-3" /></div>
      </div>
      <div className="h-56 rounded-2xl border" style={{ background: `linear-gradient(${angle}deg, ${c1}, ${c2})` }} />
      <div className="flex items-center justify-between gap-3 p-3 rounded-md border bg-muted/40 font-mono text-xs">
        <code>{css}</code>
        <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
          {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </Button>
      </div>
    </div>
  );
}