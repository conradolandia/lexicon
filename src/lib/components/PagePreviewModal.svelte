<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { ui } from '$lib/content';
	import { pageImageSrc, PAGE_IMAGE_WIDTH } from '$lib/images';
	import type { Abbreviation } from '$lib/types';

	let {
		open = $bindable(false),
		abbreviation
	}: {
		open?: boolean;
		abbreviation: Abbreviation | null;
	} = $props();

	let naturalHeight = $state(0);

	const pageSrc = $derived(
		abbreviation ? pageImageSrc(abbreviation.page_id) : ''
	);
	const showHighlight = $derived(
		!!abbreviation && abbreviation.width > 0 && abbreviation.height > 0
	);

	const highlightStyle = $derived.by(() => {
		if (!abbreviation || !showHighlight || naturalHeight <= 0) return null;
		const left = (abbreviation.x / PAGE_IMAGE_WIDTH) * 100;
		const top = (abbreviation.y / naturalHeight) * 100;
		const width = (abbreviation.width / PAGE_IMAGE_WIDTH) * 100;
		const height = (abbreviation.height / naturalHeight) * 100;
		return `left:${left}%;top:${top}%;width:${width}%;height:${height}%;`;
	});

	$effect(() => {
		void pageSrc;
		naturalHeight = 0;
	});

	function onPageLoad(event: Event) {
		const img = event.currentTarget as HTMLImageElement;
		naturalHeight = img.naturalHeight;
	}
</script>

<Modal bind:open size="lg" title={ui.pageModalTitle} class="w-full">
	{#if abbreviation}
		<div class="relative mx-auto w-full max-w-[700px] overflow-auto">
			<img
				src={pageSrc}
				alt=""
				class="block h-auto w-full"
				onload={onPageLoad}
			/>
			{#if highlightStyle}
				<div
					class="pointer-events-none absolute box-border border-2 border-primary-600 bg-primary-500/20"
					style={highlightStyle}
					aria-hidden="true"
				></div>
			{/if}
		</div>
	{/if}
</Modal>
