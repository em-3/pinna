<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import LoadingScreen from "$lib/components/LoadingScreen.svelte";
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

<main class="size-full {loading ? 'overflow-hidden' : ''}">
	<slot />
</main>

{#if loading}
	<div transition:fade>
		<LoadingScreen></LoadingScreen>
	</div>
{/if}
