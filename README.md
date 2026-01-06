# WordPress Security Tracker

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
