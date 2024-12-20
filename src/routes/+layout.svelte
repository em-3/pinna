<script>
    import { onNavigate } from "$app/navigation";
    import "../app.css";

    let { children } = $props();

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

<main>
    {@render children()}
</main>

<style>
    main {
        min-height: 100%;
        max-width: 95em;
        margin: 0 auto;
    }
</style>