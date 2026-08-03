<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { translateCategory } from '$lib/categories';
	import type { CategoryLabels } from '$lib/categories';
	import { ui } from '$lib/content';

	let {
		categories,
		labels,
		selected = $bindable(null),
		onchange
	}: {
		categories: string[];
		labels: CategoryLabels;
		selected?: string | null;
		onchange?: (category: string | null) => void;
	} = $props();

	function select(category: string | null) {
		selected = category;
		onchange?.(category);
	}

	function labelFor(category: string): string {
		return translateCategory(category, labels) ?? category;
	}
</script>

{#if categories.length > 0}
	<div class="mb-4">
		<p class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{ui.categoriesHeading}</p>
		<div class="flex flex-wrap gap-2">
			<Badge
				color={selected === null ? 'primary' : 'gray'}
				border={selected !== null}
				class="cursor-pointer px-4 py-2"
				onclick={() => select(null)}
			>
				{ui.categoriesAll}
			</Badge>
			{#each categories as category (category)}
				<Badge
					color={selected === category ? 'primary' : 'gray'}
					border={selected !== category}
					class="cursor-pointer px-4 py-2"
					onclick={() => select(category)}
				>
					{labelFor(category)}
				</Badge>
			{/each}
		</div>
	</div>
{/if}
