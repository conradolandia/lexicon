# Diccionario Cappelli de abreviaturas latinas

Una pequeña aplicación web para buscar en el diccionario Cappelli de abreviaturas latinas.

Fuente de los datos: https://www.adfontes.uzh.ch/en/ressourcen/abkuerzungen/cappelli-daten-zum-download

Basado en el concepto [Capelli-ChatGPT](https://github.com/ciceronianus/Cappelli-ChatGPT) de [ciceronianus](https://github.com/ciceronianus)

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

Los datos del diccionario están en `static/abbreviations.json`. las imágenes de las abreviaturas en `static/img_abbr/`.
