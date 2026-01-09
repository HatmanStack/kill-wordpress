<img align="center" src="wordpress.webp" alt="WordPress Security Tracker">

<p align="center">
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" /></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6" alt="TypeScript 5.9" /></a>
<a href="https://svelte.dev"><img src="https://img.shields.io/badge/Svelte-5-FF3E00" alt="Svelte 5" /></a>
</p>

<p align="center">
<a href="https://kit.svelte.dev"><img src="https://img.shields.io/badge/SvelteKit-2-FF3E00" alt="SvelteKit 2" /></a>
<a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-7-646CFF" alt="Vite 7" /></a>
<a href="https://aws.amazon.com/amplify/"><img src="https://img.shields.io/badge/AWS-Amplify-FF9900" alt="AWS Amplify" /></a>
</p>

<p align="center">
<a href="https://tracker.hatstack.fun"><strong>tracker.hatstack.fun</strong></a>
</p>

Tracks WordPress vulnerability counts from the Wordfence Intelligence API. Static site, auto-updates daily.

## Commands

```bash
npm run dev          # Local dev server
npm run scrape       # Fetch fresh vulnerability data
npm run build        # Build static site
npm run build:fresh  # Scrape + build
npm run preview      # Preview production build
```

## Deploy to Amplify

1. Push to GitHub
2. Connect repo in Amplify Console
3. Build settings:
   - Build command: `npm run build:fresh`
   - Output directory: `build`

GitHub Action runs daily at 6am UTC to refresh data and trigger rebuild.

## Data Source

Wordfence Intelligence API (free, no auth required):
https://www.wordfence.com/threat-intel/

## Structure

```
scripts/scrape.ts        # Fetches and processes vulnerability data
src/lib/data/stats.json  # Generated data (committed, auto-updated)
src/routes/+page.svelte  # Tracker dashboard
src/routes/why/          # Blog post
```
