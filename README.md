# Markdown → PDF (React + TypeScript + Vite)

A fast, client‑side web app that converts Markdown to a styled PDF — no server required. Paste or write Markdown, preview the result instantly, then export a PDF directly in your browser.

## Features

- Live Markdown preview using markdown-it
- Syntax highlighting with highlight.js
- One‑click export to PDF powered by html2pdf.js (client‑only)
- Light/Dark theme support (next-themes)
- Accessible UI primitives (Radix UI) and Tailwind CSS styling
- Built with React + TypeScript + Vite for rapid development

## Tech stack

- React 18, TypeScript, Vite
- markdown-it, highlight.js, html2pdf.js
- Tailwind CSS, Radix UI, class-variance-authority, clsx
- next-themes, sonner

## Prerequisites

- Node.js 18+ (recommended)
- pnpm 9+ installed globally: `npm i -g pnpm`

## Quick start

- Install dependencies: `pnpm install`
- Start the dev server: `pnpm dev`
- Open the app at the URL printed in the terminal (usually http://localhost:5173)

## Usage

- Write or paste your Markdown into the editor
- See the formatted preview update in real time
- Click the Export/Download PDF button in the app to generate and save a PDF
- Optionally adjust any available options (e.g., page size) in the UI if provided

### Markdown callouts (notes/tips/warnings/errors)

This app supports GitHub-style callouts using blockquotes:

```
> [!NOTE] Optional title
> This is an informational note.
>
> [!TIP]
> Tips highlight best practices or shortcuts.
>
> [!WARNING] Be careful
> Warnings draw attention to potential pitfalls.
>
> [!ERROR]
> Errors indicate something went wrong.
```

Supported types: NOTE/INFO, TIP, WARNING/CAUTION, ERROR/DANGER, IMPORTANT (renders like info).

## Scripts

- dev: install deps (offline‑friendly) and start Vite
- build: type‑check and build for production
- build:prod: production build with BUILD_MODE=prod
- preview: preview the production build locally
- install-deps: install dependencies only
- clean: remove node_modules, store, and lockfile, then prune store

Run any script with pnpm, for example: `pnpm build`

## Build and deploy

- Production build: `pnpm build` (or `pnpm build:prod`)
- Output directory: `dist/`
- Host the contents of `dist/` on any static host (Vercel, Netlify, GitHub Pages, etc.)
- Test the build locally: `pnpm preview`

## Troubleshooting

- PDF blocked by popup blockers: allow downloads/popups for the site
- Unexpected page breaks: consider adjusting content or page settings; long code blocks may split across pages
- Fonts/appearance differ between screen and PDF: browser print rendering can vary; prefer web‑safe fonts
- Install issues: ensure Node 18+, run `pnpm install`; try `pnpm clean` then reinstall if needed

## Acknowledgements

- markdown-it — Markdown parsing
- highlight.js — Code syntax highlighting
- html2pdf.js — Client‑side PDF generation
- Radix UI, Tailwind CSS — UI and styling

## License

TBD