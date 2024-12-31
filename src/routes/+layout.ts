import { loadConfig } from "$lib/stores/config.svelte";

// Force SvelteKit to prerender
export const prerender = true;
export const ssr = false;

export const load: PageLoad = async () => {
    await loadConfig();
};