<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { stripMarkdown, ui } from '$lib/content';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{ui.siteTitle}</title>
	<meta name="description" content={stripMarkdown(ui.siteDescription)} />
</svelte:head>

<div
	class="mx-auto min-h-screen max-w-6xl bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
>
	<SiteHeader />

	<main class="mx-auto max-w-6xl px-4 py-8">
		{@render children()}
	</main>

	<SiteFooter />
</div>
