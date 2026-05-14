import {
  Image as ImageIcon, FileText, FileType2, Code2, Sparkles, Palette,
  Eraser, Wand2, Minimize2, Crop, Scissors, Replace, Smile, Ghost,
  ScanText, FileImage, Droplet, Stamp, Laugh, IdCard, UserCircle2,
  Shapes, PenTool, Star, Image as ImgI, Sticker, Type, QrCode, Barcode,
  FileMinus, FileSignature, Lock, Unlock, FilePlus, Combine, SplitSquareVertical,
  FileCode, FileSpreadsheet, FileVideo, FileArchive, FileUp,
  Mail, Newspaper, ShoppingBag, FileBadge, FileEdit, AlignLeft, SpellCheck, Languages, MessageSquare, Megaphone,
  Braces, FileJson, FileCode2, Hash, Fingerprint, Regex, Eye, Globe, Clock, Pipette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CategorySlug = "image" | "vector" | "pdf" | "convert" | "ai" | "dev";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: CategorySlug;
  icon: LucideIcon;
  inputType: "file" | "image" | "pdf" | "text" | "none";
  accept?: string;
  cta?: string;
  popular?: boolean;
  /** key matching a working frontend implementation */
  workingTool?: "json" | "base64" | "uuid" | "timestamp" | "color" | "markdown" | "css-min" | "js-min";
}

export const categories: Category[] = [
  { slug: "image", name: "Image Tools", short: "Image", description: "Edit, enhance, convert and transform images instantly.", icon: ImageIcon, gradient: "from-fuchsia-500 to-pink-500" },
  { slug: "vector", name: "Vector & Design", short: "Design", description: "Vectorize, generate logos, palettes, QR codes and more.", icon: Palette, gradient: "from-amber-500 to-rose-500" },
  { slug: "pdf", name: "PDF Tools", short: "PDF", description: "Merge, split, convert, sign and protect your PDFs.", icon: FileText, gradient: "from-red-500 to-orange-500" },
  { slug: "convert", name: "File Converters", short: "Convert", description: "Convert between document, spreadsheet, audio and video formats.", icon: FileType2, gradient: "from-emerald-500 to-teal-500" },
  { slug: "ai", name: "AI Writing", short: "AI", description: "Generate emails, blogs, copy and translations with AI.", icon: Sparkles, gradient: "from-violet-500 to-indigo-500" },
  { slug: "dev", name: "Developer Tools", short: "Dev", description: "Format, encode, generate and test — fast utilities for builders.", icon: Code2, gradient: "from-sky-500 to-cyan-500" },
];

