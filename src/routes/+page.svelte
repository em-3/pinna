<script lang="ts">
	import type { Config } from "$lib/stores/config";

	import { goto } from "$app/navigation";
	import mediaQueryStore from "$lib/stores/mediaQuery";
	import "ldrs/waveform";
	import { getContext, onMount } from "svelte";
	import { type Writable } from "svelte/store";

	const config: Writable<Config> = getContext("config");

	let darkMode;
	let configTriggered = false;

	onMount(async () => {
		darkMode = mediaQueryStore("(prefers-color-scheme: dark)");
	});

	config.subscribe((value) => {
		//Skip the first notification (since the file read is async)
		if (!configTriggered) {
			configTriggered = true;
			return;
		}

		setTimeout(() => {
			//If the setup is complete, route the user to the homepage. Otherwise route them to the setup
			if (value.setupComplete) {
				goto("/home");
			} else {
				goto("/setup");
			}
		}, 1000);
	});
</script>

<div class="flex size-full flex-col items-center justify-around">
	<div class="flex flex-1 flex-col items-center justify-center gap-20">
		<div class="text-center">
			<h1 class="text-4xl font-bold dark:text-white">Pinna</h1>
			<h2 class="text-2xl text-slate-500">A beautiful report generator for Jira&reg;</h2>
		</div>
		<div class="flex flex-col items-center gap-6">
			<l-waveform color={$darkMode ? "white" : "black"} size="40"></l-waveform>
			<h3 class="text-slate-500 dark:text-gray-300">Loading...</h3>
		</div>
	</div>
	<footer class="flex-shrink-0 p-6">
		<p class="text-center text-slate-500 dark:text-gray-300">
			Made by <a class="underline" href="https://em-3.dev" target="_blank">EM-3</a>
		</p>
	</footer>
</div>
