const STORAGE_KEY = 'cappelli-search-history';
export const SEARCH_HISTORY_MAX = 10;

function canUseStorage(): boolean {
	return typeof localStorage !== 'undefined';
}

export function loadSearchHistory(): string[] {
	if (!canUseStorage()) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((item): item is string => typeof item === 'string')
			.map((item) => item.trim())
			.filter((item) => item.length > 0)
			.slice(0, SEARCH_HISTORY_MAX);
	} catch {
		return [];
	}
}

function saveSearchHistory(history: string[]): string[] {
	const next = history.slice(0, SEARCH_HISTORY_MAX);
	if (canUseStorage()) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		} catch {
			// Quota or privacy mode: keep in-memory result only.
		}
	}
	return next;
}

export function pushSearchHistory(term: string, current: string[] = loadSearchHistory()): string[] {
	const normalized = term.trim();
	if (!normalized) return current;

	const withoutDupes = current.filter(
		(item) => item.toLowerCase() !== normalized.toLowerCase()
	);
	return saveSearchHistory([normalized, ...withoutDupes]);
}

export function removeSearchHistoryItem(
	term: string,
	current: string[] = loadSearchHistory()
): string[] {
	const next = current.filter((item) => item.toLowerCase() !== term.toLowerCase());
	return saveSearchHistory(next);
}

export function clearSearchHistory(): string[] {
	return saveSearchHistory([]);
}
