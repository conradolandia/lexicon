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
  import { DarkMode, Navbar, NavBrand } from "flowbite-svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Diccionario de Abreviaturas latinas de Cappelli</title>
</svelte:head>

<div
  class="min-h-screen mx-auto max-w-6xl bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
>
  <Navbar class="border-b border-gray-200 dark:border-gray-700">
    <NavBrand href="/">
      <span
        class="self-center font-medium whitespace-nowrap text-lg sm:text-2xl"
      >
        Diccionario de Abreviaturas latinas de Cappelli
      </span>
    </NavBrand>
    <DarkMode class="ms-auto" />
  </Navbar>

  <main class="mx-auto max-w-6xl px-4 py-8">
    {@render children()}
  </main>

  <Footer>
    <FooterLinkGroup
      class="mt-3 flex items-center space-x-2 text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
    >
      <FooterIcon
        href="https://www.adfontes.uzh.ch/en/ressourcen/abkuerzungen/cappelli-daten-zum-download"
        target="_blank"><LinkOutline class="shrink-0 h-6 w-6" /></FooterIcon
      >
      <FooterLink
        href="https://www.adfontes.uzh.ch/en/ressourcen/abkuerzungen/cappelli-daten-zum-download"
        target="_blank">Datos del diccionario tomados de AD Fontes</FooterLink
      >
      <FooterIcon
        href="https://github.com/conradolandia/cappelli-svelte"
        target="_blank"><GithubSolid class="shrink-0 h-6 w-6" /></FooterIcon
      >
      <FooterLink
        href="https://github.com/conradolandia/cappelli-svelte"
        target="_blank">Código fuente</FooterLink
      >
    </FooterLinkGroup>
  </Footer>
</div>
