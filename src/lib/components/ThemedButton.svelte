<script lang="ts">
	export let disabled: boolean = false;

	$: styles = disabled ? "bg-slate-500" : "bg-sky-500 dark:bg-sky-700";
</script>

<button
	class="rounded-full p-4 text-lg text-gray-100 transition-colors {styles}"
	{disabled}
	on:click><slot></slot></button
>
