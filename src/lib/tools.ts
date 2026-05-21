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
  { slug: "background-remover", name: "Background Remover", description: "Remove image backgrounds online free in one click. AI background remover for photos, products and portraits — transparent PNG output, instant.", category: "image", icon: Eraser, inputType: "image", accept: "image/*", popular: true },
  { slug: "image-upscaler", name: "Image Enhancer / Upscaler", description: "AI image upscaler and enhancer online. Upscale photos up to 4x, sharpen details and remove blur — no software, no signup, instant download.", category: "image", icon: Wand2, inputType: "image", accept: "image/*", popular: true },
  { slug: "image-compressor", name: "Image Compressor", description: "Compress JPG, PNG and WebP images online without losing visible quality. Reduce file size for faster sites, email and social uploads in seconds.", category: "image", icon: Minimize2, inputType: "image", accept: "image/*", popular: true },
  { slug: "image-resizer", name: "Image Resizer", description: "Free online image resizer. Resize JPG, PNG and WebP photos to any width, height or aspect ratio for web, social media, print and thumbnails.", category: "image", icon: Shapes, inputType: "image", accept: "image/*" },
  { slug: "crop-image", name: "Crop Image", description: "Free online image cropper. Crop JPG, PNG and WebP photos to any aspect ratio — square, 16:9, Instagram, story or custom dimensions in seconds.", category: "image", icon: Crop, inputType: "image", accept: "image/*" },
  { slug: "convert-png", name: "Convert to PNG", description: "Convert any image to PNG online — JPG, WebP, HEIC, GIF and more. Preserve transparency and sharp edges with lossless PNG export, no signup needed.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "convert-jpg", name: "Convert to JPG", description: "Convert any image to JPG online. Turn PNG, WebP, HEIC and GIF files into compressed JPEG photos perfect for web, email and sharing — fast and free.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "convert-webp", name: "Convert to WEBP", description: "Convert images to WebP online for faster websites. Compress JPG and PNG into lightweight WebP with high quality and full transparency support, free.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "convert-svg", name: "Convert to SVG", description: "Convert raster images to SVG online. Vectorize PNG, JPG and logos into clean scalable SVG paths perfect for web, icons and print — free and instant.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "convert-avif", name: "Convert to AVIF", description: "Convert images to AVIF online. Compress JPG, PNG and WebP into next-gen AVIF with smaller files and better quality for faster web pages, free.", category: "image", icon: FileImage, inputType: "image", accept: "image/*" },
  { slug: "blur-face", name: "Blur Face / Object", description: "Free online face and object blurring tool. Automatically detect and pixelate faces, license plates and sensitive details in photos to protect privacy.", category: "image", icon: Ghost, inputType: "image", accept: "image/*" },
  { slug: "remove-object", name: "Remove Object", description: "AI object remover for photos. Erase people, text, watermarks or unwanted items from images online — clean, seamless results, no Photoshop required.", category: "image", icon: Scissors, inputType: "image", accept: "image/*" },
  { slug: "colorize-photo", name: "Colorize B&W Photo", description: "AI colorize black and white photos online. Restore vintage portraits and old family pictures with realistic, natural-looking colors in seconds, free.", category: "image", icon: Replace, inputType: "image", accept: "image/*" },
  { slug: "restore-photo", name: "Restore Old Photo", description: "AI photo restoration online. Fix scratches, blur, noise and damage in old photos and bring faded family pictures back to life — free, no signup.", category: "image", icon: Sparkles, inputType: "image", accept: "image/*" },
  { slug: "ai-image-generator", name: "AI Image Generator", description: "Free AI image generator. Create stunning artwork, illustrations and photos from a text prompt — high resolution, commercial-use friendly, instant.", category: "image", icon: Sparkles, inputType: "text", popular: true, cta: "Generate" },
  { slug: "image-to-text", name: "Image to Text (OCR)", description: "Free online image to text OCR. Extract text from photos, screenshots and scanned documents in 100+ languages — copy, search or paste anywhere.", category: "image", icon: ScanText, inputType: "image", accept: "image/*" },
  { slug: "image-to-pdf", name: "Image to PDF", description: "Convert images to PDF online. Combine JPG, PNG and HEIC photos into a single PDF document — perfect for receipts, IDs, scans and portfolios.", category: "image", icon: FileText, inputType: "image", accept: "image/*" },
  { slug: "watermark-remover", name: "Watermark Remover", description: "AI watermark remover for images. Erase logos, stamps and text overlays from photos online and recover the clean original — no Photoshop needed.", category: "image", icon: Droplet, inputType: "image", accept: "image/*" },
  { slug: "add-watermark", name: "Add Watermark", description: "Add custom watermarks to images online. Stamp logos, text or copyright marks on photos in batch to protect your work — adjust opacity and position.", category: "image", icon: Stamp, inputType: "image", accept: "image/*" },
  { slug: "meme-generator", name: "Meme Generator", description: "Free online meme generator. Add top and bottom text to viral templates or upload your own image to create shareable memes for social media in seconds.", category: "image", icon: Laugh, inputType: "image", accept: "image/*" },
  { slug: "passport-photo", name: "Passport Photo Maker", description: "Make passport photos online. Auto-crop, resize and white-background your portrait to US, UK, EU, Schengen and visa specs — print-ready in seconds.", category: "image", icon: IdCard, inputType: "image", accept: "image/*" },
  { slug: "profile-picture", name: "Profile Picture Maker", description: "Free profile picture maker. Crop, enhance and round your photo for LinkedIn, Instagram, Twitter and Discord avatars — clean, professional results.", category: "image", icon: UserCircle2, inputType: "image", accept: "image/*" },

  // VECTOR
  { slug: "png-to-svg", name: "PNG to SVG", description: "Convert PNG to SVG online free. Vectorize logos, icons and line art into clean scalable SVG paths — perfect for web, design tools and print.", category: "vector", icon: PenTool, inputType: "image", accept: "image/png" },
  { slug: "jpg-to-svg", name: "JPG to SVG", description: "Convert JPG to SVG online. Trace photos, sketches and logos into scalable vector SVG files for crisp display at any size, in any design tool — free.", category: "vector", icon: PenTool, inputType: "image", accept: "image/jpeg" },
  { slug: "vectorizer", name: "Vectorizer", description: "Free online vectorizer. Trace raster PNG and JPG images into clean vector paths and export to AI, EPS, SVG or PDF for design and print — accurate.", category: "vector", icon: PenTool, inputType: "image", accept: "image/*" },
  { slug: "svg-editor", name: "SVG Editor", description: "Online SVG editor with live preview. Edit SVG markup, tweak paths, colors and viewBox, then export the optimized vector file — no software needed.", category: "vector", icon: FileCode, inputType: "text" },
  { slug: "icon-generator", name: "Icon Generator", description: "AI icon generator. Create matching custom icon sets from a text prompt — consistent style, multiple sizes, SVG and PNG export for apps and web.", category: "vector", icon: Star, inputType: "text", cta: "Generate" },
  { slug: "logo-generator", name: "Logo Generator", description: "AI logo generator online. Create a unique brand logo from a description — instant variations, color palettes and SVG/PNG export, ready to download.", category: "vector", icon: Sticker, inputType: "text", cta: "Generate" },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Free favicon generator. Convert any image to favicon.ico plus PNG, Apple touch icon and Android tiles — drop-in package for every device and browser.", category: "vector", icon: ImgI, inputType: "image", accept: "image/*" },
  { slug: "palette-extractor", name: "Color Palette Extractor", description: "Color palette extractor from images. Upload a photo to pull the dominant colors and export HEX, RGB and HSL palettes for design and branding.", category: "vector", icon: Pipette, inputType: "image", accept: "image/*" },
  { slug: "gradient-generator", name: "Gradient Generator", description: "Free CSS gradient generator. Build beautiful linear, radial and conic gradients with multiple stops, then copy ready-to-paste CSS for your website.", category: "vector", icon: Palette, inputType: "none", cta: "Open" },
  { slug: "qr-generator", name: "QR Code Generator", description: "Free QR code generator. Create QR codes for URLs, WiFi, text, vCard and email — customize color and size, then download PNG or SVG, instant use.", category: "vector", icon: QrCode, inputType: "text", cta: "Generate", popular: true },
  { slug: "barcode-generator", name: "Barcode Generator", description: "Free online barcode generator. Create EAN, UPC, Code 128, Code 39 and QR barcodes from text or numbers — high-resolution PNG and SVG download.", category: "vector", icon: Barcode, inputType: "text", cta: "Generate" },

  // PDF
  { slug: "pdf-to-word", name: "PDF to Word", description: "Convert PDF to Word online free. Turn PDFs into editable DOCX documents while preserving layout, fonts, images and tables — no signup, no install.", category: "pdf", icon: FileText, inputType: "pdf", accept: "application/pdf", popular: true },
  { slug: "word-to-pdf", name: "Word to PDF", description: "Convert Word to PDF online. Turn DOC and DOCX documents into clean, print-ready PDF files with preserved fonts, images and layout — free and fast.", category: "pdf", icon: FileText, inputType: "file", accept: ".doc,.docx" },
  { slug: "pdf-to-jpg", name: "PDF to JPG", description: "Convert PDF to JPG online. Extract every page of a PDF as a high-quality JPEG image — great for previews, social sharing and quick edits, free.", category: "pdf", icon: FileImage, inputType: "pdf", accept: "application/pdf" },
  { slug: "jpg-to-pdf", name: "JPG to PDF", description: "Convert JPG to PDF online. Combine multiple JPG, PNG or HEIC images into a single PDF document — reorder pages, set size, download in seconds.", category: "pdf", icon: FileText, inputType: "image", accept: "image/*" },
  { slug: "merge-pdf", name: "Merge PDF", description: "Merge PDF files online free. Combine multiple PDFs into a single document, drag to reorder pages and download — no signup, no watermark, no limit.", category: "pdf", icon: Combine, inputType: "pdf", accept: "application/pdf", popular: true },
  { slug: "split-pdf", name: "Split PDF", description: "Split PDF online free. Separate a PDF into individual pages or extract custom page ranges into new PDF files — fast, secure, no signup required.", category: "pdf", icon: SplitSquareVertical, inputType: "pdf", accept: "application/pdf" },
  { slug: "compress-pdf", name: "Compress PDF", description: "Compress PDF online free. Reduce PDF file size for email, upload and storage while keeping text sharp and images clear — secure, no signup needed.", category: "pdf", icon: Minimize2, inputType: "pdf", accept: "application/pdf" },
  { slug: "sign-pdf", name: "Sign PDF", description: "Sign PDF online free. Draw, type or upload your signature and place it on any PDF document — legally valid e-signatures, no software install needed.", category: "pdf", icon: FileSignature, inputType: "pdf", accept: "application/pdf" },
  { slug: "remove-pages", name: "Remove Pages", description: "Remove pages from a PDF online. Delete unwanted pages from a PDF document and download the cleaned file — fast, secure and free, no signup needed.", category: "pdf", icon: FileMinus, inputType: "pdf", accept: "application/pdf" },
  { slug: "extract-pages", name: "Extract Pages", description: "Extract pages from a PDF online. Pick single pages or custom ranges and save them as a brand new PDF document — fast, free and no signup required.", category: "pdf", icon: FilePlus, inputType: "pdf", accept: "application/pdf" },
  { slug: "protect-pdf", name: "Protect PDF", description: "Password protect PDF online. Encrypt any PDF with a strong password to control who can open, copy or print the document — secure and free, no signup.", category: "pdf", icon: Lock, inputType: "pdf", accept: "application/pdf" },
  { slug: "unlock-pdf", name: "Unlock PDF", description: "Unlock PDF online. Remove password protection and copy/print restrictions from PDFs you own — fast, secure, no signup required, free unlimited use.", category: "pdf", icon: Unlock, inputType: "pdf", accept: "application/pdf" },
  { slug: "ocr-pdf", name: "OCR PDF", description: "OCR PDF online free. Make scanned PDFs and image PDFs searchable, copyable and selectable with accurate optical character recognition in 100+ languages.", category: "pdf", icon: ScanText, inputType: "pdf", accept: "application/pdf" },

  // CONVERTERS
  { slug: "docx-to-pdf", name: "DOCX to PDF", description: "Convert DOCX to PDF online free. Turn Word documents into clean, print-ready PDFs with preserved fonts, layout, images and tables — fast and secure.", category: "convert", icon: FileText, inputType: "file", accept: ".docx" },
  { slug: "pdf-to-docx", name: "PDF to DOCX", description: "Convert PDF to DOCX online free. Turn PDFs into fully editable Word documents while keeping fonts, paragraphs, images and tables intact — fast, secure.", category: "convert", icon: FileText, inputType: "pdf", accept: "application/pdf" },
  { slug: "pptx-to-pdf", name: "PPTX to PDF", description: "Convert PPTX to PDF online. Turn PowerPoint presentations into shareable, print-ready PDFs with preserved slides, fonts, images and transitions — free.", category: "convert", icon: FileText, inputType: "file", accept: ".pptx" },
  { slug: "pdf-to-pptx", name: "PDF to PPTX", description: "Convert PDF to PPTX online. Turn PDF documents into editable PowerPoint presentations with each page as a slide — free, fast, no signup required.", category: "convert", icon: FileText, inputType: "pdf", accept: "application/pdf" },
  { slug: "xlsx-to-csv", name: "XLSX to CSV", description: "Convert XLSX to CSV online free. Turn Excel spreadsheets into clean comma-separated CSV files for databases, scripts and analysis — fast and secure.", category: "convert", icon: FileSpreadsheet, inputType: "file", accept: ".xlsx" },
  { slug: "ods-to-pdf", name: "ODS to PDF", description: "Convert ODS to PDF online free. Turn OpenDocument and LibreOffice Calc spreadsheets into clean, print-ready PDFs — each sheet a page, no signup needed.", category: "convert", icon: FileSpreadsheet, inputType: "file", accept: ".ods" },
  { slug: "csv-to-xlsx", name: "CSV to XLSX", description: "Convert CSV to XLSX online. Turn comma-separated data into Excel spreadsheets with auto-detected columns, types and headers — free, fast, no signup.", category: "convert", icon: FileSpreadsheet, inputType: "file", accept: ".csv" },
  { slug: "csv-to-json", name: "CSV to JSON", description: "Convert CSV to JSON online free. Turn spreadsheet rows into clean, validated JSON arrays for APIs, JavaScript and data pipelines — instant download.", category: "convert", icon: FileJson, inputType: "file", accept: ".csv" },
  { slug: "json-to-csv", name: "JSON to CSV", description: "Convert JSON to CSV online free. Flatten nested JSON arrays into clean CSV rows for Excel, Google Sheets and analytics tools — instant, no signup.", category: "convert", icon: FileSpreadsheet, inputType: "file", accept: ".json" },
  { slug: "html-to-pdf", name: "HTML to PDF", description: "Convert HTML to PDF online. Turn web pages or HTML files into clean, print-ready PDF documents with preserved styles, images and links — free and fast.", category: "convert", icon: FileCode, inputType: "file", accept: ".html" },
  { slug: "pdf-to-html", name: "PDF to HTML", description: "Convert PDF to HTML online. Turn PDF documents into clean responsive HTML pages with preserved text, images and layout — free, fast, no signup needed.", category: "convert", icon: FileCode, inputType: "pdf", accept: "application/pdf" },
  { slug: "mp4-to-mp3", name: "MP4 to MP3", description: "Convert MP4 to MP3 online free. Extract high-quality audio from video files for podcasts, music and voice notes — fast, secure, no signup needed.", category: "convert", icon: FileVideo, inputType: "file", accept: ".mp4" },
  { slug: "mov-to-mp4", name: "MOV to MP4", description: "Convert MOV to MP4 online free. Turn iPhone and QuickTime videos into universal MP4 files compatible with Windows, Android and social platforms.", category: "convert", icon: FileVideo, inputType: "file", accept: ".mov" },
  { slug: "zip-files", name: "ZIP Files", description: "Free online ZIP file creator. Compress multiple files and folders into a single ZIP archive for fast sharing, email and storage — no signup needed.", category: "convert", icon: FileArchive, inputType: "file" },
  { slug: "unzip-files", name: "Unzip Files", description: "Free online ZIP extractor. Unzip ZIP, RAR and 7Z archives in your browser and download individual files — fast, secure, no software install needed.", category: "convert", icon: FileUp, inputType: "file", accept: ".zip" },

  // AI
  { slug: "email-writer", name: "Email Writer", description: "AI email writer free online. Draft professional, polite or persuasive emails in seconds — replies, outreach, follow-ups and announcements made easy.", category: "ai", icon: Mail, inputType: "text", cta: "Generate", popular: true },
  { slug: "blog-writer", name: "Blog Writer", description: "AI blog post writer. Generate SEO-friendly, long-form articles from a title or topic — outlines, headings, intros and CTAs, ready to publish, free.", category: "ai", icon: Newspaper, inputType: "text", cta: "Generate" },
  { slug: "product-description", name: "Product Description", description: "AI product description generator. Write compelling, SEO-optimized copy for Shopify, Amazon and Etsy listings — features, benefits and CTAs included.", category: "ai", icon: ShoppingBag, inputType: "text", cta: "Generate" },
  { slug: "resume-builder", name: "Resume Builder", description: "AI resume builder online. Create a polished, ATS-friendly resume from your work history — modern templates, instant PDF download, free and easy.", category: "ai", icon: FileBadge, inputType: "text", cta: "Generate" },
  { slug: "cover-letter", name: "Cover Letter Generator", description: "AI cover letter generator. Create a tailored cover letter from your resume and the job description — professional tone, ready to send, free online.", category: "ai", icon: FileEdit, inputType: "text", cta: "Generate" },
  { slug: "summarizer", name: "Text Summarizer", description: "Free AI text summarizer. Condense long articles, PDFs and reports into clear bullet points or short paragraphs — save hours of reading in seconds.", category: "ai", icon: AlignLeft, inputType: "text", cta: "Summarize" },
  { slug: "grammar-fixer", name: "Grammar Fixer", description: "Free AI grammar checker and fixer. Correct grammar, spelling, punctuation and style instantly — write clearer, more professional English everywhere.", category: "ai", icon: SpellCheck, inputType: "text", cta: "Fix" },
  { slug: "translation", name: "Translation", description: "Free AI translator online. Translate text, paragraphs and documents into 100+ languages with natural, accurate results — instant, no signup needed.", category: "ai", icon: Languages, inputType: "text", cta: "Translate" },
  { slug: "social-caption", name: "Social Media Captions", description: "AI social media caption generator. Write engaging Instagram, TikTok, LinkedIn and Twitter captions with hashtags from a photo or topic — free, fast.", category: "ai", icon: MessageSquare, inputType: "text", cta: "Generate" },
  { slug: "ad-copy", name: "Ad Copy Generator", description: "AI ad copy generator. Write high-converting headlines and body text for Google, Facebook, Instagram and TikTok ads — multiple variations in seconds.", category: "ai", icon: Megaphone, inputType: "text", cta: "Generate" },

  // DEV
  { slug: "json-formatter", name: "JSON Formatter", description: "Free online JSON formatter and validator. Beautify, minify and lint JSON with syntax highlighting and error detection — perfect for APIs and configs.", category: "dev", icon: Braces, inputType: "text", workingTool: "json", popular: true },
  { slug: "xml-formatter", name: "XML Formatter", description: "Free online XML formatter and validator. Pretty-print XML documents with indentation, syntax highlighting and error detection — fast and lightweight.", category: "dev", icon: FileCode, inputType: "text" },
  { slug: "html-formatter", name: "HTML Formatter", description: "Free online HTML formatter and beautifier. Indent, clean and validate HTML markup with syntax highlighting — fast, accurate, no signup required.", category: "dev", icon: FileCode, inputType: "text" },
  { slug: "css-minifier", name: "CSS Minifier", description: "Free online CSS minifier. Compress and optimize stylesheets to reduce file size, strip comments and speed up your website — instant copy or download.", category: "dev", icon: FileCode2, inputType: "text", workingTool: "css-min" },
  { slug: "js-minifier", name: "JS Minifier", description: "Free online JavaScript minifier. Compress JS code to reduce file size, strip comments and speed up page load — perfect for production builds.", category: "dev", icon: FileCode2, inputType: "text", workingTool: "js-min" },
  { slug: "base64", name: "Base64 Encode/Decode", description: "Free Base64 encoder and decoder online. Convert text, files and images to Base64 or decode Base64 strings back to original — fast and secure.", category: "dev", icon: Hash, inputType: "text", workingTool: "base64", popular: true },
  { slug: "uuid-generator", name: "UUID Generator", description: "Free UUID generator online. Create random v4 UUIDs (GUIDs) one or many at a time for databases, APIs, sessions and unique identifiers — instant copy.", category: "dev", icon: Fingerprint, inputType: "none", workingTool: "uuid" },
  { slug: "regex-tester", name: "Regex Tester", description: "Free online regex tester and debugger. Test, build and visualize JavaScript regular expressions with live match highlighting and group capture details.", category: "dev", icon: Regex, inputType: "text" },
  { slug: "markdown-previewer", name: "Markdown Previewer", description: "Free online Markdown previewer. Write and render GitHub-flavored Markdown side by side — preview headings, code, tables and links instantly, no signup.", category: "dev", icon: Eye, inputType: "text", workingTool: "markdown" },
  { slug: "api-tester", name: "API Tester", description: "Free online API tester. Send GET, POST, PUT and DELETE requests to any REST API with custom headers, body and auth — Postman-style, in your browser.", category: "dev", icon: Globe, inputType: "text" },
  { slug: "color-converter", name: "Color Converter", description: "Free online color converter. Convert between HEX, RGB, HSL, HSV and CSS color names with live previews — perfect for designers and developers.", category: "dev", icon: Pipette, inputType: "text", workingTool: "color" },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Free Unix timestamp converter. Convert between Unix epoch time, ISO 8601 dates and human-readable timestamps in any timezone — instant and accurate.", category: "dev", icon: Clock, inputType: "text", workingTool: "timestamp" },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
export const toolsByCategory = (slug: CategorySlug) => tools.filter((t) => t.category === slug);
export const popularTools = () => tools.filter((t) => t.popular);