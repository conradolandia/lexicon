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

export function uniqueCategories(abbreviations: Abbreviation[]): string[] {
	const categories = new Set<string>();
	for (const abbr of abbreviations) {
		if (typeof abbr.category === 'string' && abbr.category.length > 0) {
			categories.add(abbr.category);
		}
	}
	return [...categories];
}

export function filterByCategory(
	abbreviations: Abbreviation[],
	category: string | null
): Abbreviation[] {
	if (!category) return abbreviations;
	return abbreviations.filter((abbr) => abbr.category === category);
}
