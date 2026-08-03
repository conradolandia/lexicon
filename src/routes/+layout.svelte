<script lang="ts">
	import {
		Footer,
		FooterIcon,
		FooterLinkGroup,
		FooterLink,
	} from "flowbite-svelte";
	import { LinkOutline, GithubSolid } from "flowbite-svelte-icons";
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
  import pendragonLogo from "$lib/assets/logo-pendragon.svg";
	import { DarkMode, Navbar, NavBrand } from "flowbite-svelte";
	import { inlineMarkdown, stripMarkdown, ui } from "$lib/content";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{ui.siteTitle}</title>
	<meta name="description" content={stripMarkdown(ui.siteDescription)} />
</svelte:head>

<div
	class="min-h-screen mx-auto max-w-6xl bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
>
	<Navbar
		class="border-b border-gray-200 dark:border-gray-700"
		navContainerClass="items-start gap-4 py-4"
	>
		<div class="flex min-w-0 flex-1 flex-col gap-1.5">
			<NavBrand href="/" class="w-fit" aria-label={ui.siteTitle}>
        <div class="flex items-center gap-2">
          <img src={favicon} alt={ui.siteTitle} class="h-12" />
          <span class="text-lg font-medium sm:text-2xl">
            {ui.siteTitle}
          </span>
        </div>
			</NavBrand>
			<p
				class="content-md max-w-2xl text-xs leading-relaxed text-gray-500 dark:text-gray-400"
			>
				{@html inlineMarkdown(ui.siteDescription)}
			</p>
		</div>

		<div class="flex shrink-0 items-center gap-4 pt-0.5">
			<a
				href="/acerca"
				class="whitespace-nowrap font-medium text-gray-900 hover:underline dark:text-white"
			>
				{ui.navAbout}
			</a>
			<DarkMode />
		</div>
	</Navbar>

	<main class="mx-auto max-w-6xl px-4 py-8">
		{@render children()}
	</main>

	<Footer>
		<FooterLinkGroup
			class="mt-3 flex items-center space-x-2 text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
		>
			<FooterIcon href={ui.footerDataUrl} target="_blank"
				><LinkOutline class="shrink-0 h-6 w-6" /></FooterIcon
			>
			<FooterLink href={ui.footerDataUrl} target="_blank"
				>{ui.footerDataLabel}</FooterLink
			>
			<FooterIcon href={ui.footerSourceUrl} target="_blank"
				><GithubSolid class="shrink-0 h-6 w-6" /></FooterIcon
			>
			<FooterLink href={ui.footerSourceUrl} target="_blank"
				>{ui.footerSourceLabel}</FooterLink
			>
		</FooterLinkGroup>
		<FooterLinkGroup
			class="mt-3 flex items-center gap-2 text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
		>
			<span>{ui.pendragonPrefix}</span>
			<FooterLink href={ui.pendragonUrl} target="_blank" aria-label={ui.pendragonName}>
				<img src={pendragonLogo} alt={ui.pendragonName} class="h-12" />
			</FooterLink>
		</FooterLinkGroup>
	</Footer>
</div>