export const tools: Tool[] = [
  // IMAGE
  { slug: "background-remover", name: "Background Remover", description: "Remove image backgrounds in seconds.", category: "image", icon: Eraser, inputType: "image", accept: "image/*", popular: true },
  { slug: "image-upscaler", name: "Image Enhancer / Upscaler", description: "Upscale and enhance image quality with AI.", category: "image", icon: Wand2, inputType: "image", accept: "image/*", popular: true },
  { slug: "image-compressor", name: "Image Compressor", description: "Shrink image file size without losing quality.", category: "image", icon: Minimize2, inputType: "image", accept: "image/*", popular: true },
  { slug: "image-resizer", name: "Image Resizer", description: "Resize images to any dimensions.", category: "image", icon: Shapes, inputType: "image", accept: "image/*" },
  { slug: "crop-image", name: "Crop Image", description: "Crop and trim images quickly.", category: "image", icon: Crop, inputType: "image", accept: "image/*" },
  { slug: "convert-png", name: "Convert to PNG", description: "Convert any image to PNG format.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "convert-jpg", name: "Convert to JPG", description: "Convert any image to JPG format.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "convert-webp", name: "Convert to WEBP", description: "Convert any image to WEBP format.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "convert-svg", name: "Convert to SVG", description: "Convert raster images to scalable SVG.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "convert-avif", name: "Convert to AVIF", description: "Convert images to next-gen AVIF format.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "blur-face", name: "Blur Face / Object", description: "Automatically blur faces or objects.", category: "image", icon: Ghost, inputType: "image", accept: "image/*" },
  { slug: "remove-object", name: "Remove Object", description: "Erase unwanted objects from any photo.", category: "image", icon: Scissors, inputType: "image", accept: "image/*" },
  { slug: "colorize-photo", name: "Colorize B&W Photo", description: "Bring black & white photos to life.", category: "image", icon: Replace, inputType: "image", accept: "image/*" },
  { slug: "restore-photo", name: "Restore Old Photo", description: "Restore and repair old, damaged photos.", category: "image", icon: Sparkles, inputType: "image", accept: "image/*" },
  { slug: "ai-image-generator", name: "AI Image Generator", description: "Generate stunning images from a prompt.", category: "image", icon: Sparkles, inputType: "text", popular: true, cta: "Generate" },
  { slug: "image-to-text", name: "Image to Text (OCR)", description: "Extract text from any image.", category: "image", icon: ScanText, inputType: "image", accept: "image/*" },
  { slug: "image-to-pdf", name: "Image to PDF", description: "Convert images into a PDF document.", category: "image", icon: FileText, inputType: "image", accept: "image/*" },
  { slug: "watermark-remover", name: "Watermark Remover", description: "Remove watermarks from images.", category: "image", icon: Droplet, inputType: "image", accept: "image/*" },
  { slug: "add-watermark", name: "Add Watermark", description: "Add custom watermarks to your images.", category: "image", icon: Stamp, inputType: "image", accept: "image/*" },
  { slug: "meme-generator", name: "Meme Generator", description: "Create viral memes in seconds.", category: "image", icon: Laugh, inputType: "image", accept: "image/*" },
  { slug: "passport-photo", name: "Passport Photo Maker", description: "Create compliant passport-size photos.", category: "image", icon: IdCard, inputType: "image", accept: "image/*" },
  { slug: "profile-picture", name: "Profile Picture Maker", description: "Design clean profile pictures.", category: "image", icon: UserCircle2, inputType: "image", accept: "image/*" },

  // VECTOR
  { slug: "png-to-svg", name: "PNG to SVG", description: "Vectorize PNG images into SVG.", category: "vector", icon: PenTool, inputType: "image", accept: "image/png" },
  { slug: "jpg-to-svg", name: "JPG to SVG", description: "Convert JPG images to SVG vector.", category: "vector", icon: PenTool, inputType: "image", accept: "image/jpeg" },
  { slug: "vectorizer", name: "Vectorizer", description: "Trace any raster into clean vector paths.", category: "vector", icon: PenTool, inputType: "image", accept: "image/*" },
  { slug: "svg-editor", name: "SVG Editor", description: "Edit SVG markup with live preview.", category: "vector", icon: FileCode, inputType: "text" },
  { slug: "icon-generator", name: "Icon Generator", description: "Generate custom icon sets.", category: "vector", icon: Star, inputType: "text", cta: "Generate" },
  { slug: "logo-generator", name: "Logo Generator", description: "Create a logo from a brand description.", category: "vector", icon: Sticker, inputType: "text", cta: "Generate" },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Generate favicons for every device.", category: "vector", icon: ImgI, inputType: "image", accept: "image/*" },
  { slug: "palette-extractor", name: "Color Palette Extractor", description: "Extract palette colors from an image.", category: "vector", icon: Pipette, inputType: "image", accept: "image/*" },
  { slug: "gradient-generator", name: "Gradient Generator", description: "Build beautiful CSS gradients.", category: "vector", icon: Palette, inputType: "none", cta: "Open" },
  { slug: "qr-generator", name: "QR Code Generator", description: "Generate QR codes for any text or URL.", category: "vector", icon: QrCode, inputType: "text", cta: "Generate", popular: true },
  { slug: "barcode-generator", name: "Barcode Generator", description: "Generate barcodes from text.", category: "vector", icon: Barcode, inputType: "text", cta: "Generate" },

  // PDF
  { slug: "pdf-to-word", name: "PDF to Word", description: "Convert PDF to editable Word document.", category: "pdf", icon: FileText, inputType: "pdf", accept: "application/pdf", popular: true },
  { slug: "word-to-pdf", name: "Word to PDF", description: "Convert Word documents to PDF.", category: "pdf", icon: FileText, inputType: "file", accept: ".doc,.docx" },
  { slug: "pdf-to-jpg", name: "PDF to JPG", description: "Convert PDF pages to JPG images.", category: "pdf", icon: FileImage, inputType: "pdf", accept: "application/pdf" },
  { slug: "jpg-to-pdf", name: "JPG to PDF", description: "Combine JPG images into a PDF.", category: "pdf", icon: FileText, inputType: "image", accept: "image/*" },
  { slug: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDFs into one.", category: "pdf", icon: Combine, inputType: "pdf", accept: "application/pdf", popular: true },
  { slug: "split-pdf", name: "Split PDF", description: "Split a PDF into separate files.", category: "pdf", icon: SplitSquareVertical, inputType: "pdf", accept: "application/pdf" },
  { slug: "compress-pdf", name: "Compress PDF", description: "Reduce PDF file size.", category: "pdf", icon: Minimize2, inputType: "pdf", accept: "application/pdf" },
  { slug: "sign-pdf", name: "Sign PDF", description: "Add your signature to any PDF.", category: "pdf", icon: FileSignature, inputType: "pdf", accept: "application/pdf" },
  { slug: "remove-pages", name: "Remove Pages", description: "Delete specific pages from a PDF.", category: "pdf", icon: FileMinus, inputType: "pdf", accept: "application/pdf" },
  { slug: "extract-pages", name: "Extract Pages", description: "Extract pages from a PDF.", category: "pdf", icon: FilePlus, inputType: "pdf", accept: "application/pdf" },
  { slug: "protect-pdf", name: "Protect PDF", description: "Password protect any PDF.", category: "pdf", icon: Lock, inputType: "pdf", accept: "application/pdf" },
  { slug: "unlock-pdf", name: "Unlock PDF", description: "Remove PDF passwords (with permission).", category: "pdf", icon: Unlock, inputType: "pdf", accept: "application/pdf" },
  { slug: "ocr-pdf", name: "OCR PDF", description: "Make scanned PDFs searchable.", category: "pdf", icon: ScanText, inputType: "pdf", accept: "application/pdf" },

  // CONVERTERS
  { slug: "docx-to-pdf", name: "DOCX to PDF", description: "Convert Word documents to PDF.", category: "convert", icon: FileText, inputType: "file", accept: ".docx" },
  { slug: "pdf-to-docx", name: "PDF to DOCX", description: "Convert PDF to editable DOCX.", category: "convert", icon: FileText, inputType: "pdf", accept: "application/pdf" },
  { slug: "pptx-to-pdf", name: "PPTX to PDF", description: "Convert presentations to PDF.", category: "convert", icon: FileText, inputType: "file", accept: ".pptx" },
  { slug: "pdf-to-pptx", name: "PDF to PPTX", description: "Convert PDF to PowerPoint.", category: "convert", icon: FileText, inputType: "pdf", accept: "application/pdf" },
  { slug: "xlsx-to-csv", name: "XLSX to CSV", description: "Convert Excel sheets to CSV.", category: "convert", icon: FileSpreadsheet, inputType: "file", accept: ".xlsx" },
  { slug: "csv-to-xlsx", name: "CSV to XLSX", description: "Convert CSV files to Excel.", category: "convert", icon: FileSpreadsheet, inputType: "file", accept: ".csv" },
  { slug: "csv-to-json", name: "CSV to JSON", description: "Convert CSV data to JSON.", category: "convert", icon: FileJson, inputType: "file", accept: ".csv" },
  { slug: "json-to-csv", name: "JSON to CSV", description: "Convert JSON data to CSV.", category: "convert", icon: FileSpreadsheet, inputType: "file", accept: ".json" },
  { slug: "html-to-pdf", name: "HTML to PDF", description: "Convert HTML files to PDF.", category: "convert", icon: FileCode, inputType: "file", accept: ".html" },
  { slug: "pdf-to-html", name: "PDF to HTML", description: "Convert PDF documents to HTML.", category: "convert", icon: FileCode, inputType: "pdf", accept: "application/pdf" },
  { slug: "mp4-to-mp3", name: "MP4 to MP3", description: "Extract audio from MP4 video.", category: "convert", icon: FileVideo, inputType: "file", accept: ".mp4" },
  { slug: "mov-to-mp4", name: "MOV to MP4", description: "Convert MOV videos to MP4.", category: "convert", icon: FileVideo, inputType: "file", accept: ".mov" },
  { slug: "zip-files", name: "ZIP Files", description: "Compress files into a ZIP archive.", category: "convert", icon: FileArchive, inputType: "file" },
  { slug: "unzip-files", name: "Unzip Files", description: "Extract files from a ZIP archive.", category: "convert", icon: FileUp, inputType: "file", accept: ".zip" },

  // AI
  { slug: "email-writer", name: "Email Writer", description: "Draft professional emails in seconds.", category: "ai", icon: Mail, inputType: "text", cta: "Generate", popular: true },
  { slug: "blog-writer", name: "Blog Writer", description: "Write SEO-friendly blog posts.", category: "ai", icon: Newspaper, inputType: "text", cta: "Generate" },
  { slug: "product-description", name: "Product Description", description: "Generate compelling product copy.", category: "ai", icon: ShoppingBag, inputType: "text", cta: "Generate" },
  { slug: "resume-builder", name: "Resume Builder", description: "Build a polished resume from your info.", category: "ai", icon: FileBadge, inputType: "text", cta: "Generate" },
  { slug: "cover-letter", name: "Cover Letter Generator", description: "Generate a tailored cover letter.", category: "ai", icon: FileEdit, inputType: "text", cta: "Generate" },
  { slug: "summarizer", name: "Text Summarizer", description: "Summarize long text instantly.", category: "ai", icon: AlignLeft, inputType: "text", cta: "Summarize" },
  { slug: "grammar-fixer", name: "Grammar Fixer", description: "Fix grammar and improve clarity.", category: "ai", icon: SpellCheck, inputType: "text", cta: "Fix" },
  { slug: "translation", name: "Translation", description: "Translate text into 100+ languages.", category: "ai", icon: Languages, inputType: "text", cta: "Translate" },
  { slug: "social-caption", name: "Social Media Captions", description: "Generate engaging captions.", category: "ai", icon: MessageSquare, inputType: "text", cta: "Generate" },
  { slug: "ad-copy", name: "Ad Copy Generator", description: "Generate high-converting ads.", category: "ai", icon: Megaphone, inputType: "text", cta: "Generate" },

  // DEV
  { slug: "json-formatter", name: "JSON Formatter", description: "Beautify and validate JSON.", category: "dev", icon: Braces, inputType: "text", workingTool: "json", popular: true },
  { slug: "xml-formatter", name: "XML Formatter", description: "Pretty-print XML documents.", category: "dev", icon: FileCode, inputType: "text" },
  { slug: "html-formatter", name: "HTML Formatter", description: "Format and indent HTML.", category: "dev", icon: FileCode, inputType: "text" },
  { slug: "css-minifier", name: "CSS Minifier", description: "Minify CSS to reduce size.", category: "dev", icon: FileCode2, inputType: "text", workingTool: "css-min" },
  { slug: "js-minifier", name: "JS Minifier", description: "Minify JavaScript code.", category: "dev", icon: FileCode2, inputType: "text", workingTool: "js-min" },
  { slug: "base64", name: "Base64 Encode/Decode", description: "Encode or decode Base64 strings.", category: "dev", icon: Hash, inputType: "text", workingTool: "base64", popular: true },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate v4 UUIDs instantly.", category: "dev", icon: Fingerprint, inputType: "none", workingTool: "uuid" },
  { slug: "regex-tester", name: "Regex Tester", description: "Test regular expressions live.", category: "dev", icon: Regex, inputType: "text" },
  { slug: "markdown-previewer", name: "Markdown Previewer", description: "Preview rendered Markdown.", category: "dev", icon: Eye, inputType: "text", workingTool: "markdown" },
  { slug: "api-tester", name: "API Tester", description: "Send HTTP requests to any API.", category: "dev", icon: Globe, inputType: "text" },
  { slug: "color-converter", name: "Color Converter", description: "Convert between HEX, RGB and HSL.", category: "dev", icon: Pipette, inputType: "text", workingTool: "color" },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Convert between Unix and ISO dates.", category: "dev", icon: Clock, inputType: "text", workingTool: "timestamp" },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
export const toolsByCategory = (slug: CategorySlug) => tools.filter((t) => t.category === slug);
export const popularTools = () => tools.filter((t) => t.popular);