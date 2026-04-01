# Magic Layout Lab

Magic Layout Lab is a React + Tailwind web app inspired by Canva Magic Design.
It turns a text prompt into three polished layout directions, lets you drag and resize every element, supports image placeholder replacement, autosaves locally, and exports clean PNGs in the browser.

## Features

- Prompt-based design generation
- Three distinct visual variations per prompt
- Grid-based layout engine
- Drag-and-drop positioning with snap-to-grid behavior
- Resize handles on canvas elements
- Image placeholder upload and file drop
- Inspector controls for text, alignment, corner radius, and opacity
- PNG export with no backend
- Local autosave in the browser

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- html-to-image
- lucide-react

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## GitHub Pages

This repo includes `.github/workflows/deploy-pages.yml`.
Once the project is pushed to a GitHub repository, pushes to `main` will build the app and deploy `dist/` to GitHub Pages.

Expected Pages URL format:

```text
https://<github-username>.github.io/<repo-name>/
```
