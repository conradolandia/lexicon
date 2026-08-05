<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { CloseOutline } from 'flowbite-svelte-icons';
	import { ui } from '$lib/content';

	export type MultiSelectOption = {
		value: string;
		label: string;
	};

	let {
		options,
		value = $bindable<string[]>([]),
		placeholder = '',
		label,
		id
	}: {
		options: MultiSelectOption[];
		value?: string[];
		placeholder?: string;
		label: string;
		id: string;
	} = $props();

	let query = $state('');
	let open = $state(false);
	let containerEl = $state<HTMLDivElement | undefined>(undefined);
	let inputEl = $state<HTMLInputElement | undefined>(undefined);

	const selectedSet = $derived(new Set(value));
	const selectedOptions = $derived(
		options.filter((option) => selectedSet.has(option.value))
	);
	const filteredOptions = $derived.by(() => {
		const q = query.trim().toLowerCase();
		const available = options.filter((option) => !selectedSet.has(option.value));
		if (!q) return available;
		return available.filter(
			(option) =>
				option.label.toLowerCase().includes(q) || option.value.toLowerCase().includes(q)
		);
	});

	function add(optionValue: string) {
		if (!selectedSet.has(optionValue)) {
			value = [...value, optionValue];
		}
		query = '';
		open = true;
		queueMicrotask(() => inputEl?.focus());
	}

	function remove(optionValue: string, event?: MouseEvent) {
		event?.preventDefault();
		event?.stopPropagation();
		value = value.filter((v) => v !== optionValue);
		open = true;
		queueMicrotask(() => inputEl?.focus());
	}

	function openMenu() {
		open = true;
	}

	function onDocumentPointerDown(event: PointerEvent) {
		if (!containerEl?.contains(event.target as Node)) {
			open = false;
		}
	}

	$effect(() => {
		if (!open) return;
		// pointerdown before click: avoids closing on the same gesture that selects
		document.addEventListener('pointerdown', onDocumentPointerDown);
		return () => document.removeEventListener('pointerdown', onDocumentPointerDown);
	});
</script>

<div class="flex flex-col gap-1.5" bind:this={containerEl}>
	<label class="text-sm font-medium text-gray-700 dark:text-gray-300" for={id}>
		{label}
	</label>

	<div
		class="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
		role="group"
	>
		<div class="flex flex-wrap items-center gap-1.5 px-2.5 py-2">
			{#each selectedOptions as option (option.value)}
				<Badge color="primary" class="inline-flex items-center gap-1 px-2 py-1">
					<span class="max-w-48 truncate">{option.label}</span>
					<button
						type="button"
						class="rounded p-0.5 hover:bg-primary-600/20"
						aria-label={`Quitar ${option.label}`}
						onclick={(event) => remove(option.value, event)}
					>
						<CloseOutline class="h-3 w-3" />
					</button>
				</Badge>
			{/each}
			<input
				{id}
				bind:this={inputEl}
				bind:value={query}
				type="text"
				class="min-w-40 flex-1 border-0 bg-transparent p-1 text-sm text-gray-900 outline-none focus:ring-0 dark:text-white"
				placeholder={selectedOptions.length === 0 ? placeholder : ui.filterSearchPlaceholder}
				autocomplete="off"
				role="combobox"
				aria-expanded={open}
				aria-controls="{id}-listbox"
				onfocus={openMenu}
				onclick={openMenu}
				onkeydown={(event) => {
					if (event.key === 'Escape') {
						open = false;
						inputEl?.blur();
						return;
					}
					if (event.key === 'ArrowDown') {
						open = true;
					}
					if (event.key === 'Backspace' && query === '' && value.length > 0) {
						value = value.slice(0, -1);
					}
				}}
			/>
		</div>

		{#if open}
			<ul
				id="{id}-listbox"
				role="listbox"
				class="max-h-48 overflow-y-auto border-t border-gray-200 py-1 dark:border-gray-600"
				onmousedown={(event) => event.preventDefault()}
			>
				{#if filteredOptions.length === 0}
					<li class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{ui.noMatches}</li>
				{:else}
					{#each filteredOptions as option (option.value)}
						<li role="option" aria-selected="false">
							<button
								type="button"
								class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
								onclick={(event) => {
									event.stopPropagation();
									add(option.value);
								}}
							>
								{option.label}
							</button>
						</li>
					{/each}
				{/if}
			</ul>
		{/if}
	</div>
</div>
