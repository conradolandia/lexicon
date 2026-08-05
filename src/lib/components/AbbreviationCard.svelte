<script lang="ts">
	import { Card, Spinner } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import PagePreviewModal from '$lib/components/PagePreviewModal.svelte';
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
	let pageModalOpen = $state(false);

	$effect(() => {
		void img;
		loaded = false;
	});

	function onImageReady(node: HTMLImageElement) {
		if (node.complete) loaded = true;
	}

	function openPagePreview() {
		pageModalOpen = true;
	}
</script>

<Card class="max-w-none overflow-hidden p-0">
	<div class="relative flex h-24 w-full items-center justify-center rounded-t-lg bg-white">
		{#if !loaded}
			<Spinner size="6" class="absolute" />
		{/if}
		<button
			type="button"
			class="relative flex h-full w-full cursor-zoom-in items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
			aria-label={ui.pageModalOpen}
			onclick={openPagePreview}
		>
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
		</button>
	</div>
	<div class="p-4">
		<h5 class="mb-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{abbreviation.characters || ui.fallbackEmpty}
		</h5>
		<p class="mb-4 flex items-start gap-1.5 text-lg font-normal text-gray-600 dark:text-gray-400">
			<span>{abbreviation.transcription || ui.fallbackEmpty}</span>
			{#if abbreviation.unsure === 1}
				<span
					class="mt-1 inline-flex shrink-0 text-amber-600 dark:text-amber-400"
					title={ui.transcriptionUnsure}
					aria-label={ui.transcriptionUnsure}
				>
					<ExclamationCircleOutline class="h-5 w-5" />
				</span>
			{/if}
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

<PagePreviewModal bind:open={pageModalOpen} {abbreviation} />
