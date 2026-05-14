import { createFileRoute } from "@tanstack/react-router";
import { IMAGE_PROMPTS } from "@/lib/ai-prompts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const Route = createFileRoute("/api/ai/image")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      POST: async ({ request }) => {
        try {
          const { tool, prompt, imageDataUrl } = (await request.json()) as {
            tool: string;
            prompt?: string;
            imageDataUrl?: string;
          };
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(JSON.stringify({ error: "AI is not configured" }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
          }
          const basePrompt = IMAGE_PROMPTS[tool] ?? "Transform this image:";
          const fullPrompt = prompt ? `${basePrompt} ${prompt}` : basePrompt;
          const userContent: any[] = [{ type: "text", text: fullPrompt }];
          if (imageDataUrl) userContent.push({ type: "image_url", image_url: { url: imageDataUrl } });

          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-image",
              messages: [{ role: "user", content: userContent }],
              modalities: ["image", "text"],
            }),
          });
          if (!upstream.ok) {
            const status = upstream.status;
            const msg = status === 429 ? "Rate limit reached. Please wait a moment and try again." : status === 402 ? "AI credits exhausted. Add credits in workspace settings." : "AI gateway error";
            return new Response(JSON.stringify({ error: msg }), { status, headers: { ...cors, "Content-Type": "application/json" } });
          }
          const data = await upstream.json();
          const url: string | undefined = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
          const text: string | undefined = data?.choices?.[0]?.message?.content;
          if (!url) {
            return new Response(JSON.stringify({ error: "No image returned", text }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
          }
          return new Response(JSON.stringify({ url, text }), { headers: { ...cors, "Content-Type": "application/json" } });
        } catch (e) {
          return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
        }
      },
    },
  },
});