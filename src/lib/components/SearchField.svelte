<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Button, Search } from 'flowbite-svelte';
	import { ClockOutline, CloseOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { t, ui } from '$lib/content';
	import {
		clearSearchHistory,
		loadSearchHistory,
		pushSearchHistory,
		removeSearchHistoryItem
	} from '$lib/searchHistory';

	let {
		value = $bindable(''),
		onsearch
	}: {
		value?: string;
		onsearch: (term: string) => void;
	} = $props();

	let searchHistory = $state<string[]>([]);
	let searchFocused = $state(false);
	let searchInput = $state<HTMLInputElement | undefined>(undefined);
	let activeIndex = $state(-1);
	let blurCloseTimer: ReturnType<typeof setTimeout> | undefined;

	const showHistory = $derived(
		searchFocused && searchHistory.length > 0 && !(value ?? '').trim()
	);
	// History terms + "clear history" action
	const menuItemCount = $derived(searchHistory.length + 1);
	const activeOptionId = $derived(
		showHistory && activeIndex >= 0 ? `search-history-option-${activeIndex}` : undefined
	);

	onMount(async () => {
		searchHistory = loadSearchHistory();
		await tick();
		searchInput?.focus();
		searchFocused = true;
	});

	$effect(() => {
		if (!showHistory) activeIndex = -1;
	});

	function submitSearch(term: string = value) {
		const next = (term ?? '').trim();
		value = next;
		searchHistory = pushSearchHistory(next, searchHistory);
		onsearch(next);
		activeIndex = -1;
	}

	function onSubmit(event: Event) {
		event.preventDefault();
		if (showHistory && activeIndex >= 0) {
			activateMenuItem(activeIndex);
			return;
		}
		submitSearch();
	}

	function onSearchFocus() {
		if (blurCloseTimer) clearTimeout(blurCloseTimer);
		searchFocused = true;
	}

	function onSearchBlur() {
		blurCloseTimer = setTimeout(() => {
			searchFocused = false;
			activeIndex = -1;
		}, 150);
	}

	function focusSearchInput() {
		requestAnimationFrame(() => {
			searchInput?.focus();
			searchFocused = true;
		});
	}

	function selectHistoryTerm(term: string) {
		if (blurCloseTimer) clearTimeout(blurCloseTimer);
		searchFocused = true;
		submitSearch(term);
	}

	function removeHistoryTerm(event: MouseEvent, term: string) {
		event.preventDefault();
		event.stopPropagation();
		searchHistory = removeSearchHistoryItem(term, searchHistory);
		activeIndex = -1;
		focusSearchInput();
	}

	function clearHistory() {
		searchHistory = clearSearchHistory();
		activeIndex = -1;
		focusSearchInput();
	}

	function onClearSearch() {
		value = '';
		activeIndex = -1;
		focusSearchInput();
	}

	function activateMenuItem(index: number) {
		if (index < 0 || index >= menuItemCount) return;
		if (index < searchHistory.length) {
			selectHistoryTerm(searchHistory[index]);
			return;
		}
		clearHistory();
	}

	function onSearchKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			activeIndex = -1;
			searchFocused = false;
			searchInput?.blur();
			return;
		}

		if (!showHistory) return;

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			activeIndex = activeIndex < menuItemCount - 1 ? activeIndex + 1 : 0;
			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			activeIndex = activeIndex <= 0 ? menuItemCount - 1 : activeIndex - 1;
			return;
		}

		if (event.key === 'Enter' && activeIndex >= 0) {
			event.preventDefault();
			activateMenuItem(activeIndex);
		}
	}

	function optionClass(index: number): string {
		const base =
			'flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-2 text-left';
		return activeIndex === index
			? `${base} bg-gray-100 dark:bg-gray-700`
			: `${base} hover:bg-gray-100 dark:hover:bg-gray-700`;
	}

	function clearOptionClass(): string {
		const base =
			'flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-gray-500 dark:text-gray-400';
		const index = searchHistory.length;
		return activeIndex === index
			? `${base} bg-gray-100 dark:bg-gray-700`
			: `${base} hover:bg-gray-100 dark:hover:bg-gray-700`;
	}
</script>

<form class="mb-6 flex flex-col gap-3 sm:flex-row" onsubmit={onSubmit}>
	<div class="relative grow">
		<Search
			bind:value
			bind:elementRef={searchInput}
			placeholder={ui.searchPlaceholder}
			size="md"
			clearable
			clearableOnClick={onClearSearch}
			class="w-full"
			autocomplete="off"
			role="combobox"
			aria-expanded={showHistory}
			aria-controls="search-history-listbox"
			aria-autocomplete="list"
			aria-activedescendant={activeOptionId}
			onfocus={onSearchFocus}
			onblur={onSearchBlur}
			onkeydown={onSearchKeydown}
		/>

		{#if showHistory}
			<div
				id="search-history-listbox"
				role="listbox"
				tabindex="-1"
				aria-label={ui.searchHistoryLabel}
				class="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-600 dark:bg-gray-800"
				onmousedown={(event) => event.preventDefault()}
			>
				<p
					class="px-3 pt-2 pb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
				>
					{ui.searchHistoryLabel}
				</p>
				<ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
					{#each searchHistory as term, index (term)}
						<li class="flex items-center gap-1 px-2">
							<button
								id="search-history-option-{index}"
								type="button"
								role="option"
								tabindex="-1"
								aria-selected={activeIndex === index}
								class={optionClass(index)}
								onmouseenter={() => (activeIndex = index)}
								onclick={() => selectHistoryTerm(term)}
							>
								<ClockOutline class="h-4 w-4 shrink-0 text-gray-400" />
								<span class="truncate">{term}</span>
							</button>
							<button
								type="button"
								tabindex="-1"
								class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
								aria-label={t(ui.searchHistoryRemove, { term })}
								onclick={(event) => removeHistoryTerm(event, term)}
							>
								<CloseOutline class="h-3.5 w-3.5" />
							</button>
						</li>
					{/each}
					<li class="border-t border-gray-200 px-2 pt-1 dark:border-gray-600">
						<button
							id="search-history-option-{searchHistory.length}"
							type="button"
							role="option"
							tabindex="-1"
							aria-selected={activeIndex === searchHistory.length}
							class={clearOptionClass()}
							onmouseenter={() => (activeIndex = searchHistory.length)}
							onclick={clearHistory}
						>
							<TrashBinOutline class="h-4 w-4" />
							{ui.searchHistoryClear}
						</button>
					</li>
				</ul>
			</div>
		{/if}
	</div>
	<Button type="submit" class="shrink-0">{ui.searchButton}</Button>
</form>
