export type Abbreviation = {
	id: number;
	page_id: number;
	characters: string | null;
	transcription: string | null;
	category: string | null;
	period: string | null;
	language: string | null;
	/** @deprecated Ignored; image path is derived from `id` via `$lib/images`. */
	image_url?: string | null;
};
