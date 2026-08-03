<script lang="ts">
	import { about, inlineMarkdown, ui } from '$lib/content';
</script>

<svelte:head>
	<title>{about.title} — {ui.siteTitle}</title>
</svelte:head>

<article class="prose-headings:font-medium max-w-3xl">
	<h1 class="mb-6 text-3xl text-gray-900 dark:text-white">{about.title}</h1>

	{#each about.intro as paragraph}
		<p class="content-md mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
			{@html inlineMarkdown(paragraph)}
		</p>
	{/each}

	{#each about.sections as section (section.id)}
		<section class="mt-10">
			<h2 class="mb-4 text-2xl text-gray-900 dark:text-white">{section.heading}</h2>

			{#each section.paragraphs as paragraph}
				<p class="content-md mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
					{@html inlineMarkdown(paragraph)}
				</p>
			{/each}

			{#if section.source}
				<p class="content-md text-sm text-gray-600 dark:text-gray-400">
					{about.sourcePrefix}
					<a href={section.source.url} target="_blank" rel="noopener noreferrer">
						{section.source.label}
					</a>
				</p>
			{/if}
		</section>
	{/each}
</article>
