<script lang="ts">
	import { Footer, FooterIcon, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
	import { GithubSolid, LinkOutline } from 'flowbite-svelte-icons';
	import pendragonLogo from '$lib/assets/logo-pendragon.svg';
	import { ui } from '$lib/content';
</script>

<Footer>
	<FooterLinkGroup
		class="mt-3 flex items-center space-x-2 text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
	>
		<FooterIcon href={ui.footerDataUrl} target="_blank">
			<LinkOutline class="h-6 w-6 shrink-0" />
		</FooterIcon>
		<FooterLink href={ui.footerDataUrl} target="_blank">
			{ui.footerDataLabel}
		</FooterLink>
		<FooterIcon href={ui.footerSourceUrl} target="_blank">
			<GithubSolid class="h-6 w-6 shrink-0" />
		</FooterIcon>
		<FooterLink href={ui.footerSourceUrl} target="_blank">
			{ui.footerSourceLabel}
		</FooterLink>
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
