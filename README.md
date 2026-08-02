# Capelino: diccionario Cappelli de abreviaturas latinas, versión web

Una pequeña aplicación web para buscar en el diccionario Cappelli de abreviaturas latinas. 

Inspirado en el proyecto [AdFontes](https://www.adfontes.uzh.ch/en/)

## Stack

- SvelteKit
- Tailwind CSS
- Flowbite Svelte (modo oscuro / claro)

## Desarrollo

```bash
npm install
npm run dev
```

## Construir

```bash
npm run build
npm run preview
```

Usa `@sveltejs/adapter-static`. El proyecto se escribe en `build/`.

- Los datos del diccionario están en `static/abbr.json`. 
- Las imágenes están en `static/img_abbr/{id}.webp` (ruta y extensión configurables en `src/lib/images.ts`). 
- Las traducciones de categorías (alemán → español) están en `static/cat.json`.

Fuente de los datos: [AdFontes - Capelli: Downloadable Data](https://www.adfontes.uzh.ch/en/ressourcen/abkuerzungen/cappelli-daten-zum-download).

----

Realizado con la asistencia de Cursor IDE.
