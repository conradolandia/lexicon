/** Public directory for abbreviation images (under `static/`). */
export const IMAGE_DIR = '/img_abbr';

/** File extension for abbreviation images. */
export const IMAGE_EXT = 'webp';

export function abbreviationImageSrc(id: number): string {
	return `${IMAGE_DIR}/${id}.${IMAGE_EXT}`;
}
