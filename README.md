# OmniTools Hub

Create a modern SaaS website called “OmniTools” — an all-in-one online tool hub for image tools, PDF tools, file converters, AI writing tools, vector/design tools, and developer utilities.

The website should feel premium, fast, clean, and professional, similar to TinyWow, Canva tools, Adobe Express utilities, Remove.bg, Convertio, and iLovePDF.

Build the full frontend structure with responsive design, clean UI, and tool pages prepared for future backend/API integration.

Main goal:

Users can browse categories, search for tools, open individual tool pages, upload files where relevant, see tool-specific controls, and download/export results later once backend logic is connected.

Use a modern design:

- Clean SaaS layout

- Light background

- Soft gradients

- Rounded cards

- Professional icons

- Smooth hover effects

- Large hero section

- Strong CTA buttons

- Mobile responsive

- SEO-friendly pages

- Fast navigation

- Category filtering

- Search bar for tools

Website pages:

1. Home page

2. All Tools page

3. Category pages

4. Individual tool pages

5. Pricing page

6. Login / Sign up pages

7. Dashboard page

8. Contact page

9. Privacy Policy

10. Terms & Conditions

Home page sections:

- Hero: “Every tool you need, in one place.”

- Subtitle: “Edit images, convert files, work with PDFs, generate content, and use developer utilities instantly from your browser.”

- Search bar: “Search for a tool…”

- Popular tools grid

- Tool categories section

- How it works section

- Benefits section

- Pricing CTA

- FAQ

- Footer

Main categories and tools:

IMAGE TOOLS

- Background remover

- Image enhancer / upscaler

- Image compressor

- Image resizer

- Crop image

- Convert image format: PNG, JPG, WEBP, SVG, AVIF

- Blur face / object

- Remove object from image

- Colorize black & white photo

- Restore old photo

- AI image generator

- Image to text OCR

- Image to PDF

- Image watermark remover

- Add watermark

- Meme generator

- Passport photo maker

- Profile picture maker

VECTOR / DESIGN TOOLS

- PNG to SVG

- JPG to SVG

- Vectorizer

- SVG editor

- Icon generator

- Logo generator

- Favicon generator

- Color palette extractor

- Gradient generator

- QR code generator

- Barcode generator

PDF TOOLS

- PDF to Word

- Word to PDF

- PDF to JPG

- JPG to PDF

- Merge PDF

- Split PDF

- Compress PDF

- Sign PDF

- Remove pages

- Extract pages

- Protect PDF

- Unlock PDF

- OCR PDF

FILE CONVERTERS

- DOCX to PDF

- PDF to DOCX

- PPTX to PDF

- PDF to PPTX

- XLSX to CSV

- CSV to XLSX

- CSV to JSON

- JSON to CSV

- HTML to PDF

- PDF to HTML

- MP4 to MP3

- MOV to MP4

- ZIP files

- Unzip files

AI WRITING TOOLS

- Email writer

- Blog writer

- Product description generator

- Resume builder

- Cover letter generator

- Text summarizer

- Grammar fixer

- Translation

- Social media caption generator

- Ad copy generator

DEVELOPER TOOLS

- JSON formatter

- XML formatter

- HTML formatter

- CSS minifier

- JS minifier

- Base64 encode/decode

- UUID generator

- Regex tester

- Markdown previewer

- API tester

- Color converter

- Timestamp converter

Tool page template:

Each tool page should include:

- Tool title

- Short description

- Upload area or text input area depending on the tool

- Drag and drop file upload box for file/image/PDF tools

- Settings panel for tool options

- Preview/result area

- Primary CTA button such as “Process File”, “Generate”, “Convert”, or “Format”

- Download/export button placeholder

- Related tools

- How it works section

- FAQ section

- SEO text section

Important:

For now, create frontend/demo functionality only where backend is required. Use placeholders and mock processing states for advanced tools such as background remover, AI image generator, PDF conversion, video conversion, OCR, and watermark remover.

For simple developer tools, add working frontend functionality where possible:

- JSON formatter

- Base64 encode/decode

- UUID generator

- Timestamp converter

- Color converter

- Markdown previewer

- CSS minifier

- JS minifier

Navigation:

Top navbar:

- Logo: OmniTools

- All Tools

- Image Tools

- PDF Tools

- AI Tools

- Developer Tools

- Pricing

- Sign in

- Get Started

Footer:

- Tool categories

- Popular tools

- Company links

- Legal links

- Social links

Dashboard:

Create a simple dashboard where users can see:

- Recent files

- Recently used tools

- Usage limits

- Upgrade button

- Saved projects placeholder

Pricing:

Create three pricing plans:

1. Free

   - Limited daily usage

   - Basic tools

   - Small file size

2. Pro

   - Unlimited basic tools

   - Larger files

   - Batch processing

   - AI tools

   - No watermark

3. Business

   - Team access

   - Priority processing

   - API access placeholder

   - Higher limits

Technical requirements:

- Use React + TypeScript

- Use Tailwind CSS

- Use shadcn/ui components

- Use Lucide icons

- Create clean reusable components

- Use a data-driven tools array so tools can easily be added later

- Use routes for every tool page

- Make the site fully responsive

- Add search/filter logic for tools

- Add empty states and loading states

- Add mock upload and mock conversion flow

- Prepare the code so Supabase auth, storage, Stripe, and backend APIs can be connected later

Design style:

Use a premium tech/startup look:

- White and light gray background

- Accent color: blue/purple gradient

- Rounded 2xl cards

- Soft shadows

- Clean typography

- Spacious layout

- Icons for every category

- Smooth transitions

Create the complete website frontend now.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://foqustools.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a3cae2d5-43c3-4d1f-8dcf-2bf6986312aa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
