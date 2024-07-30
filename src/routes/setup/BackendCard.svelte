<script lang="ts">
	export let service = undefined;
	export let description = undefined;
	export let icon = undefined;
	export let dest = "#";
	export let disabled = false;
	export let recommended = false;
</script>

<div
	class="flex max-w-md flex-col items-center justify-center gap-5 rounded-xl bg-sky-100 p-6 shadow-xl dark:bg-slate-900"
>
	<iconify-icon class="text-sky-500 dark:text-sky-700" height="128" {icon} />
	<h2 class="text-3xl font-bold text-black dark:text-white">{service}</h2>
	{#if disabled}
		<h3 class="text-xl font-bold text-black dark:text-white">Currently Unavailable</h3>
	{:else if recommended}
		<h3 class="text-xl font-bold text-black dark:text-white">Recommended</h3>
	{/if}
	<p class="text-lg text-slate-500 dark:text-slate-300">{description}</p>
	<a
		class="cursor-pointer rounded-full bg-gradient-to-br from-sky-500 to-sky-400 p-4 text-xl text-gray-100 dark:from-sky-700 dark:to-sky-600"
		href={dest}
	>
		Use {service}
	</a>
</div>
