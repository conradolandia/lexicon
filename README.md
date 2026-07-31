# Cappelli-ChatGPT

Web app for browsing Cappelli's dictionary of Latin abbreviations.

Data source: https://www.adfontes.uzh.ch/en/ressourcen/abkuerzungen/cappelli-daten-zum-download

## Stack

- SvelteKit
- Tailwind CSS
- Flowbite Svelte (including dark / light mode)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Uses `@sveltejs/adapter-static`. Output is written to `build/`.

Dictionary data lives in `static/abbreviations.json`. Abbreviation images live in `static/img_abbr/`.
