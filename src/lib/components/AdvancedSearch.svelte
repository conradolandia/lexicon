<script lang="ts">
	import { Accordion, AccordionItem, Checkbox } from 'flowbite-svelte';
	import SearchableMultiSelect from '$lib/components/SearchableMultiSelect.svelte';
	import type { MultiSelectOption } from '$lib/components/SearchableMultiSelect.svelte';
	import { ui } from '$lib/content';
	import type { SearchFields } from '$lib/search';
	import { defaultSearchFields } from '$lib/search';

	let {
		fields = $bindable<SearchFields>({ ...defaultSearchFields }),
		categories = $bindable<string[]>([]),
		periods = $bindable<string[]>([]),
		languages = $bindable<string[]>([]),
		categoryOptions,
		periodOptions,
		languageOptions
	}: {
		fields?: SearchFields;
		categories?: string[];
		periods?: string[];
		languages?: string[];
		categoryOptions: MultiSelectOption[];
		periodOptions: MultiSelectOption[];
		languageOptions: MultiSelectOption[];
	} = $props();
</script>

<div class="mb-4">
	<Accordion flush>
		<AccordionItem open={false}>
			{#snippet header()}{ui.advancedSearchHeading}{/snippet}
			<div class="grid grid-cols-1 gap-4 pt-2 pb-1 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
				<div class="flex flex-col gap-1.5">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
						{ui.searchFieldLabel}
					</span>
					<ul
						class="w-full items-center rounded-lg border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900 sm:flex dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					>
						<li
							class="w-full border-b border-gray-300 sm:border-r sm:border-b-0 dark:border-gray-600"
						>
							<div class="flex items-center ps-3">
								<Checkbox bind:checked={fields.characters} classes={{ div: 'w-full py-3' }}>
									{ui.searchFieldCharacters}
								</Checkbox>
							</div>
						</li>
						<li class="w-full">
							<div class="flex items-center ps-3">
								<Checkbox bind:checked={fields.transcription} classes={{ div: 'w-full py-3' }}>
									{ui.searchFieldTranscription}
								</Checkbox>
							</div>
						</li>
					</ul>
				</div>

				<SearchableMultiSelect
					id="filter-periods"
					label={ui.filterPeriodsLabel}
					placeholder={ui.filterPeriodsPlaceholder}
					options={periodOptions}
					bind:value={periods}
				/>

				<SearchableMultiSelect
					id="filter-categories"
					label={ui.filterCategoriesLabel}
					placeholder={ui.filterCategoriesPlaceholder}
					options={categoryOptions}
					bind:value={categories}
				/>

				<SearchableMultiSelect
					id="filter-languages"
					label={ui.filterLanguagesLabel}
					placeholder={ui.filterLanguagesPlaceholder}
					options={languageOptions}
					bind:value={languages}
				/>
			</div>
		</AccordionItem>
	</Accordion>
</div>
