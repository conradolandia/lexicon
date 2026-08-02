# Lexicon

Versión web del *Lexicon abbreviaturarum* (diccionario Cappelli de abreviaturas latinas e italianas): búsqueda local sobre los datos descargables de [Ad fontes](https://www.adfontes.uzh.ch/en/).

Inspirado en el proyecto [Ad fontes](https://www.adfontes.uzh.ch/en/) de la Universidad de Zúrich.

## El Lexicon abbreviaturarum

El *Lexicon abbreviaturarum*, o diccionario de abreviaturas latinas e italianas, es un diccionario especializado compilado por Adriano Cappelli y publicado por primera vez en 1899 en la serie «Manuali Hoepli». Cappelli recopiló abreviaturas, siglas y acrónimos paleográficos y taquigráficos usados en textos, documentos y vestigios epigráficos en latín (época romana y medieval) y en italiano hasta principios de la Edad Moderna, indicando junto a cada abreviatura la grafía completa.

Hubo dos ediciones más revisadas por el autor (1912 y 1929). Tras su muerte el libro se reimprimió varias veces; en 2011 fue reelaborado y ampliado por Mario Geymonat y Fabio Troncarelli. En 1901 apareció una edición alemana (reimpresa en 1928); en 1964 se publicó póstumamente un suplemento en francés de Auguste Pelzer.

La sección introductoria sobre braquigrafía medieval se basa en un escrito de Cesare Paoli, con modificaciones criticadas por Enrico Rostagno. Las fechas asociadas a las abreviaturas se consideraron imprecisas, y la parte de abreviaturas epigráficas incompleta frente a otras obras. Ludwig Traube hizo una revisión severa del volumen. Aun así, el *Lexicon* sigue imprimiéndose y se usa como manual de referencia.

Fuente: [Lexicon abbreviaturarum](https://es.wikipedia.org/wiki/Lexicon_abbreviaturarum) (Wikipedia).

## Datos y Ad fontes

[Ad fontes](https://www.adfontes.uzh.ch/en/) es un programa de aprendizaje de la Universidad de Zúrich para quien trabaja con materiales históricos (estudiantes, aficionados y especialistas).

La base de datos descargable del Cappelli en Ad fontes **no es idéntica** a la que usa el sitio web de Ad fontes:

| Origen | Registros |
| --- | ---: |
| Excel descargable (2026-08-01) | 14 329 filas |
| Tras eliminar duplicados (ver abajo) | 14 327 |
| Sitio web de Ad fontes (reportado) | 14 685 |

En el Excel faltaban imágenes para los IDs `13055` y `9409`. Esas entradas son duplicados exactos de `13054` y `9408` respectivamente, y se eliminaron. La carpeta de imágenes suministrada incluye 453 archivos que no aparecen en el Excel pero sí se usan en el sitio de Ad fontes. Ad fontes indica que puede haber errores en estos conjuntos.

Este proyecto usa **solo** las filas del Excel y las imágenes cuyo ID coincide con ese archivo. A las imágenes originales se les aumentó el contraste y se ampliaron 4× con el modelo `upscayl-standard-4x`.

Datos descargados por última vez: **2026-08-01**.

Fuente de descarga: [Ad fontes — Cappelli: Downloadable Data](https://www.adfontes.uzh.ch/en/ressourcen/abkuerzungen/cappelli-daten-zum-download).

## Stack

- SvelteKit
- Tailwind CSS
- Flowbite Svelte (tema claro / oscuro)
- `@sveltejs/adapter-static` (salida estática en `build/`)

## Desarrollo

```bash
npm install
npm run dev
```

## Construcción

```bash
npm run build
npm run preview
```

## Datos en el repositorio

| Ruta | Contenido |
| --- | --- |
| `static/abbr.json` | Entradas del diccionario |
| `static/img_abbr/{id}.webp` | Imágenes de abreviaturas (ruta y extensión configurables en `src/lib/images.ts`) |
| `static/cat.json` | Traducciones de categorías (alemán → español) |

## Créditos

Realizado con la asistencia de Cursor IDE. Basado en un experimento de [ciceronianus](https://github.com/ciceronianus).
