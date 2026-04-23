# ClearCut — AI Background Removal

A modern, privacy-first background removal tool that runs entirely in your browser. No server uploads. No accounts. Just open the page and start removing backgrounds.

![ClearCut](https://img.shields.io/badge/Built%20with-React%20%2B%20Vite-61dafb?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

- **100% local processing** — The AI model runs in-browser via WebAssembly
- **Privacy first** — Images never leave your device
- **Drag & drop upload** — PNG, JPG, WEBP, GIF (up to 10 MB)
- **Transparent PNG export** — Ready for Figma, Canva, Photoshop, or anywhere
- **No dependencies on external APIs** — Works offline after first model load
- **Responsive design** — Works on desktop and mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| AI / background removal | `@imgly/background-removal` (WASM/ONNX) |
| Icons | `lucide-react` |
| Deployment | Cloudflare Pages |

## Local Development

### Prerequisites

- Node.js 18+
- npm 8+

### Setup

```bash
# 1. Clone or unzip the project
cd clearcut

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** On first use, the AI model (~40 MB) is downloaded from the `@imgly` CDN and cached by the browser. Subsequent runs load from cache.

## Build for Production

```bash
npm run build
```

The production build is output to the `dist/` directory. You can preview it locally with:

```bash
npm run preview
```

## Deploying to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push the repository to GitHub or GitLab.
2. Log in to the [Cloudflare Pages dashboard](https://pages.cloudflare.com/).
3. Click **Create a project** → **Connect to Git**.
4. Select your repo and configure:

| Setting | Value |
|---|---|
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js version** | `18` (set via environment variable `NODE_VERSION=18`) |

5. Click **Save and Deploy**.

### Option B — Direct upload (wrangler)

```bash
# Install wrangler globally
npm install -g wrangler

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name clearcut
```

### Environment variables

This project has no secret environment variables — all AI processing is done client-side.

## Project Structure

```
clearcut/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── Hero.tsx            # Landing hero section
│   │   ├── UploadZone.tsx      # Drag-and-drop upload area
│   │   ├── ProcessingPanel.tsx # Main tool area (all states)
│   │   ├── ResultPanel.tsx     # Before/after comparison panel
│   │   ├── FeatureCards.tsx    # Feature highlight cards
│   │   ├── FAQ.tsx             # Accordion FAQ
│   │   └── Footer.tsx          # Page footer
│   ├── hooks/
│   │   └── useBackgroundRemoval.ts  # Core AI processing hook
│   ├── utils/
│   │   └── fileValidation.ts   # File type / size validation
│   ├── types/
│   │   └── index.ts            # Shared TypeScript types
│   ├── App.tsx                 # Root component + state management
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind + custom utilities
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## Notes & Gotchas

### First-run model load time
The `@imgly/background-removal` library downloads ~40 MB of ONNX model weights from their CDN the first time a user processes an image. This is cached by the browser, so subsequent runs are fast. A notice is shown in the UI before the user clicks "Remove Background".

### Vite optimizeDeps exclusion
Because `@imgly/background-removal` uses WASM, it must be excluded from Vite's dependency pre-bundling:

```ts
// vite.config.ts
optimizeDeps: {
  exclude: ['@imgly/background-removal'],
}
```

Without this, Vite may break the WASM module loading.

### Memory management
Object URLs for uploaded and result images are created via `URL.createObjectURL()` and revoked in `useEffect` cleanup functions to avoid memory leaks, especially when users upload multiple images in succession.

### Model quality
By default, `@imgly/background-removal` uses the `medium` quality model, which gives excellent results for most images. For faster processing at the cost of some edge quality, you can change the model in `useBackgroundRemoval.ts`:

```ts
const blob = await removeBackground(file, {
  model: 'small', // faster but lower quality
  // ...
});
```

## License

MIT
