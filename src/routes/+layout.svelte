<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import LoadingScreen from "$lib/components/LoadingScreen.svelte";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import delay from "$lib/delay";
	import { createConfigStore } from "$lib/stores/config";
	import "iconify-icon";
	import { onMount, setContext } from "svelte";
	import { fade } from "svelte/transition";

	import "../app.css";

	let loading: boolean = true;

	//Set up the config store
	const { config, init } = createConfigStore();

	setContext("config", config);

	onMount(async () => {
		await init();

		//Add some delay to prevent weird problems with the animation running too quickly
		await delay(1000);

		loading = false;
	});

	// https://svelte.dev/blog/view-transitions
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<main class="content-grid size-full overflow-hidden">
	<section class="bg-gray-100 dark:bg-slate-900">
		<header class="flex items-center gap-2 p-4">
			<!-- Icon goes here -->
			<h1 class="text-2xl">Pinna</h1>
		</header>
		<Navigation></Navigation>
	</section>

	<section class="page overflow-y-auto">
		<slot />
	</section>
</main>

{#if loading}
	<div transition:fade>
		<LoadingScreen></LoadingScreen>
	</div>
{/if}

<style>
	.content-grid {
		display: grid;
		grid-template-columns: auto 1fr;
	}

	section.page {
		view-transition-name: content;
	}
</style>
