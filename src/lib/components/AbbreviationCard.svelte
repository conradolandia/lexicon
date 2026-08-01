<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { translateCategory } from '$lib/categories';
	import { imageSrc } from '$lib/search';
	import type { CategoryLabels } from '$lib/categories';
	import type { Abbreviation } from '$lib/types';

	let {
		abbreviation,
		categoryLabels
	}: {
		abbreviation: Abbreviation;
		categoryLabels: CategoryLabels;
	} = $props();

	const img = $derived(imageSrc(abbreviation.image_url));
	const categoryLabel = $derived(
		translateCategory(abbreviation.category, categoryLabels) ?? 'N/D'
	);
</script>

<Card
	img={img}
	imgClass="object-contain bg-white max-h-24 w-full"
	class="max-w-none"
>
	<div class="p-4">
		<h5 class="mb-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{abbreviation.characters || 'N/D'}
		</h5>
		<p class="mb-4 text-lg font-normal text-gray-600 dark:text-gray-400">
			{abbreviation.transcription || 'N/D'}
		</p>
		<dl class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
			<div>
				<dt class="inline font-medium">Categoría:</dt>
				<dd class="inline">{categoryLabel}</dd>
			</div>
			<div>
				<dt class="inline font-medium">Período:</dt>
				<dd class="inline">{abbreviation.period || 'N/D'}</dd>
			</div>
			<div>
				<dt class="inline font-medium">Idioma:</dt>
				<dd class="inline">{abbreviation.language || 'N/D'}</dd>
			</div>
		</dl>
	</div>
</Card>
