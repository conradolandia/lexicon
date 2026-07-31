<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { DarkMode, Navbar, NavBrand } from 'flowbite-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Diccionario de Abreviaturas latinas de Cappelli</title>
</svelte:head>

<div class="min-h-screen mx-auto max-w-6xl bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
	<Navbar class="border-b border-gray-200 dark:border-gray-700">
		<NavBrand href="/">
			<span class="self-center text-lg font-semibold whitespace-nowrap sm:text-xl">
				Diccionario de Abreviaturas latinas de Cappelli
			</span>
		</NavBrand>
		<DarkMode class="ms-auto" />
	</Navbar>

	<main class="mx-auto max-w-6xl px-4 py-8">
		{@render children()}
	</main>
</div>
