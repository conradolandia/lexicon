import { t, ui } from './content';
import type { CategoryLabels } from './categories';
import type { Abbreviation } from './types';

export type DictionaryData = {
	abbreviations: Abbreviation[];
	categoryLabels: CategoryLabels;
};

export async function loadDictionary(): Promise<DictionaryData> {
	const [abbrResponse, catResponse] = await Promise.all([
		fetch('/abbr.json'),
		fetch('/cat.json')
	]);

	if (!abbrResponse.ok) {
		throw new Error(t(ui.loadDictionaryFailedStatus, { status: abbrResponse.status }));
	}
	if (!catResponse.ok) {
		throw new Error(t(ui.loadCategoriesFailedStatus, { status: catResponse.status }));
	}

	const abbreviations: Abbreviation[] = await abbrResponse.json();
	const categoryLabels: CategoryLabels = await catResponse.json();

	return { abbreviations, categoryLabels };
}
