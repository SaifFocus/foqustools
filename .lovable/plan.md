# Make all 90+ tools functional

## Architecture

```text
src/routes/tool.$slug.tsx        ← single dynamic route, renders ToolPage shell
src/components/tools/
  ToolPage.tsx                   ← shared layout: hero, runner slot, "How it works", related tools
  runners/
    ImageCanvasRunner.tsx        ← resize / crop / compress / convert (PNG/JPG/WEBP/AVIF) / watermark / meme
    PdfRunner.tsx                ← merge / split / compress / remove-pages / extract / image↔pdf  (pdf-lib)
    QrBarcodeRunner.tsx          ← QR + barcode (qrcode + jsbarcode)
    GradientRunner.tsx           ← gradient builder + copyable CSS
    PaletteExtractorRunner.tsx   ← canvas color quantize
    ColorConverterRunner.tsx     ← HEX↔RGB↔HSL (already in WorkingTools, reused)
    AiTextRunner.tsx             ← email/blog/product/resume/cover/summarize/grammar/translate/caption/ad/ocr/markdown/regex helpers
    AiImageRunner.tsx            ← image generation, edit, BG remove, upscale, restore, colorize, watermark remove, vectorize-prompt
    WorkingToolsRunner.tsx       ← wraps existing JSON / Base64 / UUID / timestamp / markdown / minifiers
    ComingSoonRunner.tsx         ← clean fallback for anything not yet wired
src/lib/tools.ts                 ← extend each Tool with `runner: "<key>"` + per-tool config
src/lib/ai.ts                    ← thin client → /api/ai/text and /api/ai/image
src/routes/api/ai/text.ts        ← server route: streams Lovable AI Gateway chat completions
src/routes/api/ai/image.ts       ← server route: image gen / edit via Gateway, returns base64
```

The `ToolCard` already links to `/tool/$slug`, so no nav changes needed.

## Page template (same for every tool)

1. Breadcrumb: `Tools › {Category}`
2. Gradient icon tile + tool name + one-line description
3. **Runner card** (white card, rounded-3xl, shadow-soft) — picked from the registry by `tool.runner`
4. **Output panel** appears after run: preview + Copy / Download
5. **How to use it** — 3 numbered steps (text per tool)
6. **Related tools** — 4 other tools from same category
7. SEO `head()` per route with title/description/og from the tool config

## What "fully functional" means per tool group

| Group | Behavior |
|---|---|
| Image: resize, crop, compress, convert (PNG/JPG/WEBP/AVIF), add-watermark, meme, passport/profile crop, image-to-PDF | Browser Canvas + pdf-lib, instant download |
| Image AI: BG remove, upscale, restore, colorize, watermark/object remove, blur face, vectorize, AI image gen, image-to-text (OCR), favicon, logo, icon, profile picture | Lovable AI Gateway via `/api/ai/image` (Nano Banana for gen/edit) |
| PDF: merge, split, remove-pages, extract-pages, jpg↔pdf, compress | pdf-lib in browser |
| PDF/Convert advanced: PDF↔Word/PPTX, DOCX↔PDF, MOV/MP4/MP3, ZIP, OCR-PDF, sign/protect/unlock | Step-by-step: Lovable AI describes/transforms text content for *-to-text pairs; binary-only pairs (mov→mp4, docx→pdf, protect-pdf) show a polished "needs a desktop converter" panel that links to the AI alternative when one exists |
| Vector/design: QR, barcode, gradient, palette extractor, favicon | Pure JS libs (`qrcode`, `jsbarcode`) + canvas |
| AI writing (10 tools) | Streamed completions from `/api/ai/text` with per-tool system prompt; copy + download .txt/.md |
| Dev (12 tools) | All wired in-browser (formatters, minifiers via `js-beautify` + `terser` browser build, base64, UUID, timestamp, color, markdown, regex, API tester via fetch) |

## Server functions (Lovable AI Gateway)

`POST /api/ai/text` — body `{ tool, input, options }`. Server picks the system prompt from a `PROMPTS` map keyed by tool slug, calls `google/gemini-3-flash-preview` with `stream: true`, pipes SSE through. Auth header is `Bearer ${process.env.LOVABLE_API_KEY}`. Handles 402/429 with JSON error.

`POST /api/ai/image` — body `{ tool, prompt?, imageBase64? }`. Calls `google/gemini-2.5-flash-image` with `modalities: ["image","text"]`. For BG remove / restore / colorize / upscale / watermark remove / blur face / vectorize / object remove, server prepends a tool-specific instruction and the user's image. Returns `{ url: "data:image/png;base64,..." }`.

Both routes live under `src/routes/api/` and use the public anon key path (no per-user auth required for tools).

## New dependencies

`pdf-lib`, `qrcode`, `jsbarcode`, `js-beautify`, `terser` (browser ESM), `react-dropzone` (consistent upload UX).

## Out of scope

- No accounts/usage limits/payments yet
- No persistent history (would need DB; ask in a follow-up if you want it)
- True video/audio transcoding and Word→PDF binary conversion stay as polished "use desktop tool" cards — these need ffmpeg/LibreOffice which can't run in a Worker

## SEO

Each tool gets `title: "{Name} — Free Online Tool | OmniTools"`, unique meta description from `tool.description`, og:title/og:description matching, single H1 = tool name.

## Files I'll touch

- new: `src/routes/tool.$slug.tsx`, 9 runner files, 2 API routes, `src/lib/ai.ts`
- edit: `src/lib/tools.ts` (add `runner` key + per-tool config + how-to steps)
- edit: `src/components/tools/WorkingTools.tsx` (export individual tool components for reuse)
- no change: ToolCard, Header, Footer, index, styles
