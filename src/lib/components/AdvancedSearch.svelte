<script lang="ts">
  import { Accordion, AccordionItem, Checkbox } from "flowbite-svelte";
  import SearchableMultiSelect from "$lib/components/SearchableMultiSelect.svelte";
  import type { MultiSelectOption } from "$lib/components/SearchableMultiSelect.svelte";
  import { t, ui } from "$lib/content";
  import type { SearchFields } from "$lib/search";
  import { defaultSearchFields } from "$lib/search";
  import type { PositionIndex } from "$lib/types";

  const GRID_CELLS: PositionIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let {
    fields = $bindable<SearchFields>({ ...defaultSearchFields }),
    categories = $bindable<string[]>([]),
    periods = $bindable<string[]>([]),
    languages = $bindable<string[]>([]),
    positions = $bindable<PositionIndex[]>([]),
    categoryOptions,
    periodOptions,
    languageOptions,
  }: {
    fields?: SearchFields;
    categories?: string[];
    periods?: string[];
    languages?: string[];
    positions?: PositionIndex[];
    categoryOptions: MultiSelectOption[];
    periodOptions: MultiSelectOption[];
    languageOptions: MultiSelectOption[];
  } = $props();

  const selectedPositions = $derived(new Set(positions));

  function togglePosition(cell: PositionIndex) {
    if (selectedPositions.has(cell)) {
      positions = positions.filter((value) => value !== cell);
    } else {
      positions = [...positions, cell].sort((a, b) => a - b);
    }
  }
</script>

<div class="mb-4">
  <Accordion flush>
    <AccordionItem open={false}>
      {#snippet header()}{ui.advancedSearchHeading}{/snippet}
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-x-6 sm:gap-y-4 pt-2 pb-4">
        <div
          class="grid grid-cols-1 col-span-3 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4"
        >
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
                  <Checkbox
                    bind:checked={fields.characters}
                    classes={{ div: "w-full py-3" }}
                  >
                    {ui.searchFieldCharacters}
                  </Checkbox>
                </div>
              </li>
              <li class="w-full">
                <div class="flex items-center ps-3">
                  <Checkbox
                    bind:checked={fields.transcription}
                    classes={{ div: "w-full py-3" }}
                  >
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
        <div class="flex flex-col gap-2 col-span-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {ui.filterPositionsLabel}
          </span>
          <div class="flex gap-2">
            <div
            class="grid w-fit grid-cols-3 gap-0 border border-gray-300 dark:border-gray-500"
            role="group"
            aria-label={ui.filterPositionsLabel}
          >
            {#each GRID_CELLS as cell (cell)}
              <button
                type="button"
                class="flex gap-0 h-11 w-11 items-center justify-center border text-sm font-medium transition-colors {selectedPositions.has(
                  cell,
                )
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600'}"
                aria-pressed={selectedPositions.has(cell)}
                aria-label={t(ui.filterPositionCell, { cell })}
                onclick={() => togglePosition(cell)}
              >
                {cell}
              </button>
            {/each}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {ui.filterPositionsHelp}
          </p>
          </div>
        </div>
      </div>
    </AccordionItem>
  </Accordion>
</div>
