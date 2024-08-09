<script lang="ts">
	export let name: string;
	export let value: string = "";

	$: propName = name.toLowerCase().replace(" ", "-");
</script>

<div class="flex flex-col gap-4 rounded-lg p-4 even:bg-gray-100 dark:even:bg-slate-900">
	<label class="font-bold" for={propName}>{name}</label>
	<p class="text-slate-500">
		<slot></slot>
	</p>
	<input
		autocomplete="off"
		bind:value
		class="rounded-xl border-2 border-solid border-slate-500 p-2 dark:bg-slate-500 dark:text-white"
		id={propName}
		name={propName}
		type="text"
	/>
</div>
