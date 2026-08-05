// place files you want to import through the `$lib` alias in this folder.
export type { Abbreviation, PositionIndex } from './types';
export { positionValue } from './types';
export type { CategoryLabels } from './categories';
export {
	sortCategoriesByLabel,
	translateCategory
} from './categories';
export {
	filterAbbreviations,
	hasActiveFilters,
	uniqueCategories,
	uniqueLanguages,
	uniquePeriods
} from './search';
export type { SearchCriteria, SearchFields } from './search';
export { defaultSearchFields } from './search';
export {
	abbreviationImageSrc,
	pageImageSrc,
	IMAGE_DIR,
	IMAGE_EXT,
	PAGE_IMAGE_DIR,
	PAGE_IMAGE_WIDTH
} from './images';
export {
	clearSearchHistory,
	loadSearchHistory,
	pushSearchHistory,
	removeSearchHistoryItem,
	SEARCH_HISTORY_MAX
} from './searchHistory';
export { loadDictionary } from './dictionary';
export type { DictionaryData } from './dictionary';
export { about, content, inlineMarkdown, locale, stripMarkdown, t, ui } from './content';
export type { AboutContent, Content, Locale, UiStrings } from './content';
