<script lang="ts">
	import { page } from "$app/stores";

	import NavLink from "./NavLink.svelte";

	const pages = [
		{
			href: "/",
			icon: "material-symbols:dashboard",
			name: "Dashboard"
		},
		{
			href: "/settings",
			icon: "material-symbols:settings",
			name: "Settings"
		}
	];

	let height: number;

	//Determine which page is currently open
	//ESLint has to be disabled, as it errors here because it thinks $page isn't declared
	// eslint-disable-next-line svelte/valid-compile
	$: selectedPage = pages.findIndex((page) => $page.url.pathname == page.href);
</script>

<nav class="relative flex flex-col">
	<div
		class="link-bg bg-gray-300 dark:bg-slate-700"
		style="transform: translateY({selectedPage * height}px)"
		style:height={height + "px"}
	></div>
	{#each pages as page, index}
		{#if index == 0}
			<NavLink {...page} bind:clientHeight={height}></NavLink>
		{:else}
			<NavLink {...page}></NavLink>
		{/if}
	{/each}
</nav>

<style>
	.link-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
	}
</style>
