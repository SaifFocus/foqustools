import type { ReactNode } from "react";
import type { Tool } from "@/lib/tools";
import { ImageCanvasRunner } from "./runners/ImageCanvasRunner";
import { PdfRunner } from "./runners/PdfRunner";
import { QrBarcodeRunner } from "./runners/QrBarcodeRunner";
import { GradientRunner } from "./runners/GradientRunner";
import { PaletteExtractorRunner } from "./runners/PaletteExtractorRunner";
import { AiTextRunner } from "./runners/AiTextRunner";
import { AiImageRunner } from "./runners/AiImageRunner";
import { ComingSoonRunner } from "./runners/ComingSoonRunner";
import { XmlFormatter, HtmlFormatter, RegexTester, ApiTester, SvgEditor } from "./runners/DevRunners";
import { JsonFormatter, Base64Tool, UuidTool, TimestampTool, ColorTool, MarkdownTool, MinifierTool } from "./WorkingTools";

export function resolveRunner(tool: Tool): ReactNode {
  const s = tool.slug;

  // Image canvas tools
  if (["image-resizer"].includes(s)) return <ImageCanvasRunner tool={tool} mode="resize" />;
  if (["crop-image", "passport-photo", "profile-picture"].includes(s)) return <ImageCanvasRunner tool={tool} mode="crop" />;
  if (["image-compressor"].includes(s)) return <ImageCanvasRunner tool={tool} mode="compress" />;
  if (["convert-png", "convert-jpg", "convert-webp", "convert-avif"].includes(s)) return <ImageCanvasRunner tool={tool} mode="convert" />;
  if (s === "image-to-pdf") return <ImageCanvasRunner tool={tool} mode="image-to-pdf" />;

  // PDF tools
  if (s === "merge-pdf") return <PdfRunner mode="merge" />;
  if (s === "split-pdf" || s === "extract-pages") return <PdfRunner mode="extract-pages" />;
  if (s === "remove-pages") return <PdfRunner mode="remove-pages" />;
  if (s === "jpg-to-pdf") return <PdfRunner mode="jpg-to-pdf" />;

  // Vector / design
  if (s === "qr-generator") return <QrBarcodeRunner kind="qr" />;
  if (s === "barcode-generator") return <QrBarcodeRunner kind="barcode" />;
  if (s === "gradient-generator") return <GradientRunner />;
  if (s === "palette-extractor") return <PaletteExtractorRunner />;

  // AI text tools
  if (["email-writer", "blog-writer", "product-description", "resume-builder", "cover-letter", "summarizer", "grammar-fixer", "translation", "social-caption", "ad-copy"].includes(s)) {
    return <AiTextRunner tool={tool} />;
  }

  // AI image tools
  if ([
    "ai-image-generator", "logo-generator", "icon-generator", "favicon-generator",
    "background-remover", "image-upscaler", "restore-photo", "colorize-photo",
    "watermark-remover", "remove-object", "blur-face", "vectorizer",
    "png-to-svg", "jpg-to-svg", "convert-svg",
    "add-watermark", "meme-generator", "image-to-text",
  ].includes(s)) {
    return <AiImageRunner tool={tool} />;
  }

  // Dev tools
  if (s === "json-formatter") return <JsonFormatter />;
  if (s === "xml-formatter") return <XmlFormatter />;
  if (s === "html-formatter") return <HtmlFormatter />;
  if (s === "css-minifier") return <MinifierTool kind="css" />;
  if (s === "js-minifier") return <MinifierTool kind="js" />;
  if (s === "base64") return <Base64Tool />;
  if (s === "uuid-generator") return <UuidTool />;
  if (s === "regex-tester") return <RegexTester />;
  if (s === "markdown-previewer") return <MarkdownTool />;
  if (s === "api-tester") return <ApiTester />;
  if (s === "color-converter") return <ColorTool />;
  if (s === "timestamp-converter") return <TimestampTool />;
  if (s === "svg-editor") return <SvgEditor />;

  // Conversions / desktop-bound — coming soon
  return <ComingSoonRunner tool={tool} />;
}

const HOW_TO: Partial<Record<string, string[]>> = {
  default: ["Upload your file or enter your input.", "Adjust settings if needed.", "Click the action button and download the result."],
  text: ["Type or paste your input.", "Click Generate — results stream in real time.", "Copy or download the output as Markdown."],
  image: ["Drop in your image or click to browse.", "Tweak the options.", "Process and download — your file never leaves the page."],
  ai: ["Upload your image (or write a prompt).", "AI works in 10–30 seconds.", "Download the generated PNG."],
};

export function howToFor(tool: Tool): string[] {
  if (HOW_TO[tool.slug]) return HOW_TO[tool.slug]!;
  if (tool.inputType === "text") return HOW_TO.text!;
  if (tool.inputType === "image" || tool.inputType === "pdf") return HOW_TO.image!;
  return HOW_TO.default!;
}