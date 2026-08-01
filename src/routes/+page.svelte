<script lang="ts">
	import { onMount } from 'svelte';
	import { Alert, Badge, Button, Search, Spinner } from 'flowbite-svelte';
	import AbbreviationCard from '$lib/components/AbbreviationCard.svelte';
	import { sortCategoriesByLabel, translateCategory } from '$lib/categories';
	import type { CategoryLabels } from '$lib/categories';
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
			const [abbrResponse, catResponse] = await Promise.all([
				fetch('/abbr.json'),
				fetch('/cat.json')
			]);
			if (!abbrResponse.ok) {
				throw new Error(`No se pudo cargar el diccionario (${abbrResponse.status})`);
			}
			if (!catResponse.ok) {
				throw new Error(`No se pudieron cargar las categorías (${catResponse.status})`);
			}
			abbreviations = await abbrResponse.json();
			categoryLabels = await catResponse.json();
		} catch (error) {
			loadError =
				error instanceof Error ? error.message : 'No se pudo cargar el diccionario';
		} finally {
			loading = false;
		}
	});

	function runSearch() {
		hasSearched = true;
		visibleCount = PAGE_SIZE;
		selectedCategory = null;
		results = filterAbbreviations(abbreviations, searchTerm);
	}

	function onSubmit(event: Event) {
		event.preventDefault();
		runSearch();
	}

	function loadMore() {
		visibleCount += PAGE_SIZE;
	}

	function selectCategory(category: string | null) {
		selectedCategory = category;
		visibleCount = PAGE_SIZE;
	}

	function categoryChipLabel(category: string): string {
		return translateCategory(category, categoryLabels) ?? category;
	}
</script>

<section class="mb-10">
	<p class="text-gray-600 dark:text-gray-400 text-2xl font-light">
		Busque abreviaturas latinas por caracteres o transcripción.
	</p>
</section>

{#if loading}
	<div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
		<Spinner size="6" />
		<span>Cargando diccionario…</span>
	</div>
{:else if loadError}
	<Alert color="red">{loadError}</Alert>
{:else}
	<form class="mb-6 flex flex-col gap-3 sm:flex-row" onsubmit={onSubmit}>
		<div class="grow">
			<Search
				bind:value={searchTerm}
				placeholder="Buscar una abreviatura…"
				size="md"
				clearable
				class="w-full"
			/>
		</div>
		<Button type="submit" class="shrink-0">Buscar</Button>
	</form>

	{#if hasSearched}
		{#if availableCategories.length > 0}
			<div class="mb-4">
				<p class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Categorías</p>
				<div class="flex flex-wrap gap-2">
					<Badge
						color={selectedCategory === null ? 'primary' : 'gray'}
						border={selectedCategory !== null}
						class="cursor-pointer pt-1 pb-2 px-3"
						onclick={() => selectCategory(null)}
					>
						Todas
					</Badge>
					{#each availableCategories as category (category)}
						<Badge
							color={selectedCategory === category ? 'primary' : 'gray'}
							border={selectedCategory !== category}
							class="cursor-pointer pt-1 pb-2 px-3"
							onclick={() => selectCategory(category)}
						>
							{categoryChipLabel(category)}
						</Badge>
					{/each}
				</div>
			</div>
		{/if}

		<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
			{#if results.length === 0}
				No se encontraron coincidencias.
			{:else if filteredResults.length === 0}
				No hay resultados en esta categoría.
			{:else}
				Mostrando {visibleResults.length} de {filteredResults.length}
				{filteredResults.length === 1 ? 'resultado' : 'resultados'}.
			{/if}
		</p>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each visibleResults as abbreviation (abbreviation.id)}
				<AbbreviationCard {abbreviation} {categoryLabels} />
			{/each}
		</div>

		{#if canLoadMore}
			<div class="mt-6 flex justify-center">
				<Button color="alternative" onclick={loadMore}>Cargar más</Button>
			</div>
		{/if}
	{/if}
{/if}
