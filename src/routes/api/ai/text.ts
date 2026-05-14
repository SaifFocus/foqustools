import { createFileRoute } from "@tanstack/react-router";
import { TEXT_PROMPTS } from "@/lib/ai-prompts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const Route = createFileRoute("/api/ai/text")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      POST: async ({ request }) => {
        try {
          const { tool, input, options } = (await request.json()) as {
            tool: string;
            input: string;
            options?: { targetLanguage?: string };
          };
          if (!input || !input.trim()) {
            return new Response(JSON.stringify({ error: "Input required" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
          }
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(JSON.stringify({ error: "AI is not configured" }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
          }
          const system = TEXT_PROMPTS[tool] ?? "You are a helpful AI assistant. Respond clearly and concisely.";
          let userContent = input;
          if (tool === "translation" && options?.targetLanguage) {
            userContent = `Target language: ${options.targetLanguage}\n\nText:\n${input}`;
          }
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: system },
                { role: "user", content: userContent },
              ],
              stream: true,
            }),
          });
          if (!upstream.ok) {
            const status = upstream.status;
            const msg = status === 429 ? "Rate limit reached. Please wait a moment and try again." : status === 402 ? "AI credits exhausted. Add credits in workspace settings." : "AI gateway error";
            return new Response(JSON.stringify({ error: msg }), { status, headers: { ...cors, "Content-Type": "application/json" } });
          }
          return new Response(upstream.body, { headers: { ...cors, "Content-Type": "text/event-stream" } });
        } catch (e) {
          return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
        }
      },
    },
  },
});