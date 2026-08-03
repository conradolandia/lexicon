<script lang="ts">
	import { onMount } from 'svelte';
	import { Alert, Button, Spinner } from 'flowbite-svelte';
	import AbbreviationCard from '$lib/components/AbbreviationCard.svelte';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import SearchField from '$lib/components/SearchField.svelte';
	import { sortCategoriesByLabel } from '$lib/categories';
	import type { CategoryLabels } from '$lib/categories';
	import { t, ui } from '$lib/content';
	import { loadDictionary } from '$lib/dictionary';
	import { filterAbbreviations, filterByCategory, uniqueCategories } from '$lib/search';
	import type { Abbreviation } from '$lib/types';

	const PAGE_SIZE = 24;

	let abbreviations = $state<Abbreviation[]>([]);
	let categoryLabels = $state<CategoryLabels>({});
	let loadError = $state<string | null>(null);
	let loading = $state(true);
	let searchTerm = $state('');
	let results = $state<Abbreviation[]>([]);
	let hasSearched = $state(false);
	let visibleCount = $state(PAGE_SIZE);
	let selectedCategory = $state<string | null>(null);

	const availableCategories = $derived(
		sortCategoriesByLabel(uniqueCategories(results), categoryLabels)
	);
	const filteredResults = $derived(filterByCategory(results, selectedCategory));
	const visibleResults = $derived(filteredResults.slice(0, visibleCount));
	const canLoadMore = $derived(visibleCount < filteredResults.length);

	onMount(async () => {
		try {
			const data = await loadDictionary();
			abbreviations = data.abbreviations;
			categoryLabels = data.categoryLabels;
		} catch (error) {
			loadError = error instanceof Error ? error.message : ui.loadDictionaryFailed;
		} finally {
			loading = false;
		}
	});

	function onSearch(term: string) {
		searchTerm = term;
		hasSearched = true;
		visibleCount = PAGE_SIZE;
		selectedCategory = null;
		results = filterAbbreviations(abbreviations, term);
	}

	function onCategoryChange(_category: string | null) {
		visibleCount = PAGE_SIZE;
	}

	function loadMore() {
		visibleCount += PAGE_SIZE;
	}
</script>

<section class="mb-10">
	<p class="text-xl font-light text-gray-600 dark:text-gray-400">
		{ui.homeTagline}
	</p>
</section>

{#if loading}
	<div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
		<Spinner size="6" />
		<span>{ui.loadingDictionary}</span>
	</div>
{:else if loadError}
	<Alert color="red">{loadError}</Alert>
{:else}
	<SearchField bind:value={searchTerm} onsearch={onSearch} />

	{#if hasSearched}
		<CategoryFilter
			categories={availableCategories}
			labels={categoryLabels}
			bind:selected={selectedCategory}
			onchange={onCategoryChange}
		/>

		<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
			{#if results.length === 0}
				{ui.noMatches}
			{:else if filteredResults.length === 0}
				{ui.noMatchesInCategory}
			{:else}
				{t(ui.resultsCount, {
					visible: visibleResults.length,
					total: filteredResults.length,
					resultsWord:
						filteredResults.length === 1 ? ui.resultSingular : ui.resultPlural
				})}
			{/if}
		</p>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each visibleResults as abbreviation (abbreviation.id)}
				<AbbreviationCard {abbreviation} {categoryLabels} />
			{/each}
		</div>

		{#if canLoadMore}
			<div class="mt-6 flex justify-center">
				<Button color="alternative" onclick={loadMore}>{ui.loadMore}</Button>
			</div>
		{/if}
	{/if}
{/if}
