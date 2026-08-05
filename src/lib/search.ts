import type { Abbreviation, PositionIndex } from './types';
import { positionValue } from './types';

export type SearchFields = {
	characters: boolean;
	transcription: boolean;
};

export type SearchCriteria = {
	term: string;
	fields: SearchFields;
	categories: string[];
	periods: string[];
	languages: string[];
	/** Grid cells 1–9 that must be present (AND). Empty = no position filter. */
	positions: PositionIndex[];
};

export const defaultSearchFields: SearchFields = {
	characters: true,
	transcription: true
};

export function hasActiveFilters(criteria: SearchCriteria): boolean {
	return (
		criteria.categories.length > 0 ||
		criteria.periods.length > 0 ||
		criteria.languages.length > 0 ||
		criteria.positions.length > 0
	);
}

function matchesTerm(abbr: Abbreviation, term: string, fields: SearchFields): boolean {
	const characters = typeof abbr.characters === 'string' ? abbr.characters.toLowerCase() : '';
	const transcription =
		typeof abbr.transcription === 'string' ? abbr.transcription.toLowerCase() : '';

	const checkCharacters = fields.characters;
	const checkTranscription = fields.transcription;

	// If neither is checked, fall back to both (same as default intent).
	const useCharacters = checkCharacters || !checkTranscription;
	const useTranscription = checkTranscription || !checkCharacters;

	if (useCharacters && characters.includes(term)) return true;
	if (useTranscription && transcription.includes(term)) return true;
	return false;
}

function matchesMulti(value: string | null, selected: string[]): boolean {
	if (selected.length === 0) return true;
	if (value == null || value === '') return false;
	return selected.includes(value);
}

function matchesPositions(abbr: Abbreviation, positions: PositionIndex[]): boolean {
	if (positions.length === 0) return true;
	return positions.every((index) => positionValue(abbr, index) === 1);
}

export function filterAbbreviations(
	abbreviations: Abbreviation[],
	criteria: SearchCriteria
): Abbreviation[] {
	const term = criteria.term.trim().toLowerCase();
	if (!term && !hasActiveFilters(criteria)) return [];

	return abbreviations.filter((abbr) => {
		if (term && !matchesTerm(abbr, term, criteria.fields)) return false;
		if (!matchesMulti(abbr.category, criteria.categories)) return false;
		if (!matchesMulti(abbr.period, criteria.periods)) return false;
		if (!matchesMulti(abbr.language, criteria.languages)) return false;
		if (!matchesPositions(abbr, criteria.positions)) return false;
		return true;
	});
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

export function uniquePeriods(abbreviations: Abbreviation[]): string[] {
	const periods = new Set<string>();
	for (const abbr of abbreviations) {
		if (typeof abbr.period === 'string' && abbr.period.length > 0) {
			periods.add(abbr.period);
		}
	}
	return [...periods].sort((a, b) => a.localeCompare(b, 'es'));
}

export function uniqueLanguages(abbreviations: Abbreviation[]): string[] {
	const languages = new Set<string>();
	for (const abbr of abbreviations) {
		if (typeof abbr.language === 'string' && abbr.language.length > 0) {
			languages.add(abbr.language);
		}
	}
	return [...languages].sort((a, b) => a.localeCompare(b, 'es'));
}
