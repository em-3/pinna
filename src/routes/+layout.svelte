<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import { createConfigStore } from "$lib/stores/config";
	import "iconify-icon";
	import { setContext } from "svelte";

	import "../app.css";

	//Set up the config store
	const { config, init } = createConfigStore();

	setContext("config", config);

	init();

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

<main class="size-full">
	<slot />
</main>
