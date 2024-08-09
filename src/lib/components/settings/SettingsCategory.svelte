<script lang="ts">
	export let name: string;
</script>

<div class="flex flex-col gap-4 p-4">
	<div>
		<h1 class="mb-3 text-2xl">{name}</h1>
		<hr class="border-t-solid w-1/4 border-t-2 border-t-slate-500" />
	</div>
	<div class="flex flex-col gap-4">
		<slot></slot>
	</div>
</div>
