<script lang="ts">
	import { onMount } from 'svelte';
	import { Alert, Button, Spinner } from 'flowbite-svelte';
	import AbbreviationCard from '$lib/components/AbbreviationCard.svelte';
	import AdvancedSearch from '$lib/components/AdvancedSearch.svelte';
	import SearchField from '$lib/components/SearchField.svelte';
	import { sortCategoriesByLabel, translateCategory } from '$lib/categories';
	import type { CategoryLabels } from '$lib/categories';
	import { t, ui } from '$lib/content';
	import { loadDictionary } from '$lib/dictionary';
	import {
		defaultSearchFields,
		filterAbbreviations,
		uniqueCategories,
		uniqueLanguages,
		uniquePeriods
	} from '$lib/search';
	import type { SearchFields } from '$lib/search';
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

	let searchFields = $state<SearchFields>({ ...defaultSearchFields });
	let selectedCategories = $state<string[]>([]);
	let selectedPeriods = $state<string[]>([]);
	let selectedLanguages = $state<string[]>([]);

	const categoryOptions = $derived(
		sortCategoriesByLabel(uniqueCategories(abbreviations), categoryLabels).map((value) => ({
			value,
			label: translateCategory(value, categoryLabels) ?? value
		}))
	);
	const periodOptions = $derived(
		uniquePeriods(abbreviations).map((value) => ({ value, label: value }))
	);
	const languageOptions = $derived(
		uniqueLanguages(abbreviations).map((value) => ({
			value,
			label:
				value === 'latin'
					? ui.languageLatin
					: value === 'italian'
						? ui.languageItalian
						: value
		}))
	);

	const visibleResults = $derived(results.slice(0, visibleCount));
	const canLoadMore = $derived(visibleCount < results.length);

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
		results = filterAbbreviations(abbreviations, {
			term,
			fields: searchFields,
			categories: selectedCategories,
			periods: selectedPeriods,
			languages: selectedLanguages
		});
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
	<AdvancedSearch
		bind:fields={searchFields}
		bind:categories={selectedCategories}
		bind:periods={selectedPeriods}
		bind:languages={selectedLanguages}
		{categoryOptions}
		{periodOptions}
		{languageOptions}
	/>

	<SearchField bind:value={searchTerm} onsearch={onSearch} />

	{#if hasSearched}
		<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
			{#if results.length === 0}
				{ui.noMatches}
			{:else}
				{t(ui.resultsCount, {
					visible: visibleResults.length,
					total: results.length,
					resultsWord: results.length === 1 ? ui.resultSingular : ui.resultPlural
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
