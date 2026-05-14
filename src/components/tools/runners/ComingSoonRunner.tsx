import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { Tool } from "@/lib/tools";

export function ComingSoonRunner({ tool, reason }: { tool: Tool; reason?: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-border p-10 text-center space-y-4">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-[image:var(--gradient-brand)] grid place-items-center shadow-[var(--shadow-soft)]">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{tool.name} is coming soon</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          {reason ?? "This tool needs a heavy desktop converter (e.g. LibreOffice, ffmpeg) that we'll roll out in the Pro plan."}
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        <Button asChild variant="outline"><Link to="/tools">Browse other tools</Link></Button>
      </div>
    </div>
  );
}