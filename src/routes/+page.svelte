<script lang="ts">
	import { onMount } from 'svelte';
	import { Alert, Button, Search, Spinner } from 'flowbite-svelte';
	import AbbreviationCard from '$lib/components/AbbreviationCard.svelte';
	import { filterAbbreviations } from '$lib/search';
	import type { Abbreviation } from '$lib/types';

	const PAGE_SIZE = 24;

	let abbreviations = $state<Abbreviation[]>([]);
	let loadError = $state<string | null>(null);
	let loading = $state(true);
	let searchTerm = $state('');
	let results = $state<Abbreviation[]>([]);
	let hasSearched = $state(false);
	let visibleCount = $state(PAGE_SIZE);

	const visibleResults = $derived(results.slice(0, visibleCount));
	const canLoadMore = $derived(visibleCount < results.length);

	onMount(async () => {
		try {
			const response = await fetch('/abbreviations.json');
			if (!response.ok) {
				throw new Error(`Failed to load dictionary data (${response.status})`);
			}
			abbreviations = await response.json();
		} catch (error) {
			loadError = error instanceof Error ? error.message : 'Failed to load dictionary data';
		} finally {
			loading = false;
		}
	});

	function runSearch() {
		hasSearched = true;
		visibleCount = PAGE_SIZE;
		results = filterAbbreviations(abbreviations, searchTerm);
	}

	function onSubmit(event: Event) {
		event.preventDefault();
		runSearch();
	}

	function loadMore() {
		visibleCount += PAGE_SIZE;
	}
</script>

<section class="mb-8">
	<p class="text-gray-600 dark:text-gray-400">
		Busca abreviaturas latinas por caracteres o transcripción.
	</p>
</section>

{#if loading}
	<div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
		<Spinner size="6" />
		<span>Loading dictionary…</span>
	</div>
{:else if loadError}
	<Alert color="red">{loadError}</Alert>
{:else}
	<form class="mb-6 flex flex-col gap-3 sm:flex-row" onsubmit={onSubmit}>
		<div class="grow">
			<Search
				bind:value={searchTerm}
				placeholder="Search for an abbreviation…"
				size="md"
				clearable
				class="w-full"
			/>
		</div>
		<Button type="submit" class="shrink-0">Search</Button>
	</form>

	{#if hasSearched}
		<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
			{results.length === 0
				? 'No matches found.'
				: `Showing ${visibleResults.length} of ${results.length} match${results.length === 1 ? '' : 'es'}.`}
		</p>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each visibleResults as abbreviation (abbreviation.id)}
				<AbbreviationCard {abbreviation} />
			{/each}
		</div>

		{#if canLoadMore}
			<div class="mt-6 flex justify-center">
				<Button color="alternative" onclick={loadMore}>Load more</Button>
			</div>
		{/if}
	{/if}
{/if}
