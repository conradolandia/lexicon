<script lang="ts">
	import { Card, Spinner } from 'flowbite-svelte';
	import { translateCategory } from '$lib/categories';
	import { ui } from '$lib/content';
	import { abbreviationImageSrc } from '$lib/images';
	import type { CategoryLabels } from '$lib/categories';
	import type { Abbreviation } from '$lib/types';

	let {
		abbreviation,
		categoryLabels
	}: {
		abbreviation: Abbreviation;
		categoryLabels: CategoryLabels;
	} = $props();

	const img = $derived(abbreviationImageSrc(abbreviation.id));
	const categoryLabel = $derived(
		translateCategory(abbreviation.category, categoryLabels) ?? ui.fallbackEmpty
	);

	let loaded = $state(false);

	$effect(() => {
		void img;
		loaded = false;
	});

	function onImageReady(node: HTMLImageElement) {
		if (node.complete) loaded = true;
	}
</script>

<Card class="max-w-none overflow-hidden p-0">
	<div class="relative flex h-24 w-full items-center justify-center rounded-t-lg bg-white">
		{#if !loaded}
			<Spinner size="6" class="absolute" />
		{/if}
		<img
			src={img}
			alt=""
			loading="lazy"
			class="max-h-24 w-full object-contain transition-opacity {loaded
				? 'opacity-100'
				: 'opacity-0'}"
			onload={() => (loaded = true)}
			onerror={() => (loaded = true)}
			{@attach onImageReady}
		/>
	</div>
	<div class="p-4">
		<h5 class="mb-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{abbreviation.characters || ui.fallbackEmpty}
		</h5>
		<p class="mb-4 text-lg font-normal text-gray-600 dark:text-gray-400">
			{abbreviation.transcription || ui.fallbackEmpty}
		</p>
		<dl class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
			<div>
				<dt class="inline font-medium">{ui.cardCategory}</dt>
				<dd class="inline">{categoryLabel}</dd>
			</div>
			<div>
				<dt class="inline font-medium">{ui.cardPeriod}</dt>
				<dd class="inline">{abbreviation.period || ui.fallbackEmpty}</dd>
			</div>
			<div>
				<dt class="inline font-medium">{ui.cardLanguage}</dt>
				<dd class="inline">{abbreviation.language || ui.fallbackEmpty}</dd>
			</div>
		</dl>
	</div>
</Card>
