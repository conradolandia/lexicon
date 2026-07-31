import type { Abbreviation } from './types';

export function filterAbbreviations(
	abbreviations: Abbreviation[],
	searchTerm: string
): Abbreviation[] {
	const term = searchTerm.trim().toLowerCase();
	if (!term) return [];

	return abbreviations.filter((abbr) => {
		const characters = typeof abbr.characters === 'string' ? abbr.characters.toLowerCase() : '';
		const transcription =
			typeof abbr.transcription === 'string' ? abbr.transcription.toLowerCase() : '';
		return characters.includes(term) || transcription.includes(term);
	});
}

export function imageSrc(imageUrl: string | null): string | undefined {
	if (!imageUrl) return undefined;
	return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
}
