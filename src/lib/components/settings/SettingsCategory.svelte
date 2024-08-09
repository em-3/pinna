<script lang="ts">
	export let name: string;
	export let icon: string = "";
</script>

<div class="flex flex-col gap-4">
	<div class="sticky top-0 bg-white/30 backdrop-blur-sm dark:bg-slate-800/30">
		<div class="flex items-center gap-4 p-4">
			{#if icon}
				<iconify-icon {icon} width="32"></iconify-icon>
			{/if}
			<h2 class="text-2xl">{name}</h2>
		</div>
		<hr class="border-t-solid ml-4 w-1/4 border-t-2 border-t-slate-500" />
	</div>
	<div class="flex flex-col gap-4 p-4">
		<slot></slot>
	</div>
</div>
