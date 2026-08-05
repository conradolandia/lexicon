/** Public directory for abbreviation images (under `static/`). */
export const IMAGE_DIR = '/img_abbr';

/** Public directory for dictionary page images (under `static/`). */
export const PAGE_IMAGE_DIR = '/img_pages';

/** File extension for abbreviation and page images. */
export const IMAGE_EXT = 'webp';

/** Canonical width of dictionary page images (px). */
export const PAGE_IMAGE_WIDTH = 700;

export function abbreviationImageSrc(id: number): string {
	return `${IMAGE_DIR}/${id}.${IMAGE_EXT}`;
}

export function pageImageSrc(pageId: number): string {
	return `${PAGE_IMAGE_DIR}/${pageId}.${IMAGE_EXT}`;
}
