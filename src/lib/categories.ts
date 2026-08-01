export type CategoryLabels = Record<string, string>;

export function translateCategory(
	category: string | null,
	labels: CategoryLabels
): string | null {
	if (category == null || category === '') return null;
	return labels[category] ?? category;
}

export function sortCategoriesByLabel(
	categories: string[],
	labels: CategoryLabels
): string[] {
	return [...categories].sort((a, b) =>
		(labels[a] ?? a).localeCompare(labels[b] ?? b, 'es')
	);
}
