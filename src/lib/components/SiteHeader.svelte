<script lang="ts">
	import { DarkMode, Navbar, NavBrand } from 'flowbite-svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { inlineMarkdown, ui } from '$lib/content';
</script>

<Navbar
	class="border-b border-gray-200 dark:border-gray-700"
	navContainerClass="items-start gap-4 py-4"
>
	<div class="flex min-w-0 flex-1 flex-col gap-1.5">
		<NavBrand href="/" class="w-fit" aria-label={ui.siteTitle}>
			<div class="flex items-center gap-3">
				<img src={favicon} alt={ui.siteTitle} class="h-14" />
				<div class="flex flex-col">
					<p class="text-lg font-medium sm:text-2xl">
						{ui.siteTitle}
					</p>
					<p
						class="content-md max-w-2xl text-xs leading-relaxed text-gray-500 dark:text-gray-400"
					>
						{@html inlineMarkdown(ui.siteDescription)}
					</p>
				</div>
			</div>
		</NavBrand>
	</div>

	<div class="flex shrink-0 items-center gap-4 pt-0.5">
		<a
			href="/acerca/"
			class="whitespace-nowrap font-medium text-gray-900 hover:underline dark:text-white"
		>
			{ui.navAbout}
		</a>
		<DarkMode />
	</div>
</Navbar>
