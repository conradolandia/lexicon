<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { imageSrc } from '$lib/search';
	import type { Abbreviation } from '$lib/types';

	let { abbreviation }: { abbreviation: Abbreviation } = $props();

	const img = $derived(imageSrc(abbreviation.image_url));
</script>

<Card
	img={img}
	imgClass="object-contain bg-gray-50 dark:bg-gray-900 max-h-28 w-full"
	class="max-w-none"
>
	<div class="p-4">
		<h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
			{abbreviation.characters || 'N/A'}
		</h5>
		<p class="mb-3 text-sm font-normal text-gray-600 dark:text-gray-400">
			{abbreviation.transcription || 'N/A'}
		</p>
		<dl class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
			<div>
				<dt class="inline font-medium">Categoría:</dt>
				<dd class="inline">{abbreviation.category || 'N/A'}</dd>
			</div>
			<div>
				<dt class="inline font-medium">Período:</dt>
				<dd class="inline">{abbreviation.period || 'N/A'}</dd>
			</div>
			<div>
				<dt class="inline font-medium">Idioma:</dt>
				<dd class="inline">{abbreviation.language || 'N/A'}</dd>
			</div>
		</dl>
	</div>
</Card>
