// place files you want to import through the `$lib` alias in this folder.
export type { Abbreviation } from './types';
export type { CategoryLabels } from './categories';
export {
	sortCategoriesByLabel,
	translateCategory
} from './categories';
export {
	filterAbbreviations,
	filterByCategory,
	uniqueCategories
} from './search';
export { abbreviationImageSrc, IMAGE_DIR, IMAGE_EXT } from './images';
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
